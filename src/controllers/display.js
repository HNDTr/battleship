function boardDisplay() {
    const playerBoard = document.querySelector('.player-board');
    console.log(playerBoard)
    const gridBox = document.createElement('div');
    gridBox.className = 'grid-box';

    playerBoard.appendChild(gridBox);
}


export {boardDisplay}