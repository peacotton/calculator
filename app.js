function add (operand1, operand2) {
    return +operand1 + +operand2;
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

function mod (operand1, operand2) {
    return operand1 % operand2;
}
function operate(operator, operand1, operand2) {
    if (operator == 'multiply') {
        return multiply(operand1, operand2);
    } if (operator == 'add') {
        return add(operand1, operand2);
    } if (operator == 'subtract') {
        return subtract(operand1, operand2);
    } if (operator == 'divide') {
        return divide(operand1, operand2);
    } if (operator == 'mod') {
        return mod(operand1, operand2);
    }
    
}

const display = document.getElementById('display');
const number = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
number.forEach(number => number.addEventListener('click', operandInput));
operator.forEach(operator => operator.addEventListener('click', prepareOperation));
document.getElementById('clear').addEventListener('click', clearDisplay);
document.getElementById('equals').addEventListener('click', equals);

let currentValue = '';
let currentOperator;
let operand1;
let operand2;
let keepGoing = false;
let recentOperator = false;

function operandInput(e) {
    //keepGoing will clear currentValue after calc() if an operand is next input
    if (keepGoing == true && recentOperator == false) {
        currentValue = '';
        keepGoing = false;
    }
    if (this.value !== 'backspace'){
        currentValue += this.value;
    } else if (this.value == 'backspace') {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentValue;
    if (!currentValue) {
        display.textContent = '0';
    }
    //this doesnt exactly round properly needs fixed with math.round
    if (currentValue.length > 9) {
        display.textContent = currentValue.substring(0, 9);
    }
}

function prepareOperation(e) {
    //if this is the first call, prepare for second operand
    if (!operand1) {
        currentOperator = this.id;
        operand1 = currentValue;
        currentValue = '';
    } else {
        operand2 = currentValue;
        calc();
        currentOperator = this.id;
    }
    recentOperator = true;
}

function calc() {   
    // console.log(`currentValue: ${currentValue}, currentOperator: ${currentOperator}, operand1: ${operand1}, operand2: ${operand2}`);
    currentValue = operate(currentOperator, operand1, operand2);
    updateDisplay();
    //after calculation, set result to operand1 for subsequent calcs
    operand1 = currentValue;
    //clear result to prepare for next input
    currentValue = '';
    //clear 2nd operand
    operand2 = '';
    //keepGoing and recentOperator allow us to overwrite the displayed result if user enters an operand next
    keepGoing = true;
    recentOperator = false;
    
}

function clearDisplay() {
    currentValue = '';
    operand1 = '';
    operand2 = '';
    currentOperator = '';
    updateDisplay();
}

function equals() {
    //equals function allows me to take a new operator on equals button
    //using only calc() results in the next input using the previous operator
    if (!operand2) {
        operand2 = currentValue;
    }
    calc();
    currentValue = operand1;
    operand1 = '';
}