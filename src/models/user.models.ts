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
}

export type UserKey = Array<keyof User>;

export interface Infos {
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
