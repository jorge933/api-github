import { Search } from "./functions/Search.js";

const $form = document.querySelector('section.search form');
const $formContainer = $form.parentElement;

$formContainer.classList.add('active');

$form.addEventListener('submit', e => {
    $formContainer.classList.remove('active');
    e.preventDefault();
    Search($form.querySelector('input[type="text"]').value);
})