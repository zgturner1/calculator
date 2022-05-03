let currentNum = '';

const upperDisplay = document.getElementById('upper-display');
const numberDisplay = document.getElementById('number-display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

numbers.forEach(button => button.addEventListener('click', function() {
    if(currentNum <= 9.999999 * Math.pow(10, 10)) { 
        currentNum += button.textContent;
        numberDisplay.textContent = currentNum;
    }
}))

function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function power(a, b) {
    return Math.pow(a, b);
}

function root(a, n) {
    return Math.pow(a, 1/n);
}