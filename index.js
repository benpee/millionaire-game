'use strict';

const questions = [
    ["If soccer is called football in England, what is American football called in England?", ["American football", "Combball", "Handball", "Touchdown"], 1, "100"], 
    ["What is the largest country in the world?", ["Russia", "Canada", "China", "United States"], 1, "200"],
    ["An organic compound is considered an alcohol if it has what functional group?", ["Hydroxyl", "Carbonyl", "Alkyl", "Aldehyde"], 2, "300"],
    ["What is the 100th digit of Pi", [9, 4, 7, 2], 1, "500"],
    ["A doctor with a PhD is a doctor of what", ["Philosophy", "Pyschology", "Phrenology", "Physical Therapy"], 0, "1000"],
    ["What year did World War I begin", [1914, 1905, 1919, 1925], 1, "2000"],
    ["What is isobutylphenylpropanoic acid more commonly known as?", ["Ibruprofen", "Morphine", "Ketamine", "Aspirin"], 3, "4000"],
    ["What state is the largest state in Nigeria?", ["Kano", "Lagos", "Ekiti", "Delta"], 0, "8000"],
    ["What is the tallest mountain in Canada", ["Mount Logan", "Mont Tremblant", "Whistler Mountain", "Blue Mountain"], 3, "16000"],
    ["Which of these is a stop codo in DNA?", ["TAA", "ACT", "ACA", "GTA"], 1, "32000"],
    ["Where is Anter Technologies located?", ["Ibadan", "Anambra", "Port Harcourt", "Ilorin"], 3, "64000"],
    ["Which of these countries is not a part of the Asian continent?", ["Suriname", "Georgia", "Russia", "Singapore"], 2, "125000"],
    ["What is the unit of currency in Laos?", ["Kip", "Ruble", "Konra", "Dollar"], 1, "250000"],
    ["Which of these animal belongs in class Chondrichthyes?", ["Great White Shark", "Octopus", "Killer Whale", "Catfish"], 1, "500000"],
    ["What is considered the rarist form of color blindness?", ["Blue", "Red", "Green", "Purple"], 3, "1000000"]
];

const friend = document.querySelector('.friend');
const fifty = document.querySelector('.fifty');
const optionList = document.querySelector('.optionList');
const options = document.querySelectorAll('.options');
const option1 = document.querySelector('.option--00');
const option2 = document.querySelector('.option--01');
const option3 = document.querySelector('.option--02');
const option4 = document.querySelector('.option--03');
const question = document.querySelector('.question');
const startAgain = document.querySelector('.startAgain');
const msg = document.querySelector('.msg');
const timer = document.querySelector('.timer');
const quiz = document.querySelector('.quiz');
const disableBtns = document.querySelector('.disableBtns');

const moneyList = document.querySelector('li');
let questionNumber = document.querySelector('.num');
let checkPoint = document.querySelectorAll('.checkPoint');

var interval = null;
let money = 0;
let moneyIndex = 0;
let time = 20;
let number = 1;
let earning = document.querySelector(`.earn${number}`);
let availableQ = questions.slice(0);
let newQuestions = questions.slice(0, questions.length);
let randomNumber = Math.trunc(Math.random() * questions[0][1].length);
let fifty50 = false;
let friendHelp = false;
let audienceVote = false;

function random(arr) {
    return Math.trunc(Math.random() * arr.length);
}

let currentMoney = document.querySelector(`.earn${moneyIndex + 1}`);
currentMoney.classList.add('active');

let randomIndex = random(questions);
random(questions);
let optionsArray = questions[randomIndex][1];
let randomOptionIndex = Math.floor(Math.random * optionsArray.length);
let randomAnswer = optionsArray[randomOptionIndex]
let correctOption, correctAnswer;
// let remainingQ = questions.slice(0, questions.length);
function questionGen() {
    let currentIndex = questions[randomIndex];
    question.textContent = currentIndex[0];
    option1.textContent = currentIndex[1][0];
    option2.textContent = currentIndex[1][1];
    option3.textContent = currentIndex[1][2];
    option4.textContent = currentIndex[1][3];
    correctAnswer = currentIndex[2];
    correctOption = currentIndex[1][correctAnswer];
    availableQ.splice(currentIndex, 1)
    restartTimer();
}

questionGen();

function choiceTimer(answer, correctAns) {
    time = 20;
    interval = setInterval(function() {
        timer.textContent = time;
        time--;
        if (answer == correctAns || time <= 0) {
            clearInterval(interval);
            }
    }, 1000)   
}

function checkPointChecker() {
    const earningList = earning.length;
    for (let i = 0; i < earningList; i++) {
        if (earning[i].classList.contains('checkPoint')) {
            msg.classList.remove('hide');
        }
    }
    return msg;
}

function next() {
    random(questions);
        randomIndex = random(questions);
    if (number === questions.length) {
        msg.textContent = "Congrat! You Are Our New Winner!!!";
    } else {
        questionGen();
    }
}

function restartTimer() {
    time = 20;
}

for (let i = 0; i< options.length; i++) {
    options[i].addEventListener('click', function () {
        let clicked = document.querySelector(`.option--0${i}`);
        let clickedText = clicked.textContent;
        choiceTimer(clickedText, correctOption);                
        if (correctOption == clickedText) {
            questionNumber.textContent = number;
            number++;
            clicked.classList.add('correct');
            setTimeout(() => {
                clicked.classList.remove('correct');
                next();
                money = questions[moneyIndex][3];
                moneyLadder();               
            }, 200);           
            console.log('correct');
            // random(questions)
            // randomIndex = random(questions);
        } else {
            clicked.classList.add('wrong');
            console.log('wrong');
            // endGame();
            setTimeout(function() {
            clicked.classList.remove('wrong');
            checkPointChecker();
            const optionLen = optionList.children.length;
            for (let i = 0; i < optionLen; i++) {
                if (optionList.children[i].textContent === correctAnswer) {
                    optionList.children[i].classList.add('correct');
                    setTimeout(() => {
                        optionList.children[i].classList.remove('correct');
                    })
                }
            }
            }, 200); 
            endGame();
        }
        // disableOptions();
    })    
}

function fiftyFifty(correctAnswer) {
    if (correctAnswer === 0) {
        option2.style.visibility = "hidden";
        option3.style.visibility = "hidden";
    } else if (correctAnswer === 1) {
        option1.style.visibility = "hidden";
        option4.style.visibility = "hidden";
    } else  if (correctAnswer === 2) {
        option1.style.visibility = "hidden";
        option4.style.visibility = "hidden";
    } else if (correctAnswer === 3) {
            option2.style.visibility = "hidden";
            option3.style.visibility = "hidden";
        }
    }
    

fifty.addEventListener('click', fiftyFifty);

function callAfriend(answer) {
    return timeLines.callAFriend + ' ' + answer;
}

function askTheAudience() {
    return "The option withe highest vote is " + correctOption;
}

function deselectEarnings() {
    moneyList.classList.remove('active');
    document.querySelector(`.earn${moneyIndex + 1}`);
}

function endGame() {
    clearInterval(interval);
    quiz.classList.add('hide');
    moneyList.classList.add('hide');
    msg.classList.remove('hide');
    msg.textContent = "Congrats! You won " + money + " Dollars.";
    
    document.querySelector(`.earn${moneyIndex + 1}`).classList.remove('active');
    setTimeout(() => {
        msg.classList.add('hide');
        quiz.classList.remove('hide');
        moneyList.classList.remove('hide');
        deselectEarnings();
        number = 1;
        money = 0
        moneyIndex = 0;
        document.querySelector(`.earn${moneyIndex + 1}`).classList.add('active');
        randomIndex = random(questions);
        questionGen();
    }, 1500)
    
}

function restartGame() {
    clearInterval(interval);
    msg.textContent = "Congrats! You won" + money;
    quiz.classList.add('hide');
    moneyList.classList.add('hide');
    document.querySelector(`.earn${moneyIndex + 1}`).classList.remove('active');
    setTimeout(() => {
        msg.classList.add('hide');
        quiz.classList.remove('hide');
        moneyList.classList.remove('hide');
        deselectEarnings();
        number = 1;
        money = 0
        moneyIndex = 0;
        document.querySelector(`.earn${moneyIndex + 1}`).classList.add('active');
        randomIndex = random(questions);
        questionGen();
    }, 1500)
}

function restart() {
    msg.classList.add('hide');
    clearInterval();
    money = 0;
    moneyIndex = 0;
    randomAnswer(questions);
    renderQuiz();
}

function moneyLadder(money) {
    document.querySelector(`.earn${moneyIndex + 1}`).classList.remove('active');
    moneyIndex++;
    document.querySelector(`.earn${moneyIndex + 1}`).classList.add('active');
}

friend.addEventListener('click', function() {
    msg.classList.remove('hide');
    msg.textContent = "Ringing! ...I think the answer should be " + correctOption;
    setTimeout(() => {
        msg.classList.add('hide');
    }, 800)
    friendHelp = true;
})

audience.addEventListener('click', askTheAudience)

function wayOut() {
    if (fifty50) {
        fifty.removeEventListener('click');
        fifty.style.pointerEvents = "none";
    } else
    if (friendHelp) {
        friendHelp.removeEventListener('click');
        friendHelp.style.pointerEvents = "none";s
    } else if (audienceHelp) {
        audienceHelp.removeEventListener('click');
        audienceHelp.style.pointerEvents = "none";
    }
}

// function playGame() {

// }

// let newArray = questions.slice(0, questions.length);
// newArray.splice(newArray[0], 1);

// let selectOption = document.querySelectorAll('.options');





// function disableOptions() {
//     const optionLen = optionList.children.length;
//     for (let i = 0; i < optionLen; i++) {
//         optionList.children[i].classList.add('disableBtns');
//     }
// }

// function enableBtns() {
//     const optionLen = optionList.children.length;
//     for (let i = 0; i < optionLen; i++) {
//         optionList.children[i].classList.remove('disableBtns');
//     }
// }

// function moneyLadder() {
    //     earning.classList.remove('active');
    //     currentMoney.classList.toggle('active');
    //     // for (let i = 0; i <= earning.length; i++) {
    //     //     earning[i].classList.remove('active');
    //     //     currentMoney.classList.add('active');
    //     // }
    //     // earning.forEach(earn => {
    //     //     earn.classList.remove('active');
    //     // })
    
    // }

    // if (optionBtn.innerHTML === questions[randomIndex][2]) {
//     money = questions[moneyIndex][3];    
//     optionBtn.classList.add('.correct');
//     moneyLadder();
//     moneyIndex++;
//     random(questionIndex);
//     renderQuiz();

// } else {
//     optionBtn.classList.add('.wrong');
// }


// const questions = [
//     ["If soccer is called football in England, what is American football called in England?", ["American football", "Combball", "Handball", "Touchdown"], 1, "100"], 
//     ["What is the largest country in the world?", ["Russia", "Canada", "China", "United States"], 1, "200"],
//     ["An organic compound is considered an alcohol if it has what functional group?", ["Hydroxyl", "Carbonyl", "Alkyl", "Aldehyde"], 2, "300"],
//     ["What is the 100th digit of Pi", [9, 4, 7, 2], 1, "500"],
//     ["A doctor with a PhD is a doctor of what", ["Philosophy", "Pyschology", "Phrenology", "Physical Therapy"], 0, "1000"],
//     ["What year did World War I begin", [1914, 1905, 1919, 1925], 1, "2000"],
//     ["What is isobutylphenylpropanoic acid more commonly known as?", ["Ibruprofen", "Morphine", "Ketamine", "Aspirin"], 3, "4000"],
//     ["What state is the largest state in Nigeria?", ["Kano", "Lagos", "Ekiti", "Delta"], 0, "8000"],
//     ["What is the tallest mountain in Canada", ["Mount Logan", "Mont Tremblant", "Whistler Mountain", "Blue Mountain"], 3, "16000"],
//     ["Which of these is a stop codo in DNA?", ["TAA", "ACT", "ACA", "GTA"], 1, "32000"],
//     ["Where is Anter Technologies located?", ["Ibadan", "Anambra", "Port Harcourt", "Ilorin"], 3, "64000"],
//     ["Which of these countries is not a part of the Asian continent?", ["Suriname", "Georgia", "Russia", "Singapore"], 2, "125000"],
//     ["What is the unit of currency in Laos?", ["Kip", "Ruble", "Konra", "Dollar"], 1, "250000"],
//     ["Which of these animal belongs in class Chondrichthyes?", ["Great White Shark", "Octopus", "Killer Whale", "Catfish"], 1, "500000"],
//     ["What is considered the rarist form of color blindness?", ["Blue", "Red", "Green", "Purple"], 3, "1000000"]
// ];

// const modal = document.querySelector('.msg');
// const question = document.querySelector('.question');
// const currentMoney = document.querySelector(`.earn${moneyIndex}`);
// const modal = document.querySelector('.msg');
// const fifty = document.querySelector('.fifty');
// const friend = document.querySelector('.friend');
// const audience = document.querySelector('.audience');
// const timer = document.querySelector('.timer');
// const quiz = document.querySelector('.quiz');
// const questionNo = document.querySelector('.num');
// const options = document.querySelectorAll('.options');
// const optionList = document.querySelector('.optionList');
// const option1 = document.querySelector('option--00');
// const option2 = document.querySelector('option--01');
// const option3 = document.querySelector('option--02');
// const option4 = document.querySelector('option--03');

// const arrayLen = questions.length;
// const questionCopy = questions.slice(0, questions.length);
// let moneyIndex = 0;
// let money = 0;
// let questionIndex = 1;
// function randomNumber() {
//     return Math.floor(Math.random() * arrayLen);
// }

// let randomIndex = randomNumber();
// let currQ = questions[randomIndex;]
// let corrIndex = currQ[2];
// let corrOption = questions[randomIndex][1][corrIndex];

// function questionGen() {
//     question.textContent = currQ[0];
//     option1.textContent = currQ[1][0];
//     option1.textContent = currQ[1][1];
//     option1.textContent = currQ[1][2];
//     option1.textContent = currQ[1][3];
// }

// function playGame() {
//     questionGen();
//     selectAnswer();
// }

// function selectAnswer() {
//     for (let i = 0; i < optionLen; i++) {
//         let activeOption = option[i];
//         activeOption.addEVentListener('click', function() {
//             checkAnswer();
//             if (activeOption.textContent === corrOption) {
//                 money = questions[moneyIndex][3];
//                 moneyIndex++;
//                 activeOption.classList.add('correct');
//                 setTimeout(() => {
//                     activeOption.classList.remove('correct');
//                     next();
//                     questionNumber.textContent = questionIndex;
//                     questionIndex++;
//                     questionGen();
//                 }, 200);
//             } else {
//                 const optionLen = optionList.children.length;
//                 for (let i = 0; i < optionLen; i++) {
//                 if (optionList.children[i].textContent === correctAnswer) {
//                     optionList.children[i].classList.add('correct');
//                 }
//                 }
//                 activeOption.classList.add('wrong');
//                 setTimeout(() => {
//                     activeOption.classList.remove('wrong')
//                 }, 200);
//             }
//         })
//     }
// }


// function checkAnswer() {

// }

// function fifty50() {
//     let optionCopy = currQ[1]
// }

// modal.addEventListener('click', );
// fifty.addEventListener('click,')
// friend.addEventListener('click', );
// audience.addEventListener('click', );