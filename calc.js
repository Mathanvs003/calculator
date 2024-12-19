
const $screen = document.querySelector(".screen");
const $num = document.querySelectorAll((".btn.num"));
const $operator = document.querySelectorAll(".syml");
const $dot = document.querySelector(".dot");
const $equal = document.querySelector(".eql");
const $del = document.querySelector(".del");
const $plusMinus = document.querySelector(".plusneg");
const $percent = document.querySelector(".percentage");

$screen.value = "0";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, num1, num2) => {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2); 
    } else {
        return divide(num1, num2);
    }
}

const addNum = (num) => {
    num.addEventListener("click", () => {
        if($screen.value === "0") {
            $screen.value = num.textContent;
        } else {
            $screen.value += num.textContent;
        }
    });
}

const addOperator = (operator) => {
    operator.addEventListener("click", () => {
        if($screen.value === "0" && operator.textContent !== "-") {
            $screen.value = "0";
        } else if($screen.value === "0" && operator.textContent === "-") {
            $screen.value = operator.textContent;
        } else if($screen.value[$screen.value.length-1] === "+" || $screen.value[$screen.value.length-1] === "-" || $screen.value[$screen.value.length-1] === "*" || $screen.value[$screen.value.length-1] === "/") {
            $screen.value = $screen.value.replace($screen.value[$screen.value.length-1], operator.textContent);             
        } else {
            $screen.value += operator.textContent;
        }
    })
}

const changeSign = () => {
    if($screen.value === "0") {
        $screen.value = "0";
    } else if (($screen.value.includes("+") || $screen.value.includes("-") && $screen.value.indexOf("-", 1) !== -1)) {
        $screen.value = $screen.value

    } else if($screen.value[0] === "-") {
        $screen.value = $screen.value.replace($screen.value[0], "")
    } else {
        $screen.value = "-" + $screen.value;
    }
}

const addDot = () => {
    if($screen.value === "0") {
        $screen.value = "0."
    } else if ($screen.value[$screen.value.length-1] === "+" || $screen.value[$screen.value.length-1] === "-" || $screen.value[$screen.value.length-1] === "*" || $screen.value[$screen.value.length-1] === "/") {
        $screen.value += "0."; 
    } else if($screen.value[$screen.value.length-1] === "." || $screen.value.lastIndexOf(".") > $screen.value.lastIndexOf("+") && $screen.value.lastIndexOf(".") > $screen.value.lastIndexOf("-") && $screen.value.lastIndexOf(".") > $screen.value.lastIndexOf("*") && $screen.value.lastIndexOf(".") > $screen.value.lastIndexOf("/")) {
        $screen.value = $screen.value;
    } else {
        $screen.value += ".";
    }    
}

const percent = () => {
    if($screen.value.indexOf("+") !== -1 || $screen.value.indexOf("-", 1) !== -1 || $screen.value.indexOf("*") !== -1 || $screen.value.indexOf("/") !== -1) {
        $screen.value = $screen.value;
    } else {
        $screen.value = $screen.value / 100;
    }
}

const eval = () => {
    let str = $screen.value;
    console.log("str",str)
    console.log(typeof str);
    console.log(str[str.length-1]);
    
    for(let i = str.length - 1; i > 0; i--) {
        if(isNaN(str[i]) && str[i] !== ".") {
          console.log(str.slice(0,i));
          str = str.slice(0,i) + " " + str[i] + " " + str.slice(i+1);
           console.log("strrr",str);            
        }
    }
    console.log(str.split(" "));
    
    const array = str.split(" "); 
    while(array.indexOf("/") !== -1) {
        let num1 = Number(array[array.indexOf("/")-1]);
        console.log(num1);
        
        let num2 = Number(array[array.indexOf("/")+1]);
        array.splice(array.indexOf("/")-1, 3, divide(num1, num2));
    }
    while(array.indexOf("*") !== -1) {
        let num1 = Number(array[array.indexOf("*")-1]);
        let num2 = Number(array[array.indexOf("*")+1]);
        array.splice(array.indexOf("*")-1, 3, multiply(num1, num2));
    }
    while(array.indexOf("+") !== -1) {
        let num1 = Number(array[array.indexOf("+")-1]);
        let num2 = Number(array[array.indexOf("+")+1]);
        array.splice(array.indexOf("+")-1, 3, add(num1, num2));
    }
    while(array.indexOf("-") !== -1) {
        let num1 = Number(array[array.indexOf("-")-1]);
        let num2 = Number(array[array.indexOf("-")+1]);
        array.splice(array.indexOf("-")-1, 3, subtract(num1, num2));
    }    
    $screen.value = array.join(""); 
           
}



$num.forEach(addNum);
$operator.forEach(addOperator);
$del.addEventListener("click", () => $screen.value = "0");
$plusMinus.addEventListener("click", changeSign);
$dot.addEventListener("click", addDot);
$percent.addEventListener("click", percent);
$equal.addEventListener("click", eval);