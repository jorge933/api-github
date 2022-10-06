import { NotFound } from "./NotFound.js";
import { Result } from "./Result.js";

export class SearchUser {
  constructor() {
    this.notFound = new NotFound();
    this.result = new Result();
  }
  async Search(user) {
    const fetchUser = await fetch(`https://api.github.com/users/${user}`);

    if (fetchUser.status === 200) {
      this.result.showResult(await fetchUser.json());
    } else return this.notFound.userNotFound();
  }
}
