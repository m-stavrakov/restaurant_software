// *************************** Circles Background ***************************

document.addEventListener("DOMContentLoaded", function() {
    // Function to generate random position for a circle
    function generateRandomPosition() {
        const gridSize = 100; // Define grid size to avoid overlap
        const maxAttempts = 10; // Maximum number of attempts to find a non-overlapping position

        let randomX, randomY;

        // Attempt to find a non-overlapping position
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            randomX = Math.random() * window.innerWidth;
            randomY = Math.random() * window.innerHeight;

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

// *************************** Image slider ***************************

let img = document.getElementById('img-slider');
let sliderImgs = ['/static/images/waiter2.jpg', '/static/images/waiter3.jpg', '/static/images/waiter4.jpg', '/static/images/paying1.jpg', '/static/images/paying2.jpg']
let start = 0
if (img){
    function slider(){
        if (start < sliderImgs.length){
            start++;
        }else{
            start = 1;
        }

        img.innerHTML = "<img src=" + sliderImgs[start-1] + ">";
    };

    setInterval(slider, 4000);
}
// *************************** Scroll Image ***************************

let home = document.getElementById('home-page')
if (home){
    document.addEventListener('DOMContentLoaded', function () {
        let hoverableOne = document.querySelector('.hoverable');
        let hiddenTextOne = document.getElementById('hidden-text_one');

        window.addEventListener('scroll', function () {
            let scrollPos = window.scrollY;

            if (scrollPos > 30) { 
                hoverableOne.classList.add('scrolled');
                hiddenTextOne.classList.add('show-text');
            } else {
                hoverableOne.classList.remove('scrolled');
                hiddenTextOne.classList.remove('show-text');
            }
        });
    });
};

// *************************** Calculations Description ***************************

let calculatorPresent = document.querySelector('.calculator-container');

if (calculatorPresent){
    document.addEventListener('DOMContentLoaded', function () {
        const formGroups = document.querySelectorAll('.form-group');
        const hiddenListItems = document.querySelectorAll('#hidden-list li');
    
        formGroups.forEach(function (formGroup) {
            formGroup.addEventListener('mouseover', function () {
                // Hide all list items
                hiddenListItems.forEach(function (item) {
                    item.style.display = 'none';
                });
    
                // Show the corresponding list item
                const index = formGroup.getAttribute('data-index');
                hiddenListItems[index].style.display = 'block';
            });
        });
    
        // Hide the list when mouse leaves the form container
        document.querySelector('.bill_form').addEventListener('mouseleave', function () {
            hiddenListItems.forEach(function (item) {
                item.style.display = 'none';
            });
        });
    });
};

// *************************** Deleting Calculations ***************************

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

// *************************** Deleting Notes ***************************

$(document).on('click', '.delete_button', function() {
    // Retrieve the order ID from the data-order-id attribute (html)
    let orderId = $(this).data('order-id'); //this refers to the clicked element

    // Send an asynchronous request to delete the order
    $.ajax({
        url: '/delete_order/' + orderId,
        type: 'POST',
        success: function(response) {
            if (response.success) {
                // Reload the order list after successful deletion
                $('#orders_list').load(location.href + ' #orders_list');
            } else {
                console.error('Delete failed:', response.error);
            }
        },
        error: function(xhr, status, error) {
            console.error('Delete error:', error);
        }
    });
});

// *************************** Notes Options ***************************

let table_options = document.getElementById('table_options');

if (table_options){
    table_options.addEventListener('change', function () {
        let label = document.querySelector('.label-title');
        if (this.value !== '') {
            label.style.top = '-5px';
        } else {
            label.style.top = '50%';
        }
    });
};

// *************************** Textarea Decoration ***************************

let linestart = function(txt, st) {
    let ls = txt.split("\n");
    let i = ls.length-1;
    ls[i] = st+ls[i];
    return ls.join("\n");
  };
  $('textarea').on('keydown', function(e) {
    let t = $(this);
    if(e.which == 13) {
      t.val(linestart(t.val(), '•') + "\n");
      return false;
    }  
  });

// *************************** Currency ***************************

let converterPresent = document.querySelector('.converter-form');
let from_currency = document.getElementById('from_currency');
let to_currency = document.getElementById('to_currency');
let amountInput = document.getElementById('amount');
if (converterPresent ){
    function updateLabelPosition() {
        let labelFrom = document.querySelector('.currency-title_from');
        let labelTo = document.querySelector('.currency-title_to');
    
        if (from_currency.value !== '') {
            labelFrom.classList.add('selectedOption');
        } else {
            labelFrom.classList.remove('selectedOption');
        }
    
        if (to_currency.value !== '') {
            labelTo.classList.add('selectedOption');
        } else {
            labelTo.classList.remove('selectedOption');
        }
    
        if (amountInput.value !== '') {
            amountInput.classList.add('selectedOption');
        } else {
            amountInput.classList.remove('selectedOption');
        }
    }
    
    if (from_currency && to_currency && amountInput) {
        // Initial label position update
        updateLabelPosition();
        
        // Event listeners for changes in the form elements
        from_currency.addEventListener('input', updateLabelPosition);
        to_currency.addEventListener('input', updateLabelPosition);

        // Handle 'change' event for compatibility
        from_currency.addEventListener('change', updateLabelPosition);
        to_currency.addEventListener('change', updateLabelPosition);

        amountInput.addEventListener('input', updateLabelPosition);
    }
};

// *************************** Currency ***************************

const closeBtn = document.querySelectorAll('.close');

closeBtn.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
        this.parentElement.style.display = 'none';
    });
});
