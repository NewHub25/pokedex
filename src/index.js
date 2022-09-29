import './welcome.css';
import './ui.css';
import './colorTypes.css';
import './bgDark.css';
import './search.css';

//Cambiar el color de fondo
function toggleDay() {
    [
        document.body,
        document.querySelector('[name="sunny"]'),
        document.querySelector('[name="moon"]'),
    ].forEach(el => el.classList.toggle('day'));
}
document.querySelector('.user_day')
    .addEventListener('click', toggleDay);
