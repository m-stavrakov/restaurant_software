document.addEventListener("DOMContentLoaded", function() {
    // Number of circles you want to add
    const numCircles = 40;

    // Get the container where circles will be added
    const container = document.querySelector('body');

    // Array to store occupied grid cells
    const occupiedCells = new Set();

    // Function to generate random grid coordinates
    function generateRandomGridCoordinates() {
        const gridSize = 100; // Size of each grid cell
        const numCols = Math.floor(window.innerWidth / gridSize);
        const numRows = Math.floor(window.innerHeight / gridSize);
        const randomCol = Math.floor(Math.random() * numCols);
        const randomRow = Math.floor(Math.random() * numRows);
        return { col: randomCol, row: randomRow };
    }

    // Function to check if a grid cell is occupied
    function isCellOccupied(col, row) {
        return occupiedCells.has(`${col},${row}`);
    }

    // Function to mark a grid cell as occupied
    function markCellAsOccupied(col, row) {
        occupiedCells.add(`${col},${row}`);
    }

    // Loop to create and position each circle
    for (let i = 0; i < numCircles; i++) {
        // Create a new circle element
        const circle = document.createElement('div');
        circle.classList.add('circle');

        // Generate random grid coordinates
        let randomCol, randomRow;
        do {
            ({ col: randomCol, row: randomRow } = generateRandomGridCoordinates());
        } while (isCellOccupied(randomCol, randomRow));

        // Mark the grid cell as occupied
        markCellAsOccupied(randomCol, randomRow);

        // Calculate position based on grid coordinates
        const gridSize = 100; // Size of each grid cell
        const offsetX = randomCol * gridSize + gridSize / 2 - circle.offsetWidth / 2;
        const offsetY = randomRow * gridSize + gridSize / 2 - circle.offsetHeight / 2;

        // Set position of the circle
        circle.style.left = `${offsetX}px`;
        circle.style.top = `${offsetY}px`;

        // Append the circle to the container
        container.appendChild(circle);
    }
});