let res = 0;
let modifier = 0;
let operator = "";

let isCleared = true;
let isEqualed = false;

const display = document.querySelector("#display p");

function roundToFive(num) {
    return +(Math.round(num + "e+5")  + "e-5");
}

function formatNumber(num) {
    if (num < 1) {
        num = roundToFive(num);
    }
    if (Math.abs(num) >= 1e7 || (Math.abs(num) < 1e-3 && num !== 0)) {
        return num.toExponential(2);
    }
    return num.toString();
}

document.querySelectorAll(".number").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (operator === "") {
            if (isEqualed) {
                res = 0;
                isEqualed = false;
            }
            if (isCleared) {
                isCleared = false;
            }
            res = res * 10;
            res += Number(btn.textContent);
            display.textContent = formatNumber(res);
        } else {
            modifier = modifier * 10;
            modifier += Number(btn.textContent);
            display.textContent = formatNumber(modifier);
        }
    });
});

function eval() {
    let answer;

    if (operator === "*") {
        answer = res * modifier;
    } else if (operator === "/") {
        answer = res / modifier;
    } else if (operator === "+") {
        answer = res + modifier;
    } else {
        answer = res - modifier;
    }

    res = answer;
    operator = "";
    modifier = 0;
    isEqualed = true;
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
            if (modifier !== 0) {
                display.textContent = formatNumber(eval());
            }
        }
    });
});

document.querySelector("#clear").addEventListener("click", () => {
    display.textContent = "0";
    res = 0;
    modifier = 0;
    operator = "";
    isCleared = true;
});

document.querySelector("#percent").addEventListener("click", () => {
    if (operator === "") {
        res /= 100;
        display.textContent = res;
    } else {
        modifier /= 100;
        display.textContent = modifier;
    }
});

document.querySelector("#negative").addEventListener("click", () => {
    if (operator === "") {
        res *= -1;
        display.textContent = res;
    } else {
        modifier *= -1;
        display.textContent = modifier;
    }
});