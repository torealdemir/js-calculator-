const numbers = document.querySelectorAll('.number');
const display = document.getElementById('displayNum');
const equalsButton = document.getElementById('eqs');
const clearButton = document.getElementById('AC');
const operators = document.querySelectorAll('.operator');
const backspace = document.getElementById('backspace');
console.log(equalsButton);


let operator;
let num = 0;
let firstNum = "";
let secondNum = "";
let value;
let firstNumTurn = true;
let secondNumTurn = false;
let previousDigit = "";

//Events



backspace.addEventListener("click", deleteone);

clearButton.addEventListener("click", clear);

equalsButton.addEventListener('click', () => {
    if(firstNum != "" && secondNum !== ""){
        result = operate(operator, firstNum, secondNum);
        if(result.toString().length > 10){
            display.textContent = result.toFixed(6);
        }
        else {
            display.textContent = result;

        }

        firstNum = result;
        firstNumTurn= false;
        secondNumTurn = true;
        secondNum = "";
    }
});

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        let digit = e.target.innerText;
        if(digit === "." && previousDigit === "."){
            alert("cant have a decimal point after another!")
        }
        else{
            if(firstNumTurn){
                if(display.textContent === "0"){
                    display.textContent = digit;
                }
                else {
                    display.textContent += digit;
                }
                value =  appendNumber(digit);
                firstNum = Number(value);
            }
            if(secondNumTurn){
                if(
                    display.textContent === "0"||
                    display.textContent === "+" ||
                    display.textContent === "-" ||
                    display.textContent === "*" ||
                    display.textContent === "/"
                ){
                    display.textContent = digit;
                
                }
                else {
                    display.textContent += digit;
                }
                value = "";
                value = appendNumber(digit);
                secondNum = Number(value);
            }
        }
        previousDigit = digit;
    });
});


operators.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (e) => {
        if(firstNum !== ""){
            let sign = e.target.id;

            switch (sign) {
                case "add":
                    sign = "+";
                    break;
                case "multiply":
                    sign = "*";
                    break;
                case "substract":
                    sign = "-";
                    break;
                case "divide":
                    sign = "/";
                    break;
                case "equals":
                    sign = "=";
                    break;
                case "percent":
                    sign = "%";
                    break;
                default:
                    break;
            }
            display.textContent = sign;
            operator = getOperator(sign);
        }
    });
});



// Functions!!
function deleteone(){
    display = display.slice(0,-1);
    console.log(display);
}



function clear(){
    display.textContent = 0;
    result = 0;
    firstNum = "";
    secondNum = "";
    firstNumTurn = true;
    secondNumTurn = false;
    num = 0;
}

function getOperator(op){
    firstNumTurn = false;
    secondNumTurn = true;
    return op;
}

let counter = 0;
function appendNumber(d) {
    counter = 0;
    if(secondNumTurn && secondNum === ""){
        num = 0;
        counter += 1;
    }
    if(num === 0){
        num = d;
    }
    else {
        console.log(d);
        num += d;
    }

    return num;
}


function operate(op, n1, n2){
    let result = 0;

    switch(op){
        case "+":
            result = addition(n1, n2);
            break;
        case "-":
            result = subtraction(n1, n2);
            break;
        case "*":
            result = multiplication(n1, n2);
            break;
        case "/":
            result = division(n1, n2);
            break;
        case "%":
            result = percent(n1, n2);
            break;
        default:
            break;
    }
    return result;
}

function addition(a, b){    
    return a + b;
}

function subtraction(a, b){
    return a-b;
}

function multiplication(a, b){
    return a * b;
}

function division(a, b){
    if(b=== 0){
        alert("cant divide by 0!");
        clear();
        current.innerText = "0";
        return;
    }
    return b / y;
}

function percent(a, b){
    return a * (b / 100);
}