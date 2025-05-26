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

// operate(5,20, operators["add"]);
// operate(5,20, operators.subtract);
// operate(5,20, operators.multiply); 
// operate(5,20, operators.divide); 
const numberButtons = document.querySelectorAll('.number');

function updateNumberDisplay() {

    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // after operator being clicked
            if (operatorStatus) {
                numberDisplay.textContent = "";
                operatorStatus = false;
                if (button.value == '.') {
                   numberDisplay.textContent = '0.'; 
                   return;
                } 
            }
            // If default number already 0
            if (button.value == '0') {
                if (numberDisplay.textContent == '0') return;
            } else if (button.value == '.') {
                // Number only contain 1 dot
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
const operatorButtons = document.querySelectorAll('.operator');

// input number
// if operator is being clicked
                                        // store number in variable 1 /
                                        // if input different number /
                                            // reset number display /
                                            // update number display /
                                            // toggle off operator /
                                        // if operator is being clicked again
                                            // store number in variable 2 /
                                                // proceed the operation
                                                // update number display
// if = is being pressed
    // store number in variable 2
        // proceed the operation
        // update number display
// 

let numbers = [];
let operatorStatus = false;
let currentOperator;

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        numbers.push(+numberDisplay.textContent);
        console.log(numbers);

        // toggle operator mode
        operatorStatus = true;
        operatorButtons.forEach(btn => btn.classList.remove('activate'));
        button.classList.add('activate');
        console.log(operatorStatus);
        currentOperator = button.value;
        console.log(currentOperator);

        if (numbers.length > 1) {
            let a = numbers.at(-2);
            let b = numbers.at(-1);
            console.log(a);
            console.log(b);
            let product = operate(a, b, operators[button.value]);
            numbers.push(product);
            numberDisplay.textContent = product;
        }
    });
});

let test = {
    add:        false,
    subtract:   false,
    multiply:   false,
    divide:     false,
} 

updateNumberDisplay();
