const operators = {
    add:        function(a, b) { return a + b ;},
    subtract:   function(a, b) { return a - b ;},
    multiply:   function(a, b) { return a * b ;},
    divide:     function(a, b) { return a / b ;},
}
// set number display length
const displayLength = 12;

function operate(a, b, operator) {
    let product = `${operator(a,b)}`;
    // prevent display overflow 
    if (product.length > displayLength) {
        product = product.slice(0, displayLength);
    }
    // console.log(product);
    return +product;
    // return operator(a, b);
}

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
            // after equal being press
            if (currentEqualStatus) {
                numberDisplay.textContent = "";
                currentEqualStatus = false;
                if (button.value == '.') {
                        numberDisplay.textContent = '0.'; 
                        return;
                }  
            }
            // prevent number overflow on user input
            if (numberDisplay.textContent.length > displayLength - 1) return;
            
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

const expressionDisplay = document.querySelector('.expression');
const numberDisplay = document.querySelector('.number-display');
const operatorButtons = document.querySelectorAll('.operator');

let numbers = [];
let currentOperator;
let currentEqualStatus = false;
let operatorStatus = false;
let operatorStat = {
    add: false,
    subtract: false,
    multiply: false,
    divide: false,
};

function operatorFunctions() {
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentNumber = +numberDisplay.textContent;
            const value = button.value;
    
            if (value !== 'equal') {
                if (!operatorStatus && !currentEqualStatus) {
                    numbers.push(currentNumber);
                    expressionDisplay.textContent = `${currentNumber} ${button.textContent}`
                } else if (operatorStatus && numbers.length == 1) {
                    numbers.push(currentNumber);
                }
                
                if (currentEqualStatus) {
                   expressionDisplay.textContent = `${numbers[0]} ${button.textContent}`; 
                }
                
                if (numbers.length == 2) {
                    calcProduct(currentOperator);
                    console.log(`product: ${numbers}`);
                    operatorStatus = false;
                }
    
                toggleOperator(value);
                currentOperator = value;
                operatorStatus = true;
                currentEqualStatus = false;
                console.log(numbers);
            } else {
                currentEqualStatus = true;
                if (numbers.length == 0) return;
                if (!operatorStatus && numbers.length == 1) {
                    numbers.push(currentNumber);
                    // calcProduct(currentOperator);
                } 
                if (numbers.length === 2 && currentOperator) {
                    calcProduct(currentOperator);
                    expressionDisplay.textContent += ` ${currentNumber} =`; 
                    operatorStatus = false;
                }
            }
        });
    });
}

function calcProduct(operator) {
    let a = numbers.at(-2);
    let b = numbers.at(-1);
    let product = operate(a, b, operators[operator]);
    
    if (b == 0 && operator == 'divide') {
        numberDisplay.textContent = 'lmao';
        numbers = [];
        operatorStatus = false;
        return;
    }
    // Update number display
    numberDisplay.textContent = product;
    numbers = [product];
}

function toggleOperator(operator) {
    // turn off all operator 
    for (let key in operatorStat) {
        operatorStat[key] = false;
    }
    // activate current operator
    operatorStat[operator] = true;
}

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => reset());

function reset() {
    numbers = [];
    numberDisplay.textContent = '0';
    expressionDisplay.textContent = '';
    operatorStatus = false;
    currentEqualStatus = false;
}

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', deleteNumber);

function deleteNumber() {
    // delete number on display
   if (numberDisplay.textContent.length >= 1) {
        let currentDisplay = numberDisplay.textContent;
        numberDisplay.textContent = currentDisplay.slice(0, -1);
    }
    if (numberDisplay.textContent.length == 0) {
        numberDisplay.textContent = '0';
    } 
}

const negativeButton = document.querySelector('.negative')
negativeButton.addEventListener('click', toggleNegative);

function toggleNegative() {
    let currentDisplay = numberDisplay.textContent;

    if (numberDisplay.textContent == '0') return;
    // if number not more or less than 0
    if (!/[1-9]/.test(numberDisplay.textContent)) return;

    if (numberDisplay.textContent.at(0) == '-') {
        numberDisplay.textContent = `${currentDisplay.slice(1)}`;
        return;
    }
    numberDisplay.textContent = `-${currentDisplay}`;
}

// Keyboard feature
document.addEventListener('keypress', handleKeyPress);

function handleKeyPress(e) {
    const key = e.key;
    console.log(key);
        
        if ((key >= 0 && key <= 9) ||
             key === '.') {
            const numButton = document.querySelector(`button.number[value="${key}"]`);
            if (numButton) numButton.click();
        } 

        if (key === '+') operatorClick('add');
        if (key === '-') operatorClick('subtract');
        if (key === '*') operatorClick('multiply');
        if (key === '/') operatorClick('divide');
        if (key === 'Enter' || key === '=') operatorClick('equal');

        if (key === 'r') {
            document.querySelector('.reset').click();
        }

}

function operatorClick(operator) {
    const opButton = document.querySelector(`button.operator[value="${operator}"]`);
    if (opButton) opButton.click();
}

updateNumberDisplay();
operatorFunctions();