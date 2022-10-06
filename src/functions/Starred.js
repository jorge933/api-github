import { OtherMethods } from "./OtherMethods.js";

export class Starred {
  constructor() {
    this.otherMethods = new OtherMethods();
  }
  async starred(user) {
    let page = 1;
    let pages = {}; // armazena as páginas
    let allStarred = 0;

    for (let i = 0; i < 200; i++) {
      const fetchStarreds = await fetch(
        `https://api.github.com/users/${user}/starred?page=${page}`
      );
      const Starreds = await fetchStarreds.json();

      if (Starreds.length > 0) {
        pages[`page${page}`] = Starreds;
        allStarred += Starreds.length;
        page++;
      } else break;
    }

    page--;

    document.querySelector(
      "section.container.result div.others .starred span.total"
    ).innerText = this.otherMethods.StylizeNumbers(allStarred);
  }
}
