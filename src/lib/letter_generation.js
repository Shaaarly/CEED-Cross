import { calculateLetterPositions } from '../lib/letter_positions.js';

// Genera la rueda de letras y posiciona cada una de ellas en la interfaz
function generateWheelLetter(letters) {

    const letterPositions = calculateLetterPositions(letters.length);
    const wheelContainer = document.getElementById('wheel');

    wheelContainer.innerHTML = '';

    letterPositions.forEach(({ left, top }, i) => {

        let wheelLetter = document.createElement('div');
        wheelLetter.classList.add('wheel-letter');
        wheelLetter.style.top = `${top}`;
        wheelLetter.style.left = `${left}`;
        wheelLetter.innerHTML = letters.charAt(i);

        wheelContainer.appendChild(wheelLetter);
    });
}

export default generateWheelLetter;