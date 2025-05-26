function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    return operator(a, b)
}
const numberDisplay = document.querySelector('.number-display');

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





















updateNumberDisplay();
