const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const pointButton = document.querySelector('[data-point]');
const screen = document.querySelector('[data-screen]');
const temp = document.querySelector('[data-temp]');
const buttons = document.querySelector('.buttons-grid');

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;

/******************************* EVENT LISTENERS *******************************/
numberButtons.forEach((button) =>
	button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
	button.addEventListener('click', () => setOperation(button.textContent))
);

equalsButton.addEventListener('click', evaluate);

clearButton.addEventListener(
	'click',
	() => (
		(screen.style.fontSize = '1.5rem'),
		(currentOperator = null),
		(screen.textContent = 0),
		(temp.textContent = ''),
		(firstNumber = ''),
		(secondNumber = '')
	)
);

pointButton.addEventListener('click', appendPoint);

deleteButton.addEventListener('click', deletePrev);

/******************************* FUNCTIONS *******************************/
function deletePrev() {
	if (screen.textContent == '0') {
		return;
	} else if (screen.textContent.length == 1 || isNaN(screen.textContent)) {
		screen.style.fontSize = '1.5rem';
		screen.textContent = 0;
	} else {
		screen.textContent = screen.textContent.substring(
			0,
			screen.textContent.length - 1
		);
	}
}

function evaluate() {
	if (currentOperator === null) return;
	screen.style.fontSize = '2.5rem';
	secondNumber = screen.textContent;
	let result = roundResult(operate(currentOperator, firstNumber, secondNumber));
	if (result.toString().length > 12) {
		screen.textContent = result.toExponential(7);
	} else {
		screen.textContent = result;
	}
	currentOperator = null;
	temp.textContent = '';
}

function roundResult(number) {
	return Math.round(number * 1000) / 1000;
}

function setOperation(operator) {
	if (currentOperator !== null) {
		evaluate();
	}
	firstNumber = screen.textContent;
	currentOperator = operator;
	temp.textContent += `${firstNumber} ${currentOperator} `;
	resetScreen();
}

function appendPoint() {
	if (screen.textContent.includes('.') && screen.style.fontSize !== '2.5rem') {
		return;
	} else if (screen.style.fontSize == '2.5rem') {
		resetScreen();
	}
	screen.textContent += '.';
}

function appendNumber(number) {
	if (screen.textContent == 0 && !screen.textContent.includes('.'))
		resetScreen();
	if (screen.style.fontSize == '2.5rem') resetScreen();

	screen.textContent += number;
}

function resetScreen() {
	screen.textContent = '';
	screen.style.fontSize = '1.5rem';
}

const add = function (a, b) {
	return a + b;
};

const subtract = function (a, b) {
	return a - b;
};

const multiply = function (a, b) {
	return a * b;
};

const divide = function (a, b) {
	return a / b;
};

const operate = function (operator, a, b) {
	a = Number(a);
	b = Number(b);
	switch (operator) {
		case '+':
			return add(a, b);
		case '−':
			return subtract(a, b);
		case '÷':
			if (b === 0) {
				screen.textContent = "Can't divide by 0";
				return;
			} else return divide(a, b);
		case '×':
			return multiply(a, b);
	}
};
