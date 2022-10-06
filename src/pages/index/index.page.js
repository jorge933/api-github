import { Search } from "../../functions/Search.js";

export class IndexPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <header class="container">
        <span class="repositories-count">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
                class="octicon octicon-repo UnderlineNav-octicon hide-sm">
                <path fill-rule="evenodd"
                    d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z">
                </path>
            </svg>
            Repositories <span class="count">8</span>
        </span>
    </header>

        <section class="search container">
            <form class="search-user" autocomplete="off">
                <h1>Pesquise um usuario no github</h1>
                <input type="text" class="user" required>
                <input type="submit" value="Pesquisar">
            </form>
        </section>

        <section class="container result">
            <div class="profile">

                <div class="photo">
                    <img src="" alt="">
                </div>
                <div class="names">
                    <span class="name"></span>
                    <span class="username"></span>
                </div>

                <p class="bio"></p>

                <div class="others">
                    <div class="followers">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                            data-view-component="true" class="octicon octicon-people">
                            <path fill-rule="evenodd"
                                d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z">
                            </path>
                        </svg>
                        <span class="total"></span>
                        <span class="f">followers</span>
                        <span class="hr">·</span>
                    </div>
                    <div class="following">
                        <span class="total"></span>
                        <span class="f">following</span>
                        <span class="hr">·</span>
                    </div>

                    <div class="starred">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                            data-view-component="true" class="octicon octicon-star">
                            <path fill-rule="evenodd"
                                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                            </path>
                        </svg>
                        <span class="total"></span>
                    </div>
                </div>

                <div class="details"></div>
            </div>

            <div class="container repos" data-page="1"></div>
        </section>

        <section class="container not-found">
            <span>Usuário não encontrado</span>
            <button>Buscar novamente</button>
        </section>

        <section class="container repos starred"></section>
    `;

    const $form = this.querySelector("section.search form");
    const $formContainer = $form.parentElement;

    $formContainer.classList.add("active");

    $form.addEventListener("submit", (e) => {
      $formContainer.classList.remove("active");
      e.preventDefault();
      window.confirm(
        "Se o usuário possuir muitos repositórios, o carregamento pode demorar"
      );
      Search($form.querySelector('input[type="text"]').value);
    });
  }
}

customElements.define("ag-index", IndexPage);
