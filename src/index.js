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

//Mover el input del buscador si el dispositivo es Android
function isAndroid() {
    if(navigator.userAgent.match(/android/i)) {
        document.querySelector('.user_input').classList.add('mobile');
    }
}
isAndroid();