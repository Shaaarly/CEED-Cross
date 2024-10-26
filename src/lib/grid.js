import { center } from './center.js';

function centerGrid(maxCol, maxRow, wordPositions) {

    const gridContainer = document.getElementById('grid');

    gridContainer.innerHTML = '';

    wordPositions.forEach(({ origin, direction, length }) => {
        const [startRow, startCol] = origin;

        for (let i = 0; i < length; i++) {
            const letterContainer = document.createElement('div');
            letterContainer.classList.add('letter');

            let row = startRow + (direction === 'vertical' ? 0 : i);
            let col = startCol + (direction === 'horizontal' ? 0 : i);

            let [despX, despY] = center(maxCol, maxRow, 10, 10)

            let finalCol = col + despX;
            let finalRow = row + despY;

            letterContainer.style.gridArea = `${finalCol + 1} / ${finalRow + 1}`;
            gridContainer.appendChild(letterContainer);
        }
    });
}

function generateGrid(wordPositions) {

    let maxRow = 0;
    let maxCol = 0;

    wordPositions.forEach(({ origin, direction, length }) => {
        const [startRow, startCol] = origin;

        for (let i = 0; i < length; i++) {

            let row = startRow + (direction === 'vertical' ? 0 : i);
            let col = startCol + (direction === 'horizontal' ? 0 : i);

            maxRow = Math.max(maxRow, row);
            maxCol = Math.max(maxCol, col);
        }
    });

    centerGrid(maxCol, maxRow, wordPositions);
}

export default generateGrid;