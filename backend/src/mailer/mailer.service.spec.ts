import { Test, TestingModule } from '@nestjs/testing';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { MailerService } from './mailer.service';

// Mock do Nodemailer
jest.mock('nodemailer');
const sendMailMock = jest.fn();
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: sendMailMock,
});

jest.mock('fs');

describe('MailerService', () => {
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService],
    }).compile();

    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(mailerService).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send an email with the correct options', async () => {
      jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation((filePath: fs.PathOrFileDescriptor) => {
          if (typeof filePath === 'string' && filePath.includes('layout')) {
            return '<html>{{title}}{{body}}</html>';
          } else if (
            typeof filePath === 'string' &&
            filePath.includes('test-template')
          ) {
            return '<p>Hello {{name}}</p>';
          }
          return '';
        });

      const to = 'user@example.com';
      const subject = 'Test Email';
      const template = 'test-template';
      const context = { name: 'Test User' };

      await mailerService.sendEmail(to, subject, template, context);

      expect(sendMailMock).toHaveBeenCalledWith({
        from: process.env.MAIL_FROM || 'no-reply@example.com',
        to,
        subject,
        html: '<html>Test Email&lt;p&gt;Hello Test User&lt;/p&gt;</html>',
      });
    });
  });

  describe('sendResetPasswordEmail', () => {
    it('should call sendEmail with reset-password template', async () => {
      const sendEmailSpy = jest
        .spyOn(mailerService, 'sendEmail')
        .mockResolvedValue();

      const to = 'user@example.com';
      const name = 'Test User';
      const resetLink = 'https://example.com/reset-password';

      await mailerService.sendResetPasswordEmail(to, name, resetLink);

      expect(sendEmailSpy).toHaveBeenCalledWith(
        to,
        'Redefinição de Senha',
        'reset-password',
        {
          name,
          reset_link: resetLink,
        },
      );
    });
  });
});
