declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_CLIENT_SECRET: string;
      NEXT_PUBLIC_CLIENT_ID: string;
      JWT_SECRET: string;
    }
  }
}

export {};
