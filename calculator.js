let currentNum = '';
let currentOperation = '';
let mostRecentResult = '';


const acButton = document.getElementById('ac');
const ceButton = document.getElementById('ce');
const upperDisplay = document.getElementById('upper-display');
const numberDisplay = document.getElementById('number-display');
const negativeButton = document.getElementById('making-negative');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const decimalButton = document.getElementById('decimal');
const equals = document.getElementById('equals');

acButton.addEventListener('click', function() {
    upperDisplay.textContent = '';
    numberDisplay.textContent = '0';
    currentNum = '';
    currentOperation = '';
});

ceButton.addEventListener('click', function() {
    let operatorIndex = getOperatorIndex(currentOperation);
    numberDisplay.textContent = '0';
    currentNum = '';
    currentOperation = currentOperation.substring(0, operatorIndex+1);

    if(numberDisplay.textContent == 'ERROR') {
        upperDisplay.textContent = '';
        numberDisplay.textContent = '0';
        currentOperation = '';
    }
});

negativeButton.addEventListener('click', function() {
    if(currentNum == '') {
        currentNum = mostRecentResult;
        currentNum = '' + -1*parseFloat(currentNum);
        currentOperation = currentNum;
        upperDisplay.textContent = currentNum;
        numberDisplay.textContent = currentNum;
    }
    else {
        currentNum = '' + -1*parseFloat(currentNum);
        if(!includesOperation(currentOperation)) {
            //it must be the first number
            currentOperation = currentNum;
        }
        else {
            let operatorIndex = getOperatorIndex(currentOperation);
            currentOperation = currentOperation.substring(0, operatorIndex+1) + currentNum;
        }
        console.log(currentOperation);
        upperDisplay.textContent = currentOperation;
        numberDisplay.textContent = currentNum;
    }
    
})

numbers.forEach(button => button.addEventListener('click', function() {
    if((currentNum <= 9.999999 * Math.pow(10, 10) && currentNum.length <= 12) || currentNum == '-') {
        currentNum += button.textContent;
        currentOperation += button.textContent;
        numberDisplay.textContent = currentNum;
        upperDisplay.textContent += button.textContent;
    }
}));

operators.forEach(button => button.addEventListener('click', function() {
    if(currentOperation.length > getOperatorIndex(currentOperation)) {
        //there must be a number after the operation
        evaluate();
        upperDisplay.textContent += ' ' + this.textContent + ' ';
        currentOperation += this.textContent;
    }
    else {
        //it is only a single number
        upperDisplay.textContent += ' ' + this.textContent + ' ';
        currentOperation += this.textContent;
        currentNum = '';
    }   

}));

decimalButton.addEventListener('click', function() {
    if(!currentNum.includes('.')) {
        currentNum += this.textContent;
        currentOperation += this.textContent;
        numberDisplay.textContent = currentNum;
        upperDisplay.textContent += this.textContent;
    }
})

equals.addEventListener('click', function() {
    evaluate();
});

function add(a, b) {
    return parseFloat(a)+parseFloat(b);
}

function subtract(a, b) {
    return parseInt(a)-parseInt(b);
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    if(b == 0) {
        alert('Don\'t divide by zero!');
        return 'ERROR';
    }

    return a/b;
}

function power(a, b) {
    return Math.pow(a, b);
}

function root(a, n) {
    return Math.pow(a, 1/n);
}

function operate(a, b, operator) {
    if(operator == '+')
        return add(a, b);
    else if(operator == '−')
        return subtract(a, b);
    else if(operator == '×')
        return multiply(a, b);
    else if(operator == '÷')
        return divide(a, b);
    else if(operator == '^')
        return power(a, b);
    else
        return root(a, 2);
}
function evaluate() {
    console.log('Operation: ' + currentOperation);
    let operatorIndex = getOperatorIndex(currentOperation);
    let num1 = currentOperation.substring(0, operatorIndex);
    let operator = currentOperation.substring(operatorIndex, operatorIndex+1);
    let num2 = currentOperation.substring(operatorIndex+1);
    result = operate(num1, num2, operator);
    mostRecentResult = result;
    console.log('Result: ' + result);
    if(result <= 9.999999 * Math.pow(10, 10)) {
        let resultString = '' + result;
        currentOperation = resultString;

        if(resultString.length >= 10) {
            result = roundNumber(result, 7);
        }

        numberDisplay.textContent = result;
        upperDisplay.textContent = result;
        currentNum = '';
    }
    else {
        upperDisplay.textContent = '';
        numberDisplay.textContent = 'ERROR';
        currentNum = '';
    }
}

function notOperation(character) {
    return character !== '+' && character !== '−' &&
           character !== '×' && character !== '÷' &&
           character !== '^' && character !== '√';
}

function getOperatorIndex(operationString) {
    let i = 0;
   
    //lands on the first character with an operation
    while(notOperation(operationString.charAt(i))) {
        i++;
        if(i >= operationString.length)
            break;
    }

    return i;
}

function includesOperation(operationString) {
    return operationString.includes('+') || operationString.includes('-') ||
           operationString.includes('×') || operationString.includes('÷') ||
           operationString.includes('^') || operationString.includes('√');
}

function roundNumber(number, decimalPlaces) {
    number = number * Math.pow(10, decimalPlaces);
    number = Math.round(number);
    return number / Math.pow(10, decimalPlaces);
}

function isNegative(number) {
    return number.includes('-');
}