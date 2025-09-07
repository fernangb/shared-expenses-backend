export class AuthConfig {
  static getJWT() {
    return {
      secret: process.env.AUTH_SECRET,
      expiresIn: process.env.AUTH_EXPIRES_IN,
    };
  }
}
