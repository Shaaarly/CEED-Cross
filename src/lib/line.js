function createLine(x, y) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.left = `${x}px`;
    line.style.top = `${y}px`;
    return line;
}

function updateLine(line, length, angle) {
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
}

export {
    createLine,
    updateLine
}