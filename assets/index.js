const questions = [
    {
        title: "",
        choices: "",
        answer: "",
    },
    {
        title: "",
        choices: "",
        answer: "",
    },
    {
        title: "",
        choices: "",
        answer: "",
    },
    {
        title: "",
        choices: "",
        answer: "",
    },
    {
        title: "",
        choices: "",
        answer: "",
    },
]

let score = 0
let currentQuestoin = -1;
let timeLeft = 0;
let timer;
let timeLeftElement = document.getElementById('timeLeft');

function start() {
    timeLeft = 75;
    timeLeftElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
};