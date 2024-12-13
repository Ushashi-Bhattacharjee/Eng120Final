let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctStreak = 0; 

const inspiringMessages = [
    "You're on fire! Keep it up! 🔥",
    "Amazing streak! You're unstoppable! 💪",
    "Great job! Keep the streak alive! 🎉",
];


fetch('/get_questions')
    .then(response => response.json())
    .then(data => {
        questions = data; 
        if (questions.length === 0) {
            document.getElementById('quiz-container').innerHTML = `
                <h2>No questions available. Please check your data source.</h2>
            `;
            return;
        }
        renderQuestion(); 
    });

function renderQuestion() {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById('quiz-container').innerHTML = `
            <h2>Quiz completed! Your score: ${score}/${questions.length}</h2>
        `;
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; 

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-button');
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });

    document.getElementById('hint').innerText = ''; 
    document.getElementById('message').innerText = ''; 
}

function checkAnswer(selected) {
    const question = questions[currentQuestionIndex];
    if (selected === question.answer) {
        score++;
        correctStreak++; 
        document.getElementById('message').innerText = "Correct! 🎉";

        if (correctStreak === 3) {
            const inspiringMessage =
                inspiringMessages[Math.floor(Math.random() * inspiringMessages.length)];
            document.getElementById('inspiring-message').innerText = inspiringMessage;
            setTimeout(() => {
                document.getElementById('inspiring-message').innerText = '';
            }, 3000); 
            correctStreak = 0; 
        }
    } else {
        correctStreak = 0;
        document.getElementById('message').innerText = "Wrong! Try again.";
    }

    currentQuestionIndex++;
    setTimeout(renderQuestion, 1000);
}

document.getElementById('hint-button').onclick = () => {
    const question = questions[currentQuestionIndex];
    document.getElementById('hint').innerText = `Hint: ${question.hint}`;
};
