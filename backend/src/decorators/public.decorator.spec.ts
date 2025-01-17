import { SetMetadata } from '@nestjs/common';
import { Public, IS_PUBLIC_KEY } from './public.decorator';

jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  SetMetadata: jest.fn(),
}));

describe('Public Decorator', () => {
  it('should set metadata with key "isPublic" and value true', () => {
    const setMetadataMock = SetMetadata as jest.Mock;

    Public();

    expect(setMetadataMock).toHaveBeenCalledWith(IS_PUBLIC_KEY, true);
  });
});
