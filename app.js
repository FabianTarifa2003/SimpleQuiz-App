const questions = [
  {
    topic: "tech",
    question: "What is the best language to learn?",
    possibleAnswers: ["javascript", "python", "ruby"],
    correctAnswer: "javascript",
  },
  {
    topic: "math",
    question: "What is 4 + 4?",
    possibleAnswers: ["7", "8", "9", "10"],
    correctAnswer: "8",
  }
];

const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");
const resultContainer = document.getElementById("resultContainer"); // div per rezultatet
const topicContainer = document.getElementById("topicContainer")

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let wrongAnswers = []; // Listë për të mbajtur shënim përgjigjet e gabuara

function handleQuestion(index) {
  if (index >= questions.length) {
    // Kur të përfundojë quiz-i
    showResults();
    return;
  }
  


  // Handle quiz progress section
  quizProgress.innerHTML = "";
  questions.forEach((question, i) => {
    quizProgress.innerHTML += "<span></span>";
  });
  let spans = document.querySelectorAll("span");
  for (let i = 0; i <= index; i++) {
    spans[i].classList.add("seen");
  }

  // Topic/question
  questionContainer.innerHTML = `<p>${questions[index].topic}</p>
  <p>${questions[index].question}</p>`;
  topicContainer.innerHTML = `<h1>${questions[index].topic}</h1>`;

  // Answers
  answerContainer.innerHTML = "";
  questions[index].possibleAnswers.forEach((answer) => {
    answerContainer.innerHTML += `<button>${answer}</button>`;
  });

  let answers = document.querySelectorAll("button");
  answers.forEach((answer) => {
    answer.addEventListener("click", (e) => {
      if (e.target.textContent === questions[index].correctAnswer) {
        correctAnswersCount++;
        console.log("Correct!");
      } else {
        wrongAnswers.push({
          question: questions[index].question,
          correctAnswer: questions[index].correctAnswer,
          givenAnswer: e.target.textContent
        });
        console.log("Wrong!");
      }

      currentQuestionIndex++;
      handleQuestion(currentQuestionIndex);
    });
  });
}



function showResults() {
  questionContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  quizProgress.innerHTML = "";
  topicContainer.innerHTML= "";

  // Show result
  resultContainer.innerHTML = `<p>You answered ${correctAnswersCount} out of ${questions.length} questions correctly.</p>`;
  
  if (wrongAnswers.length > 0) {
    resultContainer.innerHTML += '<h3>Wrong Answers</h3>';
    wrongAnswers.forEach(wrongAnswer => {
      resultContainer.innerHTML += `<p>Question: "${wrongAnswer.question}"<br>
      Your Answer: "${wrongAnswer.givenAnswer}"<br>
      Correct Answer: "${wrongAnswer.correctAnswer}"</p>`;
    });
  }

  resultContainer.innerHTML += '<button id="retryQuiz">Retry Quiz</button>';

  document.getElementById("retryQuiz").addEventListener("click", () => {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    wrongAnswers = []; // Pastroni përgjigjet e gabuara
    resultContainer.innerHTML = ""; // Fshih rezultatet e mëparshme

    handleQuestion(currentQuestionIndex);
  });
}

handleQuestion(currentQuestionIndex);
