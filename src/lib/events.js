import { getElementCenter, lengthAndAngle } from './line_positions.js';
import { createLine, updateLine } from './line.js';

function dragEvent() {

    const wheelLetters = document.getElementsByClassName('wheel-letter');
    let currentLine = null;
    let selectedLetters = [];

    let previousLetter = null;
    let previousLine = null;
    // const wheel = document.getElementById('wheel');
    const html = document.documentElement;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    function onMouseMove(e) {
        if (currentLine && previousLetter) {
            const { x: startX, y: startY } = getElementCenter(previousLetter);
            const { length, angle } = lengthAndAngle([startX, startY], [e.clientX, e.clientY]);
            updateLine(currentLine, length, angle);
        }
    }

    Array.from(wheelLetters).forEach(letter => {

        letter.addEventListener('mousedown', function (e) {

            e.preventDefault();
            letter.classList.add('selected');
            selectedLetters.push(letter.innerText);
            previousLetter = letter;
            // console.log(letter)
            
            // prevent calling getElementCenter with null
            if (!previousLetter) return;
            const { x: startX, y: startY } = getElementCenter(previousLetter);

            console.log(startX, startY)

            currentLine = createLine(startX + scrollX, startY + scrollY);

            // console.log(currentLine)

            // wheel.appendChild(currentLine);
            html.appendChild(currentLine)

            document.addEventListener('mousemove', onMouseMove);

            // Calculo de colision
            Array.from(wheelLetters).forEach(collisionLetter => {

                // console.log(letter)
                collisionLetter.addEventListener('mouseenter', () => {
                    // TODO: Remove the listener on mouseup
                    if (!previousLetter) return
                    if (!collisionLetter.classList.contains('selected')){
                        const { x: finalX, y: finalY } = getElementCenter(collisionLetter)
                        const { x: iniX, y: iniY } = getElementCenter(previousLetter)
                        collisionLetter.classList.add('selected');
                        selectedLetters.push(collisionLetter.innerText);
                        const { length, angle } = lengthAndAngle([iniX, iniY], [finalX, finalY])
                        updateLine(currentLine, length, angle);
                        currentLine = null
                        previousLine = currentLine;
                        previousLetter = collisionLetter
                        if (wheelLetters.length > selectedLetters.length){
                            currentLine = createLine(finalX, finalY)
                            html.appendChild(currentLine);
                        }
                    }

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
}


export {
    dragEvent
}
