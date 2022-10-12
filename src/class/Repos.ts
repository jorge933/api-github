import { Repository } from "../models/repository.model";
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
      const Repos: Repository[] = await fetchRepos.json();

      if (Repos.length > 0) {
        pages.push(Repos);
        console.log(Repos);
        ReposCount += Repos.length;

        if (page > 1) {
          const $parentRepos = $repos_cont?.parentElement;

          $repos_cont = document.createElement("div");
          $repos_cont.classList.add("container");
          $repos_cont.classList.add("repos");
          $repos_cont.dataset.page = page.toString();

          $parentRepos?.append($repos_cont);
        }

        Repos.forEach((repository) => {
          const repositoryInString = JSON.stringify(repository);
          const $repository = document.createElement("ag-repository");
          $repository.setAttribute("repository", repositoryInString);
          $repos_cont?.appendChild($repository);
        });

        page++;
      } else break;
    }

    page--;

    const $count: HTMLElement | null = $header!.querySelector(".count");
    $count!.innerText = ReposCount.toString();

    $header?.classList.add("active");
    const $firstReposCont = document.querySelector(".repos[data-page='1']");
    $firstReposCont?.classList.add("active");
  }
}
