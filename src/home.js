import moment from "moment/moment";
import 'moment/locale/es';
import { setType, loader } from './shared';
import { openModal } from './modal';

const currentDate = document.querySelector('[data-date^="current"]');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

setInterval(() => {
    currentDate.textContent =
    moment().format('dddd MMMM D, YYYY, h:mm:ss a');
}, 1000);

document.querySelector('h1').addEventListener('click', () => {
    openModal('cloyster');
});