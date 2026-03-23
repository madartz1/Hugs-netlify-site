const amountInput = document.getElementById("amount");
const entryDisplay = document.getElementById("entryCount");
const hiddenEntries = document.getElementById("calculatedEntries");

function calculateEntries(){

let amount = parseFloat(amountInput.value);

let entries = 1;

if(amount >= 100){

entries = 15;

}

else if(amount >= 50){

entries = 7;

}

else if(amount >= 25){

entries = 3;

}

else{

entries = 1;

}

entryDisplay.textContent = entries;

hiddenEntries.value = entries;

}

amountInput.addEventListener("input",calculateEntries);

calculateEntries();
