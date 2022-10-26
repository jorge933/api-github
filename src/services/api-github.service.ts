import { Repository } from "../models/repository.model";
import { User } from "../models/user.models";

export class ApiGithub {
  readonly BASE_URL = "https://api.github.com";
  readonly USERS_ROUTE = "users";
  readonly REPOSITORIES_ROUTE = "repos";

  async getUser(user: string) {
    const fetchUser = await fetch(`${this.BASE_URL}/${this.USERS_ROUTE}/${user}`);
    const userObj: User = await fetchUser.json();
    return userObj;
  }

  async getUserRepositories(user: string, page?: string) {
    const queryParams = page ? `?page=${page}` : "";
    const fetchRepos = await fetch(`${this.BASE_URL}/${this.USERS_ROUTE}/${user}  /${this.REPOSITORIES_ROUTE}${queryParams}`);
    const repositories: Repository[] = await fetchRepos.json();
    return repositories;
  }
}
