// Game Settings
let numberOfTries = 5;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
// const words = ['jameel', 'suhail', 'fatima', 'yassin', 'samira', 'hassan', 'salman', 'karima','fahima', 'hafiza','bashir','sultan','khaled', 'rashed','zohair','samiya', 'zainab','fawzia', 'munira', 'tawfiq', 'raghad', 'marwan', 'dalila', 'farida', 'muneer', 'ruqaya', 'nouran', 'tamara','ghadir', 'yasmin', 'waleed', 'zahira'];
const words = [, "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let checkGuessButton = document.querySelector('.check');

// Manage Hints
const getHintButton = document.querySelector('.hint');
document.querySelector('.hint span').innerHTML = `${numberOfHints}`;


function generateInput() { 
  const inputContainer = document.querySelector('.inputs');

  // Create Main Try Divs
  for (let i = 1; i <= numberOfTries; i++) { 
    const tryDiv = document.createElement('div');
    tryDiv.className = `try-${i}`;
    tryDiv.innerHTML = `<label>Try ${i}</label>`;
    if(i !== 1) tryDiv.classList.add('disabled-inputs');
    // Create Inputs In Try Div
    for (let j = 1; j <= numberOfLetters; j++) { 
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.id = `guess-${i}-letter-${j}`;
      tryDiv.appendChild(input);
    }
    // Add Try Div to Inputs Container
    inputContainer.appendChild(tryDiv);
  }
  // Focus on First Input Field In The First Try
  inputContainer.children[0].children[1].focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(`.disabled-inputs input`)
  inputsInDisabledDiv.forEach((input) => input.disabled = true);

  const inputs = document.querySelectorAll(`input`);
  inputs.forEach((input, index) => {
    const nextInput = inputs[index + 1];
    const previousInput = inputs[index - 1];
    // Convert Input To Uppercase
    input.addEventListener('input', function() {
      this.value = this.value.toUpperCase(); 
      if(nextInput && nextInput.value === '') nextInput.focus();
    });
    // Move between inputs
    input.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' && nextInput) {
        if (nextInput.disabled === true) {
          nextInput.nextElementSibling.focus();
          if (nextInput.nextElementSibling.disabled === true) {
            nextInput.nextElementSibling.nextElementSibling.focus();
          }
        } else {
          nextInput.focus();
        }
      }
      if (e.key === 'ArrowLeft' && previousInput) {
        if (previousInput.disabled === true) {
          previousInput.previousElementSibling.focus();
          if (previousInput.previousElementSibling.disabled === true) {
            previousInput.previousElementSibling.previousElementSibling.focus();
          }
        } else {
          previousInput .focus();
        }
      }
      if (e.key === 'Backspace') {
        this.value = '';
        if(previousInput) setTimeout(() => previousInput.focus(), 0)
      }
    })
  });
}


// Check If Guess Is Correct
checkGuessButton.addEventListener('click', function () { 
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++){
    const inputFeild = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const letter = inputFeild.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];
    if (letter === actualLetter) {
      inputFeild.classList.add('yes-in-place');
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputFeild.classList.add('not-in-place');
      successGuess = false;
    } else {
      inputFeild.classList.add('is-wrong');
      successGuess = false;
    }
  }
  
  // Create result message
  let messageArea = document.querySelector(".message");
  if (successGuess) {
    messageArea.innerHTML = `You Win &#129395; The Word Is: <span>"${wordToGuess}"</span>`;
    
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    
    checkGuessButton.disabled = true;
    getHintButton.disabled = true;
  } else { 
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => input.disabled = true);
    
    currentTry++;
    
    const nextTry = document.querySelector(`.try-${currentTry}`);
    if (nextTry) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
      const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
      nextTryInputs.forEach((input) => input.disabled = false);
      nextTry.children[1].focus();
    } else { 
      checkGuessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose &#128578; The Word Was <span>${wordToGuess}</span>`;
    }
  }
});

getHintButton.addEventListener("click", () => { 
  
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
  
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
      randomInput.style.backgroundColor = '#2ade2a';
      randomInput.disabled = true;
    }
    if (numberOfHints > 0) {
      numberOfHints--;
      document.querySelector(".hint span").innerHTML = numberOfHints;
    } 
    if (numberOfHints === 0) getHintButton.disabled = true;
  }
});

// Generate Input Fields and Start The Game  (On Page Load)
window.onload = function () { 
  generateInput();
}

// The Answer
console.log(wordToGuess);