/**
 * Interface para representar o payload do token JWT.
 * @interface JwtPayload
 * @property {number} sub - O ID do usuário.
 * @property {string} email - O e-mail do usuário.
 */
export interface JwtPayload {
  sub: number;
  email: string;
}
