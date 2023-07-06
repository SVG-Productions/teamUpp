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

export interface LinkType {
  id?: string;
  experienceId?: string;
  description: string;
  url: string;
}

export interface QuestionType {
  id: string;
  experienceId: string;
  question: string;
}

export {};
