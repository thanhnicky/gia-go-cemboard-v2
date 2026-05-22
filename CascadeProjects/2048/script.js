class Game2048 {
    constructor() {
        this.gridSize = 4;
        this.grid = [];
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('best2048')) || 0;
        this.gameOver = false;
        this.won = false;
        this.tileContainer = document.getElementById('tile-container');
        this.scoreElement = document.getElementById('score');
        this.bestScoreElement = document.getElementById('best-score');
        this.gameMessage = document.getElementById('game-message');
        this.gameMessageText = document.getElementById('game-message-text');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.newGame();
    }
    
    setupEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
        document.getElementById('retry-btn').addEventListener('click', () => this.newGame());
        
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Touch support
        let touchStartX, touchStartY;
        const gameContainer = document.querySelector('.game-container');
        
        gameContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        gameContainer.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            const minSwipeDistance = 50;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        this.move('right');
                    } else {
                        this.move('left');
                    }
                }
            } else {
                if (Math.abs(deltaY) > minSwipeDistance) {
                    if (deltaY > 0) {
                        this.move('down');
                    } else {
                        this.move('up');
                    }
                }
            }
            
            touchStartX = null;
            touchStartY = null;
        });
    }
    
    handleKeyPress(e) {
        if (this.gameOver) return;
        
        const keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'w': 'up',
            's': 'down',
            'a': 'left',
            'd': 'right'
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            this.move(keyMap[e.key]);
        }
    }
    
    newGame() {
        this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.won = false;
        this.updateScore();
        this.gameMessage.classList.remove('active');
        this.tileContainer.innerHTML = '';
        
        this.addRandomTile();
        this.addRandomTile();
        this.render();
    }
    
    addRandomTile() {
        const emptyCells = [];
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[row][col] = Math.random() < 0.9 ? 2 : 4;
            return { row, col };
        }
        return null;
    }
    
    move(direction) {
        if (this.gameOver) return;
        
        const oldGrid = JSON.stringify(this.grid);
        let moved = false;
        let scoreGained = 0;
        
        const rotateGrid = (times) => {
            for (let t = 0; t < times; t++) {
                const newGrid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(0));
                for (let row = 0; row < this.gridSize; row++) {
                    for (let col = 0; col < this.gridSize; col++) {
                        newGrid[col][this.gridSize - 1 - row] = this.grid[row][col];
                    }
                }
                this.grid = newGrid;
            }
        };
        
        const rotations = { 'up': 0, 'right': 1, 'down': 2, 'left': 3 };
        rotateGrid(rotations[direction]);
        
        // Move up logic
        for (let col = 0; col < this.gridSize; col++) {
            let writeRow = 0;
            let lastValue = 0;
            let lastWriteRow = -1;
            
            for (let row = 0; row < this.gridSize; row++) {
                const value = this.grid[row][col];
                if (value === 0) continue;
                
                if (value === lastValue && lastWriteRow >= 0) {
                    this.grid[lastWriteRow][col] = value * 2;
                    this.grid[row][col] = 0;
                    scoreGained += value * 2;
                    lastValue = 0;
                    lastWriteRow = -1;
                    moved = true;
                    
                    if (value * 2 === 2048 && !this.won) {
                        this.won = true;
                    }
                } else {
                    if (row !== writeRow) {
                        this.grid[writeRow][col] = value;
                        this.grid[row][col] = 0;
                        moved = true;
                    }
                    lastValue = value;
                    lastWriteRow = writeRow;
                    writeRow++;
                }
            }
        }
        
        // Rotate back
        rotateGrid((4 - rotations[direction]) % 4);
        
        if (moved) {
            this.score += scoreGained;
            this.updateScore();
            
            const newTile = this.addRandomTile();
            this.render(newTile);
            
            if (this.won && !this.gameOver) {
                this.showGameMessage('You Win!');
            } else if (this.isGameOver()) {
                this.gameOver = true;
                this.showGameMessage('Game Over!');
            }
        }
    }
    
    isGameOver() {
        // Check for empty cells
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === 0) return false;
            }
        }
        
        // Check for possible merges
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const value = this.grid[row][col];
                if (row < this.gridSize - 1 && this.grid[row + 1][col] === value) return false;
                if (col < this.gridSize - 1 && this.grid[row][col + 1] === value) return false;
            }
        }
        
        return true;
    }
    
    showGameMessage(message) {
        this.gameMessageText.textContent = message;
        this.gameMessage.classList.add('active');
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('best2048', this.bestScore);
        }
        this.bestScoreElement.textContent = this.bestScore;
    }
    
    render(newTilePos = null) {
        this.tileContainer.innerHTML = '';
        
        const containerRect = this.tileContainer.getBoundingClientRect();
        const cellSize = (containerRect.width - 30) / 4; // 30 is total gap (10px * 3)
        const gap = 10;
        
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const value = this.grid[row][col];
                if (value === 0) continue;
                
                const tile = document.createElement('div');
                tile.className = `tile tile-${value > 2048 ? 'super' : value}`;
                
                if (newTilePos && newTilePos.row === row && newTilePos.col === col) {
                    tile.classList.add('tile-new');
                }
                
                tile.textContent = value;
                
                const x = col * (cellSize + gap);
                const y = row * (cellSize + gap);
                
                tile.style.width = `${cellSize}px`;
                tile.style.height = `${cellSize}px`;
                tile.style.transform = `translate(${x}px, ${y}px)`;
                
                this.tileContainer.appendChild(tile);
            }
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});
