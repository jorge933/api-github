import { OtherMethods } from "./OtherMethods";

export class Starred {
  otherMethods = new OtherMethods();
  async starred(user: string) {
    let page = 1;
    let pages = []; // armazena as páginas
    let allStarred = 0;

    for (let i = 0; i < 200; i++) {
      const fetchStarreds = await fetch(
        `https://api.github.com/users/${user}/starred?page=${page}`
      );
      const starreds = await fetchStarreds.json();

      if (starreds.length > 0) {
        pages.push(starreds);
        allStarred += starreds.length;
        page++;
      } else break;
    }

    page--;

    const $totalStarred: HTMLElement | null = document.querySelector(
      "section.container.result div.others .starred span.total"
    );
    $totalStarred!.innerText = this.otherMethods.StylizeNumbers(allStarred);
  }
}
