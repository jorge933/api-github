export interface User {
  avatar_url: string;
  blog: string;
  company: string;
  email: string;
  location: string;
  twitter_username: string;
  bio: string;
  name: string;
  login: string;
  following: number;
  followers: number;
  public_repos: number;
}

export type UserKey = Array<keyof User>;

export interface UserTemplateDetails {
  company: {
    innerHTML: string;
  };
  location: {
    innerHTML: string;
  };
  email: {
    innerHTML: string;
  };
  twitter_username: {
    innerHTML: string;
  };
}

export interface UserPageRouterParams {
  user: string;
  page?: string;
}
