let res = "0";
let modifier = "0";
let operator = "";

let isCleared = true;
let isEqualed = false;
let resDecimal = false; 
let modDecimal = false; 

const display = document.querySelector("#display p");

function roundToFive(num) {
    return +(Math.round(num + "e+5")  + "e-5");
}

function formatNumber(num) {
    num = parseFloat(num.toFixed(5));
    if (Math.abs(num) >= 1e7 || (Math.abs(num) < 1e-3 && num !== 0)) {
        return num.toExponential(2);
    }
    return num.toString();
}

document.querySelectorAll(".number").forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;
        if (value === ".") {
            if (operator === "") {
                if (!resDecimal) {
                    resDecimal = true;
                    res += ".";
                    display.textContent = res;
                }
            } else {
                if (!modDecimal) {
                    modDecimal = true;
                    modifier += ".";
                    display.textContent = modifier;
                }
            }
        } else {
            if (operator === "") {
                if (isEqualed) {
                    res = "0";
                    isEqualed = false;
                    resDecimal = false;
                }
                if (isCleared) {
                    isCleared = false;
                    res = "0";
                    resDecimal = false;
                }
                if (resDecimal) {
                    res += value;
                } else {
                    res = res === "0" ? value : res + value;
                }
                display.textContent = formatNumber(parseFloat(res));
            } else {
                if (modDecimal) {
                    modifier += value;
                } else {
                    modifier = modifier === "0" ? value : modifier + value;
                }
                display.textContent = formatNumber(parseFloat(modifier));
            }
        }
    });
});

function eval() {
    let answer;

    if (operator === "*") {
        answer = parseFloat(res) * parseFloat(modifier);
    } else if (operator === "/") {
        answer = parseFloat(res) / parseFloat(modifier);
    } else if (operator === "+") {
        answer = parseFloat(res) + parseFloat(modifier);
    } else {
        answer = parseFloat(res) - parseFloat(modifier);
    }

    res = answer.toString();
    operator = "";
    modifier = "0";
    isEqualed = true;
    resDecimal = false;
    modDecimal = false;
    return answer;
}

document.querySelectorAll(".operator").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.textContent === "*") {
            operator = "*";
        } else if (btn.textContent === "/") {
            operator = "/";
        } else if (btn.textContent === "+") {
            operator = "+";
        } else if (btn.textContent === "-") {
            operator = "-";
        } else {
            if (modifier !== "0") {
                display.textContent = formatNumber(eval());
            }
        }
        console.log(operator);
    });
});

document.querySelector("#clear").addEventListener("click", () => {
    display.textContent = "0";
    res = "0";
    modifier = "0";
    operator = "";
    isCleared = true;
    resDecimal = false;
    modDecimal = false;
});

document.querySelector("#percent").addEventListener("click", () => {
    if (operator === "") {
        res = (parseFloat(res) / 100).toString();
        display.textContent = formatNumber(parseFloat(res));
    } else {
        modifier = (parseFloat(modifier) / 100).toString();
        display.textContent = formatNumber(parseFloat(modifier));
    }
});

document.querySelector("#negative").addEventListener("click", () => {
    if (operator === "") {
        res = (parseFloat(res) * -1).toString();
        display.textContent = formatNumber(parseFloat(res));
    } else {
        modifier = (parseFloat(modifier) * -1).toString();
        display.textContent = formatNumber(parseFloat(modifier));
    }
});