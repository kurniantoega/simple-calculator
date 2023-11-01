const currentDisplay = document.querySelector(".current-display");
const previousDisplay = document.querySelector(".previous-display");
const numbersBtn = document.querySelectorAll(".number");
const operatorsBtn = document.querySelectorAll(".operator");
const allClearBtn = document.querySelector(".all-clear");
const backspaceBtn = document.querySelector(".backspace");
const decimalBtn = document.querySelector(".decimal");
const percentBtn = document.querySelector(".percent");
const equalsBtn = document.querySelector(".equals");

let previousValue = "";
let currentValue = "";
let operator = "";
let result = 0;

currentDisplay.textContent = "0";
previousDisplay.textContent = "";

function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(firstNumber, secondNumber, operator) {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  } else if (operator === "-") {
    return substract(firstNumber, secondNumber);
  } else if (operator === "×") {
    return multiply(firstNumber, secondNumber);
  } else {
    return divide(firstNumber, secondNumber);
  }
}

function addNumber(num) {
  if (currentValue.length < 14) {
    currentValue += num;
  } else {
    alert("Too Many Input Number!");
    currentDisplay.textContent = currentValue;
    currentValue = "";
  }
}
numbersBtn.forEach((number) => {
  number.addEventListener("click", function (event) {
    addNumber(event.target.textContent);
    currentDisplay.textContent = currentValue;
  });
});

function useOperator(op) {
  if (previousValue == 0) {
    previousValue = currentValue;
    currentValue = "";
    currentDisplay.textContent = previousValue;
  } else {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    previousValue = operate(previousValue, currentValue, operator);
    currentValue = "";
  }
  operator = op;
}
operatorsBtn.forEach((button) => {
  button.addEventListener("click", function (event) {
    useOperator(event.target.textContent);
    previousDisplay.textContent = previousValue + " " + operator;
    currentDisplay.textContent = currentValue;
  });
});

function equals() {
  if (previousValue != "" && currentValue != "") {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    result = operate(previousValue, currentValue, operator);
    previousValue = "";
    operator = "";
    currentValue = result.toString();
    previousDisplay.textContent = "";

    if (currentValue.length < 14) {
      currentDisplay.textContent = currentValue;
    } else {
      currentDisplay.textContent = currentValue.slice(0, 11) + "...";
    }
  }
}
equalsBtn.addEventListener("click", equals);

function allClear() {
  previousValue = "";
  currentValue = "";
  operator = "";
  previousDisplay.textContent = currentValue;
  currentDisplay.textContent = 0;
}
allClearBtn.addEventListener("click", allClear);

function backspace() {
  if (currentDisplay.textContent.length <= 1 || currentValue < 1) {
    currentDisplay.textContent = 0;
    currentValue = "";
  } else {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    currentValue = currentDisplay.textContent;
  }
}
backspaceBtn.addEventListener("click", backspace);

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentDisplay.textContent += ".";
  }
}
decimalBtn.addEventListener("click", addDecimal);

// input from keyboard
window.addEventListener("keydown", function (event) {
  let keyValue = event.key;

  if (keyValue > -1 && keyValue < 10) {
    addNumber(keyValue);
    currentDisplay.textContent = currentValue;
  } else if (keyValue === ".") {
    addDecimal();
  } else if (keyValue === "Enter") {
    equals();
  } else if (keyValue === "Backspace") {
    backspace();
  } else if (keyValue === "Delete") {
    allClear();
  } else if (keyValue === "+" || keyValue === "-" || keyValue === "*" || keyValue === "/") {
    if (keyValue === "*") {
      keyValue = keyValue.replace("*", "×");
    } else if (keyValue === "/") {
      keyValue = keyValue.replace("/", "÷");
    }
    useOperator(keyValue);
    previousDisplay.textContent = previousValue + " " + operator;
    currentDisplay.textContent = currentValue;
  }
  event.preventDefault();
});
