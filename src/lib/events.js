import { getElementCenter, lengthAndAngle } from './line_positions.js';
import { createLine, updateLine } from './line.js';

function dragEvent() {

    const wheelLetters = document.getElementsByClassName('wheel-letter');
    let currentLine = null;
    let selectedLetters = [];
    let previousLetter = null;
    let previousLine = null;
    const wheel = document.getElementById('wheel');
    const html = document.documentElement;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    Array.from(wheelLetters).forEach(letter => {

        letter.addEventListener('mousedown', function (e) {

            e.preventDefault();
            letter.classList.add('selected');
            selectedLetters.push(letter);
            previousLetter = letter;
            console.log(letter)

            const { x: startX, y: startY } = getElementCenter(previousLetter);

            console.log(startX, startY)

            currentLine = createLine(startX + scrollX, startY + scrollY);

            console.log(currentLine)

            // wheel.appendChild(currentLine);
            html.appendChild(currentLine)

            document.addEventListener('mousemove', onMouseMove);

            // Calculo de colision
            Array.from(wheelLetters).forEach(letter => {

                console.log(letter)
                letter.addEventListener('mouseenter', () => {
                    const { finalX, finalY } = getElementCenter(letter)
                    const { iniX, iniY } = getElementCenter(previousLetter)
                    lengthAndAngle([iniX, iniY], [finalX, finalY])
                    html.appendChild(currentLine);
                    previousLine = currentLine;
                });
            })
        });
    });


    document.addEventListener('mouseup', function () {

        Array.from(wheelLetters).forEach(letter => {
            letter.classList.remove('selected')
        });

        document.querySelectorAll('.line').forEach(line => line.remove());

        selectedLetters = [];
        previousLetter = null;
        currentLine = null;

        document.removeEventListener('mousemove', onMouseMove);
    });
    function onMouseMove(e) {
        if (currentLine && previousLetter) {
            const { x: startX, y: startY } = getElementCenter(previousLetter);
            const mouseX = e.clientX - wheel.getBoundingClientRect().left;
            const mouseY = e.clientY - wheel.getBoundingClientRect().top;

            const { length, angle } = lengthAndAngle([startX, startY], [mouseX, mouseY]);
            updateLine(currentLine, length, angle);
        }
    }
}


export {
    dragEvent
}
