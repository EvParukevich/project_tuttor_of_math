import {questions} from './questions.js';

// find elements
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// test Variables  
let score = 0; // score right answer
let questionIndex = 0; // current question


clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;
// function declaration clear HTML 

function clearPage(){
	headerContainer.textContent = '';
	listContainer.textContent = '';
}

// function declaration show question

function showQuestion(){

// new headerTemplate

	const headerTemplate = document.createElement('h2');
	const title = questions[questionIndex]['question'];

	headerTemplate.classList.add('title');	
	headerTemplate.textContent = title;

	headerContainer.append(headerTemplate);	

	for (let [answerIndex, answerText] of questions[questionIndex]['answers'].entries()){

	// новый список

	const questionTemplate = document.createElement('li');
	const labelTemplate = document.createElement('label');
	const inputTemplate = document.createElement('input');
	const spanTemplate = document.createElement('span');

	inputTemplate.setAttribute('type', 'radio');
	inputTemplate.classList.add('answer');

	spanTemplate.textContent = answerText;
	inputTemplate.setAttribute('value', ++answerIndex);

	listContainer.append(questionTemplate);
	questionTemplate.append(labelTemplate);
	labelTemplate.append(inputTemplate, spanTemplate);
	
	}

}

function checkAnswer(){
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	

// if answer didn't select then return
	if (!checkedRadio){
		submitBtn.blur();
		return
	} 
// number user answer
	const userAnswer = +checkedRadio.value;

// checked if user answer = correct then score +1
	if (userAnswer === questions[questionIndex]['correct']){
		score++;
	}	

	if (questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestion();
	} else {		
		clearPage();
		showResults();
	}
	
}

function showResults(){	

// шаблон

	const resultsTitle = document.createElement('h2');
	const resultsSummary = document.createElement('h3');
	const resultMessage = document.createElement('p');

	resultsTitle.classList.add('title');
	resultsSummary.classList.add('summary');
	resultMessage.classList.add('result');

	// let title, message;

	if (score === questions.length){

		resultsTitle.textContent = 'Congratulations!!';
		resultsSummary.textContent = 'You answered all questions correctly';

	} else if ((score * 100) / questions.length >= 50) {

		resultsTitle.textContent = 'Not bad!';
		resultsSummary.textContent = 'You gotted more 50%';

	} else {

		resultsTitle.textContent = 'Try more';
		resultsSummary.textContent = 'You have not enough';

	}
	// result	

	resultMessage.textContent = `${score} of ${questions.length}`;

	headerContainer.append(resultsTitle, resultsSummary, resultMessage);

// форма для получения данных
	const quizForm = document.createElement('form');
	const inputName = document.createElement('input');
	const inputPhone = document.createElement('input');
	
	quizForm.classList.add('quizForm');

	quizForm.append(inputName, inputPhone);
	headerContainer.append(quizForm);		

// расфокусировка кнопки и перезагрузка
	submitBtn.blur();
	submitBtn.textContent = 'Restart';
	submitBtn.onclick = () => history.go();
}