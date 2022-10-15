import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBoxRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');

searchBoxRef.addEventListener(
  'input',
  debounce(onSearchBoxInput, DEBOUNCE_DELAY)
);

function onSearchBoxInput(e) {
  const searchValue = e.target.value.trim();

  if (!searchValue) {
    countryListRef.innerHTML = '';
    return;
  }

  fetchCountries(searchValue).then(responseProcessing);
}

function responseProcessing(array) {
  if (!array) {
    return;
  }
  if (array.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (array.length > 1 && array.length < 10) {
    renderMarkupCards(array);
    return;
  }

  renderCard(array[0]);
}

function renderMarkupCards(cards) {
  const markup = cards
    .map(({ name: { official }, flags: { svg } }) => {
      return `
      <li class='item'>
       <img class='flag' src='${svg}' alt='flag ${official}'>
       <span class='name'>${official}</span>
      </li>`;
    })
    .join('');

  countryListRef.innerHTML = markup;
}

function renderCard({
  name: { official },
  capital,
  population,
  flags: { svg },
  languages,
}) {
  const allLanguages = Object.values(languages).join(',');

  const markup = `
  <li class='country'>
       <img class='country-flag' src='${svg}' alt='flag ${official}'>
       <span class='country-name'>${official}</span>
       <p><span class='text'>Capital:</span> ${capital}</p>
       <p><span class='text'>Population:</span> ${population}</p>
       <p><span class='text'>Languages:</span> ${allLanguages}</p>

  </li>
  `;
  countryListRef.innerHTML = markup;
}
