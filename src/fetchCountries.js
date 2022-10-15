import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
        return;
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
