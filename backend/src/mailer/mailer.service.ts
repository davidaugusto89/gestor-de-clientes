import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;
  private readonly templateDir: string;

  constructor() {
    // Configuração do transportador (SMTP)
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === 'true', // true para 465, false para outros
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Diretório base dos templates
    this.templateDir = path.resolve(__dirname, '../templates');
  }

  /**
   * Envia um e-mail com base no template
   * @param to Destinatário
   * @param subject Assunto do e-mail
   * @param template Nome do template (sem extensão .hbs)
   * @param context Variáveis dinâmicas para o template
   */
  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ): Promise<void> {
    // Carregar o layout base
    const layoutPath = path.join(this.templateDir, 'layout.hbs');
    const layoutSource = fs.readFileSync(layoutPath, 'utf-8');
    const layoutTemplate = Handlebars.compile(layoutSource);

    // Carregar o template específico
    const templatePath = path.join(this.templateDir, `${template}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateSource);

    // Renderizar o conteúdo dinâmico
    const bodyContent = compiledTemplate(context);

    // Renderizar o e-mail completo com o layout
    const emailContent = layoutTemplate({
      title: subject,
      header: subject,
      body: bodyContent,
      unsubscribe_link:
        context.unsubscribe_link || 'https://example.com/unsubscribe',
    });

    // Configuração do e-mail
    const mailOptions = {
      from: process.env.MAIL_FROM || 'no-reply@example.com',
      to,
      subject,
      html: emailContent,
    };

    // Enviar o e-mail
    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Envia um e-mail de redefinição de senha
   * @param to Destinatário
   * @param name Nome do usuário
   * @param resetLink Link para redefinição de senha
   */
  async sendResetPasswordEmail(
    to: string,
    name: string,
    resetLink: string,
  ): Promise<void> {
    await this.sendEmail(to, 'Redefinição de Senha', 'reset-password', {
      name,
      reset_link: resetLink,
    });
  }
}
