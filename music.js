const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("ans"));
const scoreTxt=document.getElementById('score');
let currentQuestion={};
let acceptingAnswers=false;
let questionCounter=0;
let score=0;
let availableQuestions=[];


let questions = [];
//retrive questions using fetch
fetch(
  "https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });
    startGame();
  })

const POINT=1;
const MAX_Question=10;

startGame = () => {
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
};

getNewQuestion = () =>{
 /* if there are no more answers in the array or all questions are answered send to end*/
  if(availableQuestions.length ===0 || questionCounter>= MAX_Question){
      return window.location.assign("/end.html");
    }
  questionCounter++;
    /* randomly gereatesd a number between 0 and 3 and makes it a intger*/
   const questionIndex= Math.floor(Math.random() * availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;
   /* match the chocies to the question being displayed*/
    choices.forEach( choice => {
    const number= choice.dataset["number"];
    choice.innerText= currentQuestion["choice" + number];

    });
/* cylce questions splcie out used question and make answer true*/
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    console.l
};
/*get clca of the answer clicked*/
choices.forEach( choice => {
  choice.addEventListener("click", e =>{
    if(!acceptingAnswers) return;
    acceptingAnswers=false;
    const selectedChoice=e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
   
    let classToApply="false";
    if(selectedAnswer==currentQuestion.answer){
      classToApply="true";
    }
    //call addScore
    if(classToApply=="true"){
        addScore(POINT);
    }
    /*display true or false answer by adding classtoapply to correct div*/
    selectedChoice.parentElement.classList.add(classToApply);
    //add delay
    setTimeout( ()=>{
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    },1000);
    
  

  

  });
});
//fucntion adds score
addScore=num=>{
  score+= num;
  scoreTxt.innerText=score;
}

