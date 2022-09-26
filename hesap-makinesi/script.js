
const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");



let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;



updateDisplay();

function updateDisplay() {
    display.value = displayValue;         //ekrana yazdırma işlemi
}




keys.addEventListener("click", function(e) {
    const element = e.target;
 
    if(!element.matches("button")) return;      // elementlerden buton sadece olanları döndürür.
        

    if(element.classList.contains("operator")) {
        inputOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains("decimal")) {
       inputDecimal();
       updateDisplay();
        return;
    }

    if(element.classList.contains("clear")) {
        inputClear();
        updateDisplay();
        return;
    }

            
    inputNumber(element.value);
    updateDisplay();
})



const inputNumber = (evalue) => {   // rakamları yazdırma
    if(waitingForSecondValue)  {
        displayValue = evalue;
        waitingForSecondValue = false;
    }
    else {
        displayValue = displayValue === "0"? evalue: displayValue += evalue; 
    }
}

function inputDecimal() {
    if(!displayValue.includes('.')) {
        displayValue += '.';        // nokta içeriyorsa başka koyma
        return;
    }
}


function inputClear() {
    displayValue = "0";
}



function inputOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(firstValue === null) {
        firstValue = value;     // bundan sonraki value değerleri ikinci,üçüncü diye gidiyor..
    }
    else if(operator) {
        const result = calculate(firstValue,value,operator);

        displayValue = String(result);
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}


function calculate(first,second,operator) {
    if(operator === '+') {
        return first+second;
    }
    else if(operator === '-') {
        return first-second;
    }
    else if(operator === 'x') {
        return first*second;
    }
    else if(operator === '/') {
        return first/second;
    }
    else {
        return second;
    }

}