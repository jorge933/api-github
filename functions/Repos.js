import { AddReposInDOM } from "./OtherFunctions.js";

export async function Repos(user) {
    const $header = document.querySelector('header');
    let $repos_cont = document.querySelector('section.container.result div.repos');

    
    let page = 1;
    let pages = [] // armazena as páginas
    let ReposCount = 0;

    for (let i = 0; i < 200; i++) {
        const fetchRepos = await fetch(`https://api.github.com/users/${user}/repos?page=${page}`);
        const Repos = await fetchRepos.json()
        
        if (Repos.length > 0) {
            pages.push(Repos)
            ReposCount += Repos.length

            if (page >  1) {
                const $parentRepos = $repos_cont.parentElement;

                $repos_cont = document.createElement('div');
                $repos_cont.classList.add('container');
                $repos_cont.classList.add('repos');
                $repos_cont.dataset.page = page;

                $parentRepos.append($repos_cont);
            }
            
            AddReposInDOM(Repos, $repos_cont);

            page++

        } else break
    }

    if (page > 1) {
        const $repos = document.querySelectorAll('section.container.result div.repos');

        for (let i = 0; i < $repos.length; i++) {
            const button_html = `<button class="next ${i + 1 === $repos.length ? 'not-clickabe' : 'clickable'}" data-page="${i + 2}" data-current="${i + 1}" data-action="2">Próximo</button>`
            if (i === 0) {
                $repos[i].innerHTML += `<div class="buttons">
                <button class="prev not-clickabe" data-page="${i}" data-current="${i + 1}" data-action="1">Anterior</button>
                ${button_html}
                </div>`
            } else {
                $repos[i].innerHTML += `<div class="buttons">
                <button class="prev clickable" data-page="${i}" data-current="${i + 1}" data-action="1">Anterior</button>
                ${button_html}
                </div>`
            }
        }
    }
    
    page--
    ReposCount++
    
    $header.querySelector('.count').innerText = ReposCount;
    
    $header.classList.add('active');
    document.querySelector('section.container.result div.repos[data-page="1"]').classList.add('active');

    
    if (page > 1) {
        const $buttons = document.querySelectorAll('section.container.result div.repos div.buttons button.clickable')
        
        $buttons.forEach($button => {
            $button.addEventListener('click', () => {
                const newPage = Number($button.dataset.page);
                const currentPage = Number($button.dataset.current);

                if (newPage !== 0 && currentPage < pages.length || Number($button.dataset.action) === 1) {
                    const $result = document.querySelector('section.container.result');
                    $result.querySelector(`div.repos[data-page="${currentPage}"]`).classList.remove('active');
                    $result.querySelector(`div.repos[data-page="${newPage}"]`).classList.add('active');
                    window.scrollTo(0, 0);
                } else {
                    console.log(newPage !== 0, currentPage < pages.length, $button.dataset.action === 1);
                    console.log(newPage, currentPage, $button.dataset.action);
                }
            })
        });
    }
}