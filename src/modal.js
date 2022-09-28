import { setType } from './shared';
import Chart from 'chart.js/auto'

const modalElement = document.querySelector('.user_modal-content > article.user_modal');
const modalContent = document.querySelector('.user_modal-content');

const abilities = [
    'Hp',
    'Attack',
    'Defense',
    'Special Attack',
    'Special Defense',
    'Speed',
];

function closeModal () {
    console.log('Modal cerrado');
    modalContent.classList.remove('active');
}

export const openModal = async pokemonName => {
    modalElement.innerHTML = '';
    modalContent.classList.add('active');
    await fetchData(pokemonName)
        .then(data => {
            console.log(data);
            buildDetails(data);
        });
    document.getElementById('close-button')
        .addEventListener('click', closeModal);
};

const fetchData = pokemonName => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
};

const buildDetails = data => {
    const { name, types, sprites, stats, weight, height } = data;
    const pokemonType = types[0].type.name;
    const { front_default } = sprites;
    const hp = stats[0].base_stat;
    const attack = stats[1].base_stat;
    const defense = stats[2].base_stat;
    const specialAttack = stats[3].base_stat;
    const specialDefense = stats[4].base_stat;
    const speed = stats[5].base_stat;
    modalElement.innerHTML += `
    <header class="user_modal-header ${setType(pokemonType)}">
        <button id="close-button" class="btn btn-danger"><ion-icon name="close-circle"></ion-icon></button>
        <img src="${front_default}" alt="${name}" class="image-detail">
    </header>
    <section class="user_modal-body">
        <nav id="pokemon-types"></nav>
        <nav class="pokemon-name">${name}</nav>
        <article class="chart-container">
            <canvas id="myChart"></canvas>
        </article>
        <footer class="weight-height-container">
            <h5 class="pokemon-stats">PESO: ${weight/10} KG</h5>
            <h5 class="pokemon-stats">ALTURA: ${height/10} M</h5>
        </footer>
    </section>
    `;
    const pokemonTypes = document.getElementById('pokemon-types');
    types.forEach(item => {
        const divType = `<div class="${setType(item.type.name)}">${item.type.name}</div>`;
        pokemonTypes.innerHTML += divType;
    });
    createChart(
        hp,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed    
    );
};

const createChart = (
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed
  ) => {
    const dataChart = {
      labels: abilities,
      datasets: [
        {
          label: 'Habilidades',
          backgroundColor: [
            '#12df72',
            '#36a2eb',
            '#ffce56',
            '#ff6384',
            '#d65252',
            '#ad57c3',
          ],
          data: [
            hp,
            attack,
            defense,
            specialAttack,
            specialDefense,
            speed,        
          ],
        },
      ],
    };
    const configChart = {
        type: 'doughnut',
        data: dataChart,
        options: {
        color: '#fff',
        maintainAspectRatio: false, //Para ajustarlo dentro del modal
        },
    };
    const myChart = new Chart(document.getElementById('myChart'), configChart);
};
  