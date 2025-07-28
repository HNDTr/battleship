import * as display from './controllers/display'
import { Player } from "./models/player";
import './styles.css';




document.addEventListener('DOMContentLoaded', () => {
    const human = new Player();
    const computer = new Player();
    display.displayGameStart(human, computer);
});