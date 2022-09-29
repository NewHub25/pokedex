import { openModal } from "./modal";

//Construir un buscador de pokemones
const user_input = document.querySelector('.user_input');
const user_keyList = document.querySelector('.user_search .keyList')
document.querySelector('.user_search > [name="search-circle"]')
    .addEventListener('click', () => {
        user_input.classList.toggle('show');
        user_input.value = '';
    });

async function searchpPokeApi() {
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0', {method: 'GET'})
        .then(resp => resp.json())
        .then(obj => {
            const pokeKeyList = obj.results.map(it => it.name);
            const newPokeList = user_input.value && pokeKeyList.filter(item => {
                // RegExp(item.split('').join('?'),'i').test(INPUT.value)
                return RegExp(user_input.value.split('').join('.*?'),'i').test(item)
            });
            user_keyList.innerHTML = '';
            if(!newPokeList.length) {
                user_keyList.style.opacity = 0;
            }
            else {
                newPokeList.forEach(pokeText => {
                    user_keyList.innerHTML += `<div data-key="${pokeText}">${pokeText}</div>`;
                });
                user_keyList.style.opacity = 1;
            }
        })
        .catch(e => console.warn(e));
}

user_keyList.addEventListener('click', event => {
    if(event.target.tagName === 'DIV') {
        openModal(event.target.textContent);
        user_keyList.innerHTML = '';
        user_keyList.style.opacity = 0;
    }
    else return;
});
user_input.addEventListener('keyup', searchpPokeApi);