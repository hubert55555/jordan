const questions = {
    easy: [
        {
            question: `What is 2 + 2?`,
            answer: `4`,
            fakeAnswer1: `5`,
            fakeAnswer2: `6`,
            fakeAnswer3: `3`
        },
        {
            question: `What is the color of the sky?`,
            answer: `Blue`,
            fakeAnswer1: `Red`,
            fakeAnswer2: `Green`,
            fakeAnswer3: `Yellow`
        }
    ],
    medium: [
        {
            question: `What is the capital of France?`,
            answer: `Paris`,
            fakeAnswer1: `London`,
            fakeAnswer2: `Berlin`,
            fakeAnswer3: `Madrid`
        },
        {
            question: `Name a prime number between 10 and 20.`,
            answer: `11`,
            fakeAnswer1: `12`,
            fakeAnswer2: `15`,
            fakeAnswer3: `18`
        }
    ],
    hard: [
        {
            question: `Explain the theory of relativity.`,
            answer: `The theory of relativity explains how space and time are linked for objects moving at a constant speed in a straight line.`,
            fakeAnswer1: `It explains how gravity works on a microscopic scale.`,
            fakeAnswer2: `It deals with the speed of light and the concepts of quantum mechanics.`,
            fakeAnswer3: `It is a theory of how planets orbit stars and moons orbit planets.`
        },
        {
            question: `What is the meaning of life?`,
            answer: `42`,
            fakeAnswer1: `Love`,
            fakeAnswer2: `Happiness`,
            fakeAnswer3: `Knowledge`
        }
    ]
};

let score = 0; // Zmienna do śledzenia wyniku

// Elementy z DOM
const drawButton = document.querySelector('#drawButton');
const boxDifficulty = document.querySelector('#difficulty');
const boxQuestion = document.querySelector('#question');
const boxAnswer = document.querySelector('#answer');
const scoreDisplay = document.querySelector('#score');  // Wyświetlanie wyniku

// Funkcja losująca trudność pytania
function randomDifficulty() {
    const difficulties = Object.keys(questions); // Pobierz dostępne poziomy trudności
    const randomIndex = Math.floor(Math.random() * difficulties.length); // Wylosuj indeks
    return difficulties[randomIndex]; // Zwróć wylosowaną trudność
}

// Funkcja losująca pytanie na bazie trudności
function randomQuestion(difficulty) {
    const randomIndex = Math.floor(Math.random() * questions[difficulty].length); // Wylosuj indeks pytania
    return questions[difficulty][randomIndex]; // Zwróć wylosowane pytanie
}

function renderAnswers(selectedQuestion) {
    // Połącz poprawną odpowiedź z fałszywymi odpowiedziami
    const answers = [selectedQuestion.answer, selectedQuestion.fakeAnswer1, selectedQuestion.fakeAnswer2, selectedQuestion.fakeAnswer3];
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);  // Losowe przetasowanie odpowiedzi

    // Wyczyść poprzednie odpowiedzi
    boxAnswer.innerHTML = '';

    // Renderowanie odpowiedzi jako przyciski
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button'); // Utwórz przycisk dla każdej odpowiedzi
        button.textContent = answer; // Ustaw tekst przycisku
        button.onclick = () => checkAnswer(answer, selectedQuestion.answer); // Dodaj zdarzenie kliknięcia
        boxAnswer.appendChild(button); // Dodaj przycisk do kontenera odpowiedzi
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        score += 1; // Dodaj punkt za poprawną odpowiedź
    }
    // Aktualizacja wyświetlania wyniku
    scoreDisplay.textContent = `${score}`;
    drawButton.click(); // Kliknij przycisk losowania pytania
}

// Dodaj zdarzenie kliknięcia do przycisku losowania pytania
drawButton.addEventListener('click', () => {
    const difficulty = randomDifficulty(); // Wylosuj trudność
    const selectedQuestion = randomQuestion(difficulty); // Wylosuj pytanie

    boxDifficulty.textContent = difficulty; // Wyświetl wylosowaną trudność
    boxQuestion.textContent = selectedQuestion.question; // Wyświetl wylosowane pytanie
    renderAnswers(selectedQuestion); // Renderowanie odpowiedzi jako przyciski
});
