import { ROUTES } from "./constants/routes";

const $main = document.querySelector("#root");

class SinglePageApplication {
  constructor() {
    this.windowLoadListener();
  }
  getTargetRoute(hash) {
    const hashIsEmpty = hash === "";
    return hashIsEmpty ? "index" : hash.replace("#", "");
  }

  renderPage() {
    $main.innerHTML = "";
    const hashedRoute = window.location.hash;
    const targetRoute = this.getTargetRoute(hashedRoute);
    const [fragment, params] = targetRoute.split("/");
    const hasParam = !!params;
    const page = hasParam ? ROUTES[fragment](params) : ROUTES[fragment]();
    $main.appendChild(page);
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
