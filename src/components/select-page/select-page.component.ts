import selectPageStyles from "./select-page.component.css";
import selectPageTemplate from "./select-page.component.html";

export class SelectPageComponent extends HTMLElement {
  styles: { readonly [key: string]: string };
  constructor() {
    super();
  }

  connectedCallback() {
    this.styles = selectPageStyles;
    this.innerHTML = selectPageTemplate;

    const { numberOfPages, currentPage } = this.returnData();

    const $previous = this.querySelector(".previous") as HTMLButtonElement;
    const $next = this.querySelector(".next") as HTMLButtonElement;

    const isFirstPage = currentPage === 1;
    $previous.disabled = isFirstPage;

    const isLastPage = numberOfPages === currentPage;
    $next.disabled = isLastPage;

    const setPage = (action: boolean) => {
      const newHash = this.newHash(currentPage, action);
      window.location.hash = newHash;
    };

    if (!isFirstPage) {
      $previous.addEventListener("click", () => setPage(false));
    }

    if (!isLastPage) {
      $next.addEventListener("click", () => setPage(true));
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

    return {
      currentPage: +currentPage,
      numberOfPages: +numberOfPages,
    };
  }
}

customElements.define("ag-select-page", SelectPageComponent);
