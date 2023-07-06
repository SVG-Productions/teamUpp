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

export interface UserType {
  accountStatus: string;
  authType: string;
  avatar: string;
  confirmationCode: string | null;
  dateJoined: string;
  email: string;
  favorites: FavoritesType;
  firstName: string | null;
  hashedPassword: string;
  id: string;
  invites: InviteType[];
  isEmailPublic: boolean;
  jobFields: string[];
  lastName: string | null;
  photo: string;
  readme: string | null;
  recentActivity: RecentActivityType[];
  recommendedTeams: TeamType[];
  resetPassword: string | null;
  socials: string[];
  status: string;
  teammates: UserType[];
  teams: TeamType[];
  theme: string;
  username: string;
}

export interface CommentType {
  avatar: string;
  content: string;
  createdAt: string;
  id: string;
  listingId: string;
  photo: string;
  updatedAt: string;
  userId: string;
  username: string;
}

export interface ExperienceType {
  content: string;
  createdAt: string;
  id: string;
  links: LinkType[];
  listingId: string;
  questions: QuestionType[];
  title: string;
  userId: string;
  username: string;
}

export {};
