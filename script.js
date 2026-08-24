const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Mark Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used to style a webpage?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        correct: 1
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            "variable",
            "define",
            "let",
            "declare"
        ],
        correct: 2
    },
    {
        question: "Which method selects an element by its ID?",
        answers: [
            "getElementById()",
            "querySelectorAll()",
            "getElement()",
            "selectById()"
        ],
        correct: 0
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answers: [
            "/* */",
            "//",
            "#",
            "<!-- -->"
        ],
        correct: 1
    }
];
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const feedbackElement = document.getElementById("feedback");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answerChecked = false;

function showQuestion() {
    const current = questions[currentQuestion];
    selectedAnswer = null;
    answerChecked = false;
    questionElement.textContent = current.question;
    progressElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    scoreElement.textContent = `Score: ${score}`;
    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    nextButton.textContent = "Check answer";
    nextButton.disabled = true;
    answersElement.replaceChildren();

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer";
        button.textContent = answer;
        button.addEventListener("click", () => selectAnswer(index, button));
        answersElement.append(button);
    });
}

function selectAnswer(index, selectedButton) {
    if (answerChecked) return;
    document.querySelectorAll(".answer").forEach((button) => button.classList.remove("selected"));
    selectedButton.classList.add("selected");
    selectedAnswer = index;
    nextButton.disabled = false;
}

function checkAnswer() {
    const buttons = document.querySelectorAll(".answer");
    const correctAnswer = questions[currentQuestion].correct;
    answerChecked = true;

    buttons.forEach((button) => (button.disabled = true));
    buttons[correctAnswer].classList.add("correct");
    if (selectedAnswer === correctAnswer) {
        score += 1;
        feedbackElement.textContent = "Correct! Great work.";
        feedbackElement.classList.add("correct");
    } else {
        buttons[selectedAnswer].classList.add("wrong");
        feedbackElement.textContent = "Not quite—the highlighted answer is correct.";
        feedbackElement.classList.add("wrong");
    }
    scoreElement.textContent = `Score: ${score}`;
    nextButton.textContent = currentQuestion === questions.length - 1 ? "See results" : "Next question";
}

function showResults() {
    const percentage = Math.round((score / questions.length) * 100);
    questionElement.textContent = "Quiz complete!";
    answersElement.replaceChildren();
    feedbackElement.textContent = `You scored ${score} out of ${questions.length} (${percentage}%).`;
    feedbackElement.className = "feedback correct";
    progressElement.textContent = "Completed";
    progressBar.style.width = "100%";
    nextButton.textContent = "Try again";
    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    if (!answerChecked) {
        checkAnswer();
    } else if (currentQuestion === questions.length - 1) {
        showResults();
        currentQuestion = -1;
    } else if (currentQuestion === -1) {
        currentQuestion = 0;
        score = 0;
        showQuestion();
    } else {
        currentQuestion += 1;
        showQuestion();
    }
});

showQuestion();
