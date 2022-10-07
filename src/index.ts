import { ROUTES } from "./constants/routes";
import { RoutesType } from "./models/types.model";

const $main = document.querySelector("#root");

class SinglePageApplication {
  constructor() {
    this.windowLoadListener();
  }
  getTargetRoute(hash: string) {
    const hashIsEmpty = hash === "";
    return hashIsEmpty ? "index" : hash.replace("#", "");
  }

  renderPage() {
    $main!.innerHTML = "";
    const hashedRoute = window.location.hash;
    const targetRoute = this.getTargetRoute(hashedRoute);
    const routeAndParams = targetRoute.split("/");
    const fragment = routeAndParams[0] as keyof RoutesType;
    const page = ROUTES[fragment]();
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
