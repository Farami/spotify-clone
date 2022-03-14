import NextAuth from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    username?: string;
    accessTokenExpires?: number;
  }
}

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshAccessTokenError';
    user: {
      accessToken?: string;
      refreshToken?: string;
      username?: string;
      image?: string;
      name?: string;
    };
  }
}
