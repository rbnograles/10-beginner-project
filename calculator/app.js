const rippleBtn = document.querySelector("[btn-span-two]");

rippleBtn.addEventListener("click", () => {
  const span = rippleBtn.querySelector("span");
  span.classList.remove("ripple");
  void span.offsetWidth;
  span.classList.add("ripple");
});

// Calculator Functionality
class Calculator {
  constructor(prevDisplayData, nextDisplayData) {
    this.prevDisplayData = prevDisplayData;
    this.nextDisplayData = nextDisplayData;
    this.clearAll();
  }

  clearAll() {
    this.currentOperation = "";
    this.prevOperation = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) return;
    this.currentOperation = this.currentOperation + number;
  }

  selectOperation(operation) {
    if (this.currentOperation === "") return;
    if (this.prevOperation !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.prevOperation = this.currentOperation;
    this.currentOperation = "";
  }

  calculate() {
    let results;

    const prev = parseFloat(this.prevOperation);
    const current = parseFloat(this.currentOperation);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        results = prev + current;
        break;
      case "-":
        results = prev - current;
        break;
      case "*":
        results = prev * current;
        break;
      case "/":
        results = prev / current;
        break;
      case "%":
        results = prev % current;
        break;
      default:
        return;
    }
    this.currentOperation = results;
    this.operation = undefined;
    this.prevOperation = "";
  }

  updateScreenDisplay() {
    this.nextDisplayData.innerHTML = this.currentOperation;
    if (this.operation != "") {
      this.prevDisplayData.innerHTML = `${this.prevOperation} ${
        this.operation !== undefined ? this.operation : ""
      }`;
    } else {
      this.prevDisplayData.innerHTML = "";
    }
  }
}

const preDisplayData = document.querySelector("[prev-display]");
const nextDisplayData = document.querySelector("[next-display]");
const numbersBtn = document.querySelectorAll("[btn-numb]");
const clearAllBtn = document.querySelector("[btn-ce]");
const deleteBtn = document.querySelector("[btn-del]");
const operatorsBtn = document.querySelectorAll("[btn-operators]");
const equalsBtn = document.querySelector("[btn-equals]");
const percentBtn = document.querySelector("[btn-percent]");

const calculator = new Calculator(preDisplayData, nextDisplayData);

numbersBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerHTML);
    calculator.updateScreenDisplay();
  });
});

operatorsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.selectOperation(btn.innerHTML);
    calculator.updateScreenDisplay();
  });
});

percentBtn.addEventListener("click", () => {
  calculator.selectOperation(percentBtn.innerHTML);
  calculator.calculate();
  calculator.updateScreenDisplay();
});

equalsBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateScreenDisplay();
});

clearAllBtn.addEventListener("click", () => {
  calculator.clearAll();
  calculator.updateScreenDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateScreenDisplay();
});
