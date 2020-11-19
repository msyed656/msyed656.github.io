const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-button")

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener("click" , startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    console.log("Started")
    startButton.classList.add('hide')
    shuffleQuestions = question.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}


function setNextQuestion() {   

    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
    
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add("button")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })


}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }


}


function selectAnswer(event) {
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add("incorrect")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove('incorrect')
}

const question = [
    {
        question: "What is the capital of California?",
        answers: [
            {text:"Sacramento", correct:true},
            {text:"Boston", correct:false},
            {text:"Albany", correct:false},
            {text:"Phoenix", correct:false}

        ]

    },

    {

        question: "What is 4 + 10?",
        answers: [
            {text:"10", correct:false},
            {text:"410", correct:false},
            {text:"104", correct:false},
            {text:"14", correct:true}

        ]

    },

    {

        question: "What is 2 - 2?",
        answers: [
            {text:"0", correct:true},
            {text:"-2", correct:false},
            {text:"-4", correct:false},
            {text:"4", correct:false}

        ]

    }

]

