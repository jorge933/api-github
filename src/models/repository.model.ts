export interface License {
  name: string;
}

export interface Repository {
  description: string;
  forks: number;
  language: string;
  license: License | null;
  name: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  url: string;
}
