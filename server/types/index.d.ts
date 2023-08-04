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

export interface ListingType {
  appStatus: string;
  avatar: string;
  comments: CommentType[];
  companyDetails: string;
  companyName: string;
  createdAt: string;
  experiences: ExperienceType[];
  id: string;
  index: number;
  jobDescription: string;
  jobLink: string;
  jobTitle: string;
  photo: string;
  salaryAmount: string | null;
  salaryFrequency: string | null;
  teamId: string;
  teamName: string;
  userId: string;
}

export interface TeamType {
  admins: UserType[];
  autoAccepts?: boolean;
  avatar: string;
  description: string;
  id: string;
  isPrivate: boolean;
  invited: UserType[];
  jobField: string;
  listings: ListingType[];
  name: string;
  owner: UserType;
  photo: string;
  requested: UserType[];
  status?: string;
  teammates: UserType[];
  totalCount: string;
  userCount?: string;
}

export {};
