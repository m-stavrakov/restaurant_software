// document.addEventListener("DOMContentLoaded", function() {
//     // Number of circles you want to add
//     const numCircles = 40;

//     // Get the container where circles will be added
//     const container = document.querySelector('body');

//     // Array to store occupied grid cells
//     const occupiedCells = new Set();

//     // Function to generate random grid coordinates
//     function generateRandomGridCoordinates() {
//         const gridSize = 100; // Size of each grid cell
//         const numCols = Math.floor(window.innerWidth / gridSize);
//         const numRows = Math.floor(window.innerHeight / gridSize);
//         const randomCol = Math.floor(Math.random() * numCols);
//         const randomRow = Math.floor(Math.random() * numRows);
//         return { col: randomCol, row: randomRow };
//     }

//     // Function to check if a grid cell is occupied
//     function isCellOccupied(col, row) {
//         return occupiedCells.has(`${col},${row}`);
//     }

//     // Function to mark a grid cell as occupied
//     function markCellAsOccupied(col, row) {
//         occupiedCells.add(`${col},${row}`);
//     }

//     // Loop to create and position each circle
//     for (let i = 0; i < numCircles; i++) {
//         // Create a new circle element
//         const circle = document.createElement('div');
//         circle.classList.add('circle');

//         // Generate random grid coordinates
//         let randomCol, randomRow;
//         do {
//             ({ col: randomCol, row: randomRow } = generateRandomGridCoordinates());
//         } while (isCellOccupied(randomCol, randomRow));

//         // Mark the grid cell as occupied
//         markCellAsOccupied(randomCol, randomRow);

//         // Calculate position based on grid coordinates
//         const gridSize = 100; // Size of each grid cell
//         const offsetX = randomCol * gridSize + gridSize / 2 - circle.offsetWidth / 2;
//         const offsetY = randomRow * gridSize + gridSize / 2 - circle.offsetHeight / 2;

//         // Set position of the circle
//         circle.style.left = `${offsetX}px`;
//         circle.style.top = `${offsetY}px`;

//         // Append the circle to the container
//         container.appendChild(circle);
//     }
// });
document.addEventListener("DOMContentLoaded", function() {
    // Function to generate random position for a circle
    function generateRandomPosition() {
        const gridSize = 100; // Define grid size to avoid overlap
        const maxAttempts = 10; // Maximum number of attempts to find a non-overlapping position

        // Attempt to find a non-overlapping position
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;

            // Check if the position overlaps with existing circles
            let overlapping = false;
            for (const circle of document.querySelectorAll('.circle')) {
                const circleRect = circle.getBoundingClientRect();
                if (Math.abs(circleRect.left - randomX) < gridSize && Math.abs(circleRect.top - randomY) < gridSize) {
                    overlapping = true;
                    break;
                }
            }

            // If the position does not overlap, return it
            if (!overlapping) {
                return { x: randomX, y: randomY };
            }
        }

        // If max attempts reached without finding a non-overlapping position, return the last position
        return { x: randomX, y: randomY };
    }

    // Function to add circles dynamically
    function addCircles() {
        // Remove existing circles
        document.querySelectorAll('.circle').forEach(circle => circle.remove());
        
        // Number of circles based on window height
        const windowHeight = window.innerHeight;
        const numCircles = Math.floor(windowHeight / 30); // Adjust circle size as needed
        
        // Get the container where circles will be added
        const container = document.querySelector('.circle-container');

        // Loop to create and position each circle
        for (let i = 0; i < numCircles; i++) {
            // Create a new circle element
            const circle = document.createElement('div');
            circle.classList.add('circle');

            // Generate random position for the circle
            const { x, y } = generateRandomPosition();

            // Set position of the circle
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;

            // Append the circle to the container
            container.appendChild(circle);
        }
    }

    // Initial call to add circles
    addCircles();

    // Listen for window resize event to update circles
    window.addEventListener('resize', addCircles);
});

$(document).ready(function() {
    // Submit form asynchronously
    $('#calculator-form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            url: '/',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                if (response.success) {
                    // Clear form fields
                    $('#calculator-form')[0].reset();
                    // Reload results
                    $('#results-list').load(location.href + ' #results-list');
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });

    // Delete result asynchronously
    $(document).on('click', '.delete-button', function() {
        let resultId = $(this).data('result-id');
        $.ajax({
            url: '/delete_result/' + resultId,
            type: 'POST',
            success: function(response) {
                if (response.success) {
                    // Reload results
                    $('#results-list').load(location.href + ' #results-list');
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
});