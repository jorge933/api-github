import { OtherMethods } from "./OtherMethods";

export class Repos {
  otherMethods = new OtherMethods();

  async showUserRepositories(user: string) {
    const $header = document.querySelector("header");
    let $repos_cont: HTMLElement | null = document.querySelector(
      "section.container.result div.repos"
    );

    let page = 1;
    let pages = []; // armazena as páginas
    let ReposCount = 0;

    for (let i = 0; i < 200; i++) {
      const fetchRepos = await fetch(
        `https://api.github.com/users/${user}/repos?page=${page}`
      );
      const Repos = await fetchRepos.json();

      if (Repos.length > 0) {
        pages.push(Repos);
        ReposCount += Repos.length;

        if (page > 1) {
          const $parentRepos = $repos_cont?.parentElement;

          $repos_cont = document.createElement("div");
          $repos_cont.classList.add("container");
          $repos_cont.classList.add("repos");
          $repos_cont.dataset.page = page.toString();

          $parentRepos?.append($repos_cont);
        }

        this.otherMethods.AddReposInDOM(Repos, $repos_cont!);

        page++;
      } else break;
    }

    page--;
    ReposCount++;

    const $count: HTMLElement | null = $header!.querySelector(".count");
    $count!.innerText = ReposCount.toString();

    $header?.classList.add("active");
    $repos_cont?.classList.add("active");
  }
}
