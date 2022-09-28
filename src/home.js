import moment from "moment/moment";
import 'moment/locale/es';
import { setType, loader } from './shared';
import { openModal } from './modal';
import { LogarithmicScale } from "chart.js";

const currentDate = document.querySelector('[data-date^="current"]');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let offset = 0;

setInterval(() => {
    currentDate.textContent =
    moment().format('dddd MMMM D, YYYY, h:mm:ss a');
}, 1000);

document.querySelector('h1').addEventListener('click', () => {
    openModal('monferno');
    getPokemons()
});

function getPokemons() {
    const pokeListPromise = fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,{
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            return data.results;
        })
        .catch(error => {
            console.log(error);
        });
    
    pokeListPromise.then(list => {
        Promise.all(
            list.map(async pokemon => {
                return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                    .then(response => response.json())
                    .then(pokemonDetails => {
                        return pokemonDetails;
                    });
            })
        )
    });
}