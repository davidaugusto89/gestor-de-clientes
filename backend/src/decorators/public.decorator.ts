import { SetMetadata } from '@nestjs/common';

/**
 * Decorator para indicar que uma rota é pública
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
