export class NotFound {
  userNotFound() {
    const $NotFoundCont = document.querySelector("section.container.not-found");
    const $SearchContainer = document.querySelector("section.container.search");

    $SearchContainer.classList.remove("active");
    $NotFoundCont.classList.add("active");

    $NotFoundCont.querySelector("button").addEventListener("click", () => {
      $NotFoundCont.classList.remove("active");
      $SearchContainer.classList.add("active");
    });
  }
}
