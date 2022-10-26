import { SelectPageComponent } from "../../components/select-page/select-page.component";
import { Repository } from "../../models/repository.model";
import { User, UserPageRouterParams, UserTemplateDetails } from "../../models/user.models";
import { ApiGithub } from "../../services/api-github.service";
import { RouterService } from "../../services/router.service";
import { Utils } from "../../services/utils.service";

import userTemplate from "./user.page.html";

export class UserPage extends HTMLElement {
  private readonly declarations = [SelectPageComponent];
  private apiGitHub = new ApiGithub();
  private pageLength = 30;
  private readonly routerService = new RouterService();

  constructor() {
    super();
  }

  async connectedCallback() {
    const { user, page } = this.returnParams();

    const gitHubUser = await this.apiGitHub.getUser(user);

    const { company, location, email, twitter_username, public_repos } = gitHubUser;

    const newTemplate = Utils.bindModelToView(userTemplate, gitHubUser);

    this.innerHTML = newTemplate;

    const repositories = await this.apiGitHub.getUserRepositories(user, page);

    const $repositoriesCont: HTMLElement | null = document.querySelector("div.repositories");

    this.createRepositoriesInTemplate(repositories, $repositoriesCont);

    const hasPublicRepositories = public_repos >= 1;

    if (hasPublicRepositories) {
      const numberOfPages = public_repos / this.pageLength;

      if (public_repos < this.pageLength) return;

      const numberOfPagesRounded = Math.ceil(numberOfPages);
      const numberOfPagesInString = numberOfPagesRounded.toString();

      if (numberOfPages > 0) {
        const $agSelectPage = document.createElement("ag-select-page");
        $agSelectPage.setAttribute("current-page", page ?? "1");
        $agSelectPage.setAttribute("pages", numberOfPagesInString);
        $repositoriesCont?.appendChild($agSelectPage);
      }
    }

    document.querySelector(".result")?.classList.add("active");

    const $details = this.querySelector(".details");

    const userDetailsTemplate = this.createUserDetailsTemplate(company, location, email, twitter_username);

    const propertyBindKeys = Object.keys(userDetailsTemplate);

    propertyBindKeys.forEach((key) => {
      const value = gitHubUser[key as keyof User];
      if (value) {
        const innerHTML = userDetailsTemplate[key as keyof UserTemplateDetails].innerHTML;
        $details!.innerHTML += innerHTML;
      }
    });
  }

  createUserDetailsTemplate = (company: string, location: string, email: string, twitter_username: string) => {
    return {
      company: {
        innerHTML: `<div class="company"><svg class="octicon octicon-organization" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path></svg><span>${company}</span></div>`,
      },

      location: {
        innerHTML: `<div class="location"><svg class="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg><span>${location}</span></div>`,
      },

      email: {
        innerHTML: `<div class="location"><svg class="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg><span>${email}</span></div>`,
      },

      twitter_username: {
        innerHTML: `<div class="location"><svg class="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg><span>${twitter_username}</span></div>`,
      },
    };
  };

  createRepositoriesInTemplate(repositories: Repository[], $repositoriesCont: HTMLElement | null) {
    repositories.forEach((repository) => {
      const repositoryInString = JSON.stringify(repository);
      const $repository = document.createElement("ag-repository");
      $repository.classList.add("repositories");
      $repository.setAttribute("repository", repositoryInString);
      $repositoriesCont?.appendChild($repository);
    });
    $repositoriesCont?.classList.add("active");
  }

  returnParams() {
    const [_, routerParams] = this.routerService.getParams();

    const routerParamsSplitted = routerParams.split("?");

    const user = routerParamsSplitted[0];
    const queryParamsSplitted = routerParamsSplitted[1]?.split("&");

    const routerParamsJSON: UserPageRouterParams = { user };

    if (queryParamsSplitted) {
      queryParamsSplitted.forEach((param) => {
        const paramsSplitted = param.split("=");
        const name = paramsSplitted[0] as keyof UserPageRouterParams;
        const value = paramsSplitted[1];
        routerParamsJSON[name] = value;
      });
    }

    return routerParamsJSON;
  }
}

customElements.define("ag-user", UserPage);
