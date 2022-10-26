import { RouterService } from "./services/router.service";

const $main = document.querySelector("#root");

class SinglePageApplication {
  private readonly routerService = new RouterService();
  constructor() {
    this.windowLoadListener();
    this.renderPage = this.renderPage.bind(this);
  }

  renderPage() {
    $main!.innerHTML = "";
    const page = this.routerService.getPage();
    $main!.appendChild(page);
  }

  hashListener() {
    window.addEventListener("hashchange", this.renderPage);
  }

  windowLoadListener() {
    window.addEventListener("load", () => {
      this.renderPage();
      this.hashListener();
    });
  }
}

const spa = new SinglePageApplication();
