declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        username: string;
        email: string;
        avatar: string;
        photo: string;
        theme: string;
        accountStatus: string;
        authType: string;
      } | null;
    }
  }
}

export {};
