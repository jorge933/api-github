import { Repository } from "../models/repository.model";
import { User } from "../models/user.models";

export class ApiGithub {
  async getUser(user: string) {
    const fetchUser = await fetch(`https://api.github.com/users/${user}`);
    const userObj: User = await fetchUser.json();
    return userObj;
  }

  async getUserRepos(user: string, page?: string) {
    const baseUrl = `users/${user}/repos`;
    const url = page ? `${baseUrl}?page=${page}` : baseUrl;
    const fetchRepos = await fetch(`https://api.github.com/${url}`);
    const repos: Repository[] = await fetchRepos.json();
    return repos;
  }
}
