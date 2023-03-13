function add (operand1, operand2) {
    return operand1 + operand2;
}

function subtract (operand1, operand2) {
    return operand1 - operand2;
}

function multiply (operand1, operand2) {
    return operand1 * operand2;
}

function divide (operand1, operand2) {
    return operand1 / operand2;
}

function operate(operator, operand1, operand2) {
    if (operator == 'multiply') {
        return multiply(operand1, operand2);
    }
    if (operator == 'add') {
        return add(parseInt(operand1), parseInt(operand2));
    }
    if (operator == 'subtract') {
        return subtract(operand1, operand2);
    }
    if (operator == 'divide') {
        return divide(operand1, operand2);
    }
}

const display = document.getElementById('display');
const number = document.querySelectorAll('.number');
number.forEach(number => number.addEventListener('click', updateDisplay));

const operator = document.querySelectorAll('.operator');
operator.forEach(operator => operator.addEventListener('click', prepareOperation));

document.getElementById('clear').addEventListener('click', clearDisplay);
document.getElementById('equals').addEventListener('click', temp);
let currentValue = '';
let previousValue = '';
let currentOperator = '';
let keepGoing = false;
let recentOperator = false;

function updateDisplay(e) {
    if (keepGoing == true && recentOperator == false) {
        keepGoing = false;
        recentOperator = false;
        currentValue = '';
        previousValue = 0;
    }
    if (this.value !== 'backspace') {
        currentValue += this.value;
    }
    if (this.value == 'backspace') {
        currentValue = currentValue.slice(0, -1);
    }
    if (currentValue == '') {
        display.textContent = '0';
    } else {
    display.textContent = currentValue;
    }
    
    return currentValue;
}

function clearDisplay() {
    currentValue = '';
    display.textContent = '0';
    return currentValue;
}

function temp() {
    currentValue = operate(currentOperator, previousValue, currentValue);
    display.textContent = currentValue;
    previousValue = '';
    keepGoing = true;
    recentOperator = false;
    return currentValue;
}

function prepareOperation(e) {
    recentOperator = true;
    currentOperator = this.id;
    previousValue = currentValue;
    currentValue = '';
    
}