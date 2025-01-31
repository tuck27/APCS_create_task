const questions = [
    {
        question: "What type of work environment do you prefer?",
        choices: ["Office with a computer", "Classroom", "Art studio", "Science Lab"],
        scores: [1, 1, 1, 1]            //scores for Engineer, Teacher, Artist, and Scientist
    },
    {
        question: "What do you enjoy doing the most?",
        choices: ["Coding", "Helping Others", "Drawing", "Solving Problems"],
        scores: [1, 1, 1, 1]            //scores for Engineer, Teacher, Artist, and Scientist
    },
    {
        question: "How do you like to solve problems?",
        choices: ["By creating algorithms", "By explaining concepts to others", "By thinking outside the box", "By conducting experiments"],
        scores: [1, 1, 1, 1]            //scores for Engineer, Teacher, Artist, and Scientist
    },
    {
        question: "What motivates you the most?",
        choices: ["Building innovative technology", "Helping others learn", "Expressing creativity", "Discovering new knowledge"],
        scores: [1, 1, 1, 1]            //scores for Engineer, Teacher, Artist, and Scientist
    },
    {
        question: "How do you spend your free time?",
        choices: ["Exploring new apps", "Volunteering or tutoring", "Drawing or crafting", "Conducting small experiments"],
        scores: [1, 1, 1, 1]            //scores for Engineer, Teacher, Artist, and Scientist
    },
    {
        question: "Which tool would you prefer to use for work?",
        choices: ["A laptop with coding software", "A whiteboard and marker", "Paintbrushes and a canvas", "A microscope and lab equipment"],
        scores: [1, 1, 1, 1]            //scores for Engineer, Teacher, Artist, and Scientist
    },
    {
        question: "What kind of projects excite you the most?",
        choices: ["Developing apps or games", "Organizing educational events", "Creating art for exhibitions", "Conducting research experiments"],
        scores: [1, 1, 1, 1]            //scores for Engineer, Teacher, Artist, and Scientist
    }
];

//Career options
const careers = ["Software Engineer", "Teacher", "Artist", "Scientist"]

//variables to track question and scores
let currentQuestionIndex = 0;
let careerScores = [0, 0, 0, 0];

// DOM elements
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question");
const optionsContainer = document.querySelector(".options");
const resultBox = document.getElementById("result-box");
const resultText = document.getElementById("result");
const restartButton = document.getElementById("restart");

//input container that displays name of user
function displayWelcome() {
    //get name from input field
        let name = document.getElementById("nameInput").value;
        //displays welcome message 
            document.getElementById("output").textContent = "Welcome, " + name + "!";
        //hides input container and submit button after welcome message is displayed
            document.getElementById("nameInput").style.display = "none";
            document.getElementById("submitButton").style.display = "none";
};


//Loads first question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";       //Clears previous options
    //Adds answer choices as buttons
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("option");
        button.addEventListener("click", () => handleAnswer(index));
        optionsContainer.appendChild(button);
    });
}

//Handles answer selection
function handleAnswer(selectedIndex) {
    //Updates career scores based on the selected answer
    const currentScores = questions[currentQuestionIndex].scores;
    for (let i = 0; i < careerScores.length; i++) {
        careerScores[i] += currentScores[i] * (i === selectedIndex ? 1 : 0);
    }
    //Moves to the next question or show results
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

//Displays the final result
function showResult() {
    questionBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    //Find the career with the highest score
    const maxScoreIndex = careerScores.indexOf(Math.max(...careerScores));
    resultText.textContent = `🎉 Congratulations! Your Ideal Career is: ${careers[maxScoreIndex]}🎉`;
    launchConfetti();
}

//Confetti launch function
function launchConfetti() {
    const duration = 3 * 1000; //3 seconds of confetti
    const animationEnd = Date.now() + duration;
    const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if(timeLeft <= 0) {
            clearInterval(confettiInterval);
            return;
        }
        confetti ({
            particleCount: 50,
            spread: 360,
            startVelocity: 30,
            origin: {x: Math.random(), y: Math.random() - 0.2}, //random positions for confetti
        });
    }, 300);
}


//Restarts the quiz
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    careerScores = [0, 0, 0, 0]
    resultBox.classList.add("hidden");
    questionBox.classList.remove("hidden");
    loadQuestion();
});

//Initializes quiz
loadQuestion();
