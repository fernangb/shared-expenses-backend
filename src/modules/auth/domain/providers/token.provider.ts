export default interface ITokenProvider {
  createToken(userId: string): string;
  validateToken(token: string): boolean;
}
