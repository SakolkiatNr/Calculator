function add(a, b) {
    console.log(`${a} + ${b} = ${a+b}`)
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

operate(1,2,add);