const operators = {
    add:        function(a, b) { return a + b ;},
    subtract:   function(a, b) { return a - b ;},
    multiply:   function(a, b) { return a * b ;},
    divide:     function(a, b) { return a / b ;},
}

function operate(a, b, operator) {
    console.log(operator(a,b));
    return operator(a, b);
}

// operate(5,20, operators.add);
// operate(5,20, operators.subtract);
// operate(5,20, operators.multiply); 
// operate(5,20, operators.divide); 

function updateNumberDisplay() {
    const numberButtons = document.querySelectorAll('.number');

    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // If default number already 0
            if (button.value == '0') {
                if (numberDisplay.textContent == '0') return;
            }
            // Number only contain 1 dot
            if (button.value == '.') {
                if (numberDisplay.textContent.includes('.')) return;
            }
            // remove 0 if value is more than 0
            if (numberDisplay.textContent.charAt(0) == '0' &&
                numberDisplay.textContent.charAt(1) != '.' &&
                button.value !== '0' && button.value !== '.') {
                    numberDisplay.textContent = "";
                }
            numberDisplay.textContent += button.value; 
        })
    });
}

const numberDisplay = document.querySelector('.number-display');


// input number
// if operator is being clicked
    // store number in variable 1
    // if input different number
        // reset number display
        // update number display
// if operator is being clicked again
    // store number in variable 2
        // proceed the operation
        // update number display
// if = is being pressed
    // store number in variable 2
        // proceed the operation
        // update number display
const operatorButtons = document.querySelectorAll('.operator');
let numbers = [];
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        numbers.push(+numberDisplay.textContent);
        button.classList.toggle('activate');
        
        console.log(numbers);
    });
});



updateNumberDisplay();
