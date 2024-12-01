let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctStreak = 0; // Counter for consecutive correct answers

const inspiringMessages = [
    "You're on fire! Keep it up! 🔥",
    "Amazing streak! You're unstoppable! 💪",
    "Great job! Keep the streak alive! 🎉",
];

// Fetch all questions from the backend
fetch('/get_questions')
    .then(response => response.json())
    .then(data => {
        questions = data; // Store all questions
        if (questions.length === 0) {
            document.getElementById('quiz-container').innerHTML = `
                <h2>No questions available. Please check your data source.</h2>
            `;
            return;
        }
        renderQuestion(); // Render the first question
    });

// Render the current question
function renderQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // If all questions are answered, show the final score
        document.getElementById('quiz-container').innerHTML = `
            <h2>Quiz completed! Your score: ${score}/${questions.length}</h2>
        `;
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Clear previous options

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-button');
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });

    document.getElementById('hint').innerText = ''; // Clear previous hint
    document.getElementById('message').innerText = ''; // Clear feedback message
}

// Check the selected answer
function checkAnswer(selected) {
    const question = questions[currentQuestionIndex];
    if (selected === question.answer) {
        score++;
        correctStreak++; // Increment streak for a correct answer
        document.getElementById('message').innerText = "Correct! 🎉";

        // Show inspiring message for 3 correct answers in a row
        if (correctStreak === 3) {
            const inspiringMessage =
                inspiringMessages[Math.floor(Math.random() * inspiringMessages.length)];
            document.getElementById('inspiring-message').innerText = inspiringMessage;
            setTimeout(() => {
                document.getElementById('inspiring-message').innerText = '';
            }, 3000); // Hide the message after 3 seconds
            correctStreak = 0; // Reset streak after showing a message
        }
    } else {
        correctStreak = 0; // Reset streak on an incorrect answer
        document.getElementById('message').innerText = "Wrong! Try again.";
    }

    // Move to the next question after a delay
    currentQuestionIndex++;
    setTimeout(renderQuestion, 1000);
}

// Show hint for the current question
document.getElementById('hint-button').onclick = () => {
    const question = questions[currentQuestionIndex];
    document.getElementById('hint').innerText = `Hint: ${question.hint}`;
};
