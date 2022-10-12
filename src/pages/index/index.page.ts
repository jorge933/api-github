import { RepositoryComponent } from "../../components/repository/repository.component";

export class IndexPage extends HTMLElement {
  private readonly declarations = [RepositoryComponent];
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <section class="search container">
            <form class="search-user" autocomplete="off">
                <h1>Pesquise um usuario no github</h1>
                <input type="text" class="user" required>
                <input type="submit" value="Pesquisar">
            </form>
        </section>

        <section class="container not-found">
            <span>Usuário não encontrado</span>
            <button>Buscar novamente</button>
        </section>

        <section class="container repos starred"></section>
    `;

    const $form = this.querySelector("section.search form");
    const $formContainer = $form?.parentElement;

    $formContainer?.classList.add("active");

    $form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const $searchUser: HTMLInputElement | null =
        $form.querySelector('input[type="text"]');
      const searchingForUser = $searchUser!.value;
      window.location.hash = `user/${searchingForUser}`;
    });
  }
}

customElements.define("ag-index", IndexPage);
