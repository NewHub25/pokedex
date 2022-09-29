import moment from "moment/moment";
import 'moment/locale/es';
import { setType, loaderAllLi } from './shared';
import { openModal, imgDefault } from './modal';

const currentDate = document.querySelector('[data-date^="current"]');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let offset = Math.floor(Math.random() * 1150);

setInterval(() => {
    currentDate.textContent =
    moment().format('dddd MMMM D, YYYY, h:mm:ss a');
}, 1000);

nextButton.addEventListener('click', event => {
    event.preventDefault();
    if(offset < 1154) {
        offset += 10;
        loaderAllLi();
        printPokemons();
    }
});

prevButton.addEventListener('click', event => {
    event.preventDefault();
    if(offset > 10) {
        offset -= 10;
        loaderAllLi();
        printPokemons();
    }
});

export function printPokemons() {
    nextButton.disabled = true;
    prevButton.disabled = true;

    const pokeListPromise = fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,{
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
            .then(listReady => {
                const ulPokeList = document.getElementById('pokelist');
                ulPokeList.innerHTML = '';
                listReady.forEach(pokemon => {
                    const { name, sprites, types } = pokemon;
                    const newHtmlLi = `
                    <li class="${setType(types[0].type.name)} fadeIn" id="${name}">
                        <img src="${sprites.front_default || imgDefault}" alt="${name}">
                        <h3>${name}</h3>
                    </li>
                    `;
                    ulPokeList.innerHTML += newHtmlLi;
                });
                const pokeAvatars = document.querySelectorAll('li');
                pokeAvatars.forEach(avatar => {
                    avatar.addEventListener('click', event => {
                        openModal(event.currentTarget.id);
                    });
                });
            nextButton.disabled = false;
            prevButton.disabled = false;
            })
            .catch(error => {
                console.log(error);
            });
    });
}

printPokemons();