// DOM Elements
const choicesButtons = document.querySelectorAll(".choice-button");
const resultContainer = document.querySelector("#result");

// Global Variables
const possibleChoices = ["rock", "paper", "scissors"];

// Listeners
choicesButtons.forEach((btn) => {
  btn.addEventListener("click", handleChoiceButtonClick);
});

// Functions
function handleChoiceButtonClick(event) {
  try {
    const userChoice = event.target.value;
    const computerChoice = getRandomComputerChoice();

    const winner = getWinner(userChoice, computerChoice);
  } catch (error) {
    console.error(error.message);
  }
}

getWinner("rock", "paper");

/**
 *
 * @param {"rock" | "paper" | "scissors"} userChoice
 * @param {"rock" | "paper" | "scissors"} computerChoice
 * @returns {"user" | "computer" | "draw"}
 */
function getWinner(userChoice, computerChoice) {
  const checkArgumentsArePossibleChoices =
    possibleChoices.includes(userChoice) &&
    possibleChoices.includes(computerChoice);

  if (!checkArgumentsArePossibleChoices) {
    throw new TypeError("Expect valid possible choices for given arguments");
  }

  const scenarios = {
    rock: {
      wins: ["scissors"],
      defeatedBy: ["paper"],
    },
    paper: {
      wins: ["rock"],
      defeatedBy: ["scissors"],
    },
    scissors: {
      wins: ["paper"],
      defeatedBy: ["rock"],
    },
  };

  const { wins, defeatedBy } = scenarios[userChoice];

  if (wins.includes(computerChoice)) {
    return "user";
  } else if (defeatedBy.includes(computerChoice)) {
    return "computer";
  } else {
    return "draw";
  }
}

function getRandomComputerChoice() {
  try {
    const randomComputerChoice = getRandomArrayItem(possibleChoices);

    return randomComputerChoice;
  } catch (error) {
    throw new Error(error.message);
  }
}

function getRandomArrayItem(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expect an array as argument");
  }

  if (!array.length) {
    throw new Error("Expect a non-empty array as argument");
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  const randomArrayItem = array[randomIndex];

  return randomArrayItem;
}
