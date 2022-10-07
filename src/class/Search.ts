import { NotFound } from "./NotFound";
import { Result } from "./Result";

export class SearchUser {
  notFound = new NotFound();
  result = new Result();

  async Search(user: string) {
    const fetchUser = await fetch(`https://api.github.com/users/${user}`);

    if (fetchUser.status === 200) {
      this.result.showResult(await fetchUser.json());
    } else return this.notFound.userNotFound();
  }
}
