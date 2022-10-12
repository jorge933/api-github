import { Starred } from "./Starred";
import { OtherMethods } from "./OtherMethods";
import { Repos } from "./Repos";
import { User } from "../models/user.models";

export class Result {
  otherMethods = new OtherMethods();
  starred = new Starred();
  repos = new Repos();

  async showResult(user: User) {
    const $result = document.querySelector("section.container.result");
    const $body = document.querySelector("body");

    const {
      avatar_url: photo,
      blog,
      company,
      email,
      location,
      twitter_username,
    } = user;

    const $photo_html = $result!.querySelector("img");
    $photo_html!.src = photo;
    $photo_html!.alt = user.login;

    const values = [
      user.bio,
      user.followers,
      user.following,
      user.login,
      user.name,
    ];
    const html = [
      "p.bio",
      "div.others .followers span.total",
      "div.others .following span.total",
      "div.names .username",
      "div.names .name",
    ];

    for (let i = 0; i < values.length; i++) {
      if (values[i] !== null || !isNaN(Number(values[i]))) {
        if (!isNaN(Number(values[i]))) {
          const $element: HTMLElement | null = $result!.querySelector(html[i]);
          const valueToNumber = Number(values[i]);
          $element!.innerText = this.otherMethods.StylizeNumbers(valueToNumber);
        } else {
          const $element: HTMLElement | null = $result!.querySelector(html[i]);
          $element!.innerText = values[i].toString();
        }
      }
    }

    const $details = $result?.querySelector("div.details");

    if (location) $details!.if(email);
    $details!.innerHTML += `<div class="email hover"><svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path></svg><a href="mailto:${email}" target="_blank"><span>${email}</span></a></div>`;
    if (blog.length > 0)
      $details!.innerHTML += `<div class="website hover" target="_blank"><svg style="width: 16px;" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-link"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg><a href="${blog}" target="_blank"><span>${blog}</span></a></div>`;
    if (twitter_username)
      $details!.innerHTML += `<div class="twitter hover"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.5 222.3" width="16" height="16"><title id="4eog1y84d35j1menye12z3a4zl1qnv0">Twitter</title><path d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1" fill="currentColor"></path></svg><a href="https://twitter.com/${twitter_username}" target="_blank"><span>@${twitter_username}</span></a></div>`;

    this.starred.starred(user.login);
    await this.repos.showUserRepositories(user.login);

    $result?.classList.add("active");
    $body?.classList.add("result");
  }
}
