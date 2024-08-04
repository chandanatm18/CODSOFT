document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));

    let currentInput = '0';
    let operator = '';
    let previousInput = '';
    let shouldResetCurrentInput = false;

    function updateDisplay() {
        display.innerText = currentInput;
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const btnValue = e.target.innerText;

            if (btnValue === 'C') {
                currentInput = '0';
                operator = '';
                previousInput = '';
                shouldResetCurrentInput = false;
                updateDisplay();
            } else if (btnValue === 'DEL') {
                if (currentInput.length > 1) {
                    currentInput = currentInput.slice(0, -1);
                } else {
                    currentInput = '0';
                }
                updateDisplay();
            } else if (btnValue === '=') {
                if (operator && previousInput !== '') {
                    try {
                        currentInput = eval(previousInput + operator + currentInput).toString();
                        operator = '';
                        previousInput = '';
                        shouldResetCurrentInput = true;
                    } catch {
                        currentInput = 'Error';
                    }
                    updateDisplay();
                }
            } else if (['+', '-', '*', '/'].includes(e.target.getAttribute('data-operator'))) {
                if (operator && previousInput !== '') {
                    previousInput = eval(previousInput + operator + currentInput).toString();
                    currentInput = '0';
                } else {
                    previousInput = currentInput;
                }
                operator = e.target.getAttribute('data-operator');
                shouldResetCurrentInput = true;
                updateDisplay();
            } else {
                if (currentInput === '0' || shouldResetCurrentInput) {
                    currentInput = btnValue;
                    shouldResetCurrentInput = false;
                } else {
                    currentInput += btnValue;
                }
                updateDisplay();
            }
        });
    });
});
