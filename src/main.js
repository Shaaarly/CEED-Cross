import './styles/styles.css';
import './lib/fontawesome.js';
import { Game } from './lib/Game.js';
import generateGrid from './lib/grid.js';
import generateWheelLetter from './lib/letter_generation.js';
import { dragEvent } from './lib/events.js';

const game = new Game(2);
const wordPositions = game.wordPositions;
const letters = game.letters;

generateGrid(wordPositions);
generateWheelLetter(letters);
dragEvent();



