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

export interface QuestionType {
  id: string;
  experienceId: string;
  question: string;
}

export interface LinkType {
  id?: string;
  experienceId?: string;
  description: string;
  url: string;
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
  avatar: string;
  comments: CommentType[];
  companyDetails: string;
  companyName: string;
  createdAt: string;
  experiences: ExperienceType[];
  id: string;
  jobDescription: string;
  jobLink: string;
  jobTitle: string;
  photo: string;
  salaryAmount: string | null;
  salaryFrequency: string | null;
  teamId: string;
  teamName: string;
  userId: string;
  username: string;
}

export interface FavoritesType {
  listings: ListingType[];
  totalCount: string;
}

export interface InviteType {
  autoAccepts: boolean;
  avatar: string;
  description: string;
  id: string;
  isPrivate: boolean;
  jobField: string;
  name: string;
  photo: string;
  status: string;
}

export interface RecentActivityType {
  avatar: string;
  content: string;
  contentId: string;
  createdAt: string;
  destination: string;
  destinationId: string;
  photo: string;
  queryId: string;
  username: string;
}

export interface TeamType {
  autoAccepts?: boolean;
  avatar: string;
  description: string;
  id: string;
  isPrivate: boolean;
  invited: UserType[];
  jobField: string;
  name: string;
  owner: UserType;
  photo: string;
  requested: UserType[];
  status?: string;
  teammates: UserType[];
  userCount?: string;
}

export interface UserType {
  status: string;
  accountStatus: string;
  authType: string;
  avatar: string;
  confirmationCode: string | null;
  dateJoined: string;
  email: string;
  firstName: string | null;
  hashedPassword: string;
  id: string;
  isEmailPublic: boolean;
  lastName: string | null;
  photo: string;
  readme: string | null;
  resetPassword: string | null;
  theme: string;
  username: string;
}

export interface UserDataType {
  userData: {
    accountStatus: string;
    authType: string;
    avatar: string;
    confirmationCode: string | null;
    dateJoined: string;
    email: string;
    favorites: FavoritesType;
    firstName: string;
    id: string;
    invites: InviteType[];
    isEmailPublic: boolean;
    jobFields: string[];
    lastName: string;
    photo: string;
    readMe: string;
    recentActivity: RecentActivityType[];
    recommendedTeams: TeamType[];
    resetPassword: string | null;
    socials: string[];
    teammates: UserType[];
    teams: TeamType[];
    theme: string;
    username: string;
  };
}

export interface TeamsDataType {
  teamsData: {
    teams: TeamType[];
    totalCount: string;
  };
}
