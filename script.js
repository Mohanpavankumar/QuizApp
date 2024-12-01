const questions = [
    {
        question: "Python is known as:",
        answers: [
            {text: "A compiled language", correct: false},
            {text: "An interpreted language", correct: true},
            {text: "A machine language", correct: false},
            {text: "An assembly language", correct: false},
        ]
    },
    {
        question: "Which of the following is a valid Python comment?",
        answers: [
            {text: "% * * %", correct: false},
            {text: "/* */", correct: false},
            {text: "#", correct: true},
            {text: "//", correct: false},
        ]
    },
    {
        question: "Which of these data types does Python not natively support?",
        answers: [
            {text: "Lists", correct: false},
            {text: "Arrays", correct: true},
            {text: "Tuples", correct: false},
            {text: "Dictionaries", correct: false},
        ]
    },
    {
        question: "Which of the following is a mutable data type in Python?",
        answers: [
            {text: "String", correct: false},
            {text: "Tuple", correct: false},
            {text: "List", correct: true},
            {text: "Integer", correct: false},
        ]
    },
    {
        question: "What data type would you use to store a whole number in Python?",
        answers: [
            {text: "int", correct: true},
            {text: "float", correct: false},
            {text: "bool", correct: false},
            {text: "str", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currectQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currectQuestionIndex = 0;
    score = 0;

    // Reset the question element and display it
    questionElement.style.display = "block";

    // Remove any existing score container from the app
    const scoreContainer = document.querySelector('.score-container');
    if (scoreContainer) {
        scoreContainer.remove();
    }

    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currectQuestion = questions[currectQuestionIndex];
    let questionNo = currectQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currectQuestion.question;

    currectQuestion.answers.forEach(answer => {
        // creating button element and adding text to it
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnwser);
    });     
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnwser(e){
    // Get the button that triggered the event
    const selectedBtn = e.target;
    // Check if the selected answer is correct by comparing its data attribute
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        // Add the "correct" class to the button if the answer is correct
        selectedBtn.classList.add("correct");
        score++;
    }else{
        // Add the "incorrect" class to the button if the answer is wrong
        selectedBtn.classList.add("incorrect")
    }
    // Disable all buttons and highlight the correct answer
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        // Disable the button to prevent further clicks
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState(); // Clears the answer buttons and hides the Next button

    // Hide the question element
    questionElement.style.display = "none";

    const totalQuestions = questions.length;
    const scorePercentage = (score / totalQuestions) * 100;
    let emoji = '';
    let message = '';

    // Determine emoji and message based on performance
    if (scorePercentage === 100) {
        emoji = '🏆🎯';
        message = 'Perfect! You nailed it!';
    } else if (scorePercentage >= 80) {
        emoji = '🎉😊';
        message = 'Great job! Keep it up!';
    } else if (scorePercentage >= 50) {
        emoji = '🙂👏';
        message = 'Good effort! Try to improve!';
    } else {
        emoji = '😞💔';
        message = 'Don’t give up! You can do it!';
    }

    // Create the score container dynamically
    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'score-container';

    // Add content to the score container
    scoreContainer.innerHTML = `
        <h2>Your Score</h2>
        <p>You scored <strong>${score}</strong> out of <strong>${totalQuestions}</strong></p>
        <p>${message}</p>
        <div class="emoji">${emoji}</div>
    `;

    // Append the score container to the main app
    const app = document.querySelector('.app');
    app.appendChild(scoreContainer);

    // Style and show the restart button
    nextButton.innerHTML = 'Restart Quiz';
    nextButton.style.display = 'block';
    nextButton.style.marginTop = '20px';

    // Append the restart button separately after the score container
    app.appendChild(nextButton);
}

// Handleing of next button based on no.of questions
function handleNextButton(){
    currectQuestionIndex++;
    if(currectQuestionIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currectQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
}) 

startQuiz();