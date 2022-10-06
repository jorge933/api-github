import { ROUTES } from "./constants/routes";

const $main = document.querySelector("#root");

function getTargetRoute(hash) {
  const hashIsEmpty = hash === "";
  return hashIsEmpty ? "index" : hash.replace("#", "");
}

function renderPage() {
  $main.innerHTML = "";
  const hashedRoute = window.location.hash;
  const targetRoute = getTargetRoute(hashedRoute);
  const [fragment, params] = targetRoute.split("/");
  const hasParam = !!params;
  const page = hasParam ? ROUTES[fragment](params) : ROUTES[fragment]();
  $main.appendChild(page);
}

function hashListener() {
  window.addEventListener("hashchange", renderPage);
}

function windowLoadListener() {
  window.addEventListener("load", () => {
    renderPage();
    hashListener();
  });
}

windowLoadListener();
