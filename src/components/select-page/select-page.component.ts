import selectPageTemplate from "./select-page.component.html";
import selectPageStyles from "./select-page.component.css";

export class SelectPageComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const styles = selectPageStyles;
    this.innerHTML = selectPageTemplate;
    const { numberOfPages, currentPage } = this.returnData();
    const $previous = this.querySelector(".previous") as HTMLButtonElement;
    const $next = this.querySelector(".next") as HTMLButtonElement;

    const isFirstPage = currentPage === 1;
    $previous.disabled = isFirstPage;

    const isLastPage = numberOfPages === currentPage;
    $next.disabled = isLastPage;

    if (!isFirstPage) {
      $previous.addEventListener("click", () => {
        const newHash = this.newHash(currentPage, false);
        window.location.hash = newHash;
      });
    }

    if (!isLastPage) {
      console.log(1);
      $next.addEventListener("click", () => {
        console.log(2);
        const newHash = this.newHash(currentPage, true);
        window.location.hash = newHash;
      });
    }
  }

  newHash(currentPage: number, action: boolean) {
    const newPage = action ? currentPage + 1 : currentPage - 1;
    const hashSplitted = window.location.hash.split("?")[0];
    const newHash = `${hashSplitted}?page=${newPage}`;
    return newHash;
  }

  returnData() {
    const currentPage = this.getAttribute("current-page") as string;
    const numberOfPages = this.getAttribute("pages") as string;

    const currentPageInNumber = parseInt(currentPage);
    const numberOfPagesInNumber = parseInt(numberOfPages);

    return {
      currentPage: currentPageInNumber,
      numberOfPages: numberOfPagesInNumber,
    };
  }
}

customElements.define("ag-select-page", SelectPageComponent);
