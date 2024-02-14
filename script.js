const gameContainer = document.getElementById("game");
const restartButtonContainer = document.getElementById("button-container");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let canClick = true;
let selectedCards = [];
let restartButton;
let matchedPairsCount = 0;
let score = 0;

function shuffle(array) {
  let counter = array.length;

 
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {

  for (let color of colorArray) {
    
    const newDiv = document.createElement("div");
    const questionMark = document.createElement("span");
  
    newDiv.classList.add("card");
    newDiv.classList.add(color);

    questionMark.textContent = "?";
    questionMark.classList.add("question-mark");

    newDiv.appendChild(questionMark);
    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

gameContainer.addEventListener("click", handleCardClick);


function handleCardClick(event) { 
  if (!canClick) {
    return;
  }
  const clickedElement = event.target;
  const clickedCard = clickedElement.closest(".card");

  if (clickedCard && !selectedCards.includes(clickedCard)) {
    const originalColor = clickedCard.classList[1];

    console.log("Clicked Card Color:", originalColor);

    clickedCard.style.backgroundColor = originalColor;
    clickedCard.querySelector(".question-mark").style.display = "none";

    selectedCards.push(clickedCard);

    if(selectedCards.length === 2) {
        canClick = false;

        const firstMatch = selectedCards[0].classList[1] === selectedCards[1].classList[1];

        if (firstMatch ) {
          setTimeout(() => {
            canClick = true;
            selectedCards = [];
            matchedPairsCount++;
            checkGameWon();
          }, 1000);
        } else {
          setTimeout(() => {
            for (const card of selectedCards) {
              card.style.backgroundColor = "";
              card.querySelector(".question-mark").style.display = "";
            }
            canClick = true;
            selectedCards = [];
            score++;
            checkGameWon();
        }, 1000);
      }
    }
  }
}

function createRestartButton() {
  restartButton = document.createElement("button");
  restartButton.textContent = `Restart Game | Score: ${score}`;
  restartButton.classList.add("button");
  restartButton.style.display = "none";
  restartButton.addEventListener("click", restartGame);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(restartButton);

  restartButtonContainer.appendChild(buttonContainer);
}

function restartGame() {
  canClick = true;
  selectedCards =[];
  score = 0;

  const allCards = document.querySelectorAll(".card");
  allCards.forEach(card => {
    card.style.backgroundColor = "";
    card.querySelector(".question-mark").style.display = "";
  });

  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);

  restartButton.style.display = "none";
}


function checkGameWon() {
  const totalPairs = COLORS.length / 2;
 
  console.log("Matched pairs:", matchedPairsCount);
  console.log("Score:", score);

    if (matchedPairsCount === totalPairs) {
      console.log("GAME WON!");
      restartButton.textContent = `Restart Game | Score: ${score}`;
     restartButton.style.display = "block";
    } else {
      console.log("Game not yet won");
      restartButton.style.display = "none";
    }
  }

createDivsForColors(shuffledColors);
createRestartButton();
checkGameWon();
