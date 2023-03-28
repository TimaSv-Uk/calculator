class Calculator {
  constructor(previosButtonText, currentButtonText) {
    this.previosButtonText = previosButtonText;
    this.currentButtonText = currentButtonText;
    this.clear();
  }

  clear() {
    this.currentOpetand = "";
    this.previosOpetand = "";
    this.operetion = undefined;
  }
  delete() {
    this.currentOpetand = this.currentOpetand.toString().slice(0, -1);
  }

  appendNum(number) {
    if (number === "." && this.currentOpetand.includes(".")) return;
    this.currentOpetand = this.currentOpetand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOpetand === "") return;
    if (this.previosOpetand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previosOpetand = this.currentOpetand;
    this.currentOpetand = "";
  }

  compute() {
    let computation = 0;
    const prev = parseFloat(this.previosOpetand);
    const current = parseFloat(this.currentOpetand);
    if(this.operation === "+"){
      computation = prev + current;
    } else if(this.operation === "-") {
      computation = prev - current;
    } else if (this.operation === "*") {
      computation = prev * current;
    }else if(this.operation === "÷"){
      computation = prev / current;
    }
    this.currentOpetand = computation;
    this.operation = undefined;
    this.previosOpetand = "";
  }

  getDisplayNum(number) {
    const strNum = number.toString();
    const integerDigits = parseFloat(strNum.split(".")[0]);
    const decimalDgits = strNum.split(".")[1];
    let intDisplay;
    if (isNaN(integerDigits)) {
      intDisplay = "";
    } else {
      intDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDgits != null) {
      return `${intDisplay}.${decimalDgits}`;
    } else {
      return intDisplay;
    }
  }
  updateDisplay() {
    this.currentButtonText.innerText = this.getDisplayNum(this.currentOpetand);
    if (this.operation != null) {
      this.previosButtonText.innerText = `${this.getDisplayNum(this.previosOpetand)} ${this.operation}`;
    } else {
      this.previosButtonText.innerText = "";
    }
  }
}

const numButtons = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previosButtonText = document.querySelector("[data-previos]");
const currentButtonText = document.querySelector("[data-current]");

const calculator = new Calculator(previosButtonText, currentButtonText);

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
