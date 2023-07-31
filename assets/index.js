const questions = [
  {
    title: "Can can we store in an Array",
    choices: ["Array", "Strings", "Objects", "All of the above"],
    answer: "All of the above",
  },
  {
    title: "Which is the incorrect way to declare a variable?",
    choices: ["let", "def", "var", "const"],
    answer: "def",
  },
  {
    title: "Arrays in JavaScript can be used to store ________.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within _______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "commas",
  },
  {
    title:
      "A very useful took used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

let score = 0
let currentQuestion = -1;
let timeLeft = 0;
let timer;
let timeLeftElement = document.getElementById('timeLeft');
let quizBodyElement = document.getElementById('quizBody')
let startButtonEl = document.getElementById("startButton");
let highscoreButtonEl = document.getElementById('highScoreButton');

function start() {
    timeLeft = 60;
    timeLeftElement.innerHTML = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
};

function endGame() {
    clearInterval(timer);

    let quizContent = 
    `<h2>Game over!</h2>
    <h3>You got a ` + score + ` /50!</h3>
    <h3>That means you got ` + score / 10 + ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    quizBodyElement.innerHTML = quizContent
};

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
};

function getScore() {
    let quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    `
    quizBodyElement.innerHTML = quizContent;
};

function clearScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", "");
    resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    timeLeftElement.innerHTML = timeLeft;

    let quizContent = `
    <h1> Coding Quiz </h1>
    <h3> Attention! Your time will be reduced by 5 seconds for every inccorect answer </h3>
    <button onclick="start()"> Start </>
    `;

    quizBodyElement.innerHTML = quizContent;
}

function wrongAnswer() {
    timeLeft -= 5;
    next();
}

function correctAnswer() {
    score += 10;
    next();
}

function next() {
    currentQuestion++;

    if (currentQuestion > questions.length -1) {
        endGame();
        return;
    }

    let quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"
    
    for(let i = 0; i < questions[currentQuestion].choices.length; i++) {
        let buttonEl = "<button onclick=\"[Answer]\"> [Choice]</button>";
        buttonEl = buttonEl.replace("[Choice]", questions[currentQuestion].choices[i]);

        if (questions[currentQuestion].choices[i] === questions[currentQuestion].answer) {
            buttonEl = buttonEl.replace("[Answer]", "correctAnswer()");
        } else {
            buttonEl = buttonEl.replace("[Answer]", "wrongAnswer()");
        }
        quizContent += buttonEl
    }

    quizBodyElement.innerHTML = quizContent;
};

startButtonEl.addEventListener("click", start);
highscoreButtonEl.addEventListener("click", getScore)


