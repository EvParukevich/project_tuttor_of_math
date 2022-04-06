import {questions} from './questions.js';

// находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// создаём переменные  
let score = 0; // score right answer
let questionIndex = 0; // current question

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.textContent = '';
	listContainer.textContent = '';
}

function showQuestion(){

	// вопрос
	const headerTemplate = document.createElement('h2');
	const title = questions[questionIndex]['question'];

	// подсказка
	const cheatContainer = document.createElement('div');
	const cheatBox = document.createElement('span');

	headerTemplate.classList.add('title');	
	headerTemplate.textContent = title;
	cheatContainer.classList.add('cheat_container');
	cheatContainer.textContent ='Взять подсказку';
	cheatBox.classList.add('cheat_box');
	cheatBox.textContent = questions[questionIndex]['correct'];

	cheatContainer.append(cheatBox);
	headerContainer.append(headerTemplate, cheatContainer);

	for (let [answerIndex, answerText] of questions[questionIndex]['answers'].entries()){

	// список ответов
	const questionTemplate = document.createElement('li');
	const labelTemplate = document.createElement('label');
	const inputTemplate = document.createElement('input');
	const spanTemplate = document.createElement('span');

	inputTemplate.setAttribute('type', 'radio');
	inputTemplate.classList.add('answer');
	inputTemplate.setAttribute('name', 'answer');

	spanTemplate.textContent = answerText;
	inputTemplate.setAttribute('value', ++answerIndex);

	listContainer.append(questionTemplate);
	questionTemplate.append(labelTemplate);
	labelTemplate.append(inputTemplate, spanTemplate);

	cheatContainer.onclick = function(){
		if (cheatBox.style.display === 'block') {
			cheatBox.style.display = 'none';
		} else {
			cheatBox.style.display = 'block';
		}
	}
	
	}

}

function checkAnswer(){
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	
	// Если вопрос не выбран расфокусить
	if (!checkedRadio){
		submitBtn.blur();
		return
	} 
	// выбраный ответ
	const userAnswer = +checkedRadio.value;

	// если верный, присвоить +1
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

	const resultsTitle = document.createElement('h2');
	const resultsSummary = document.createElement('h3');
	const resultMessage = document.createElement('p');
	const linkOnMain = document.createElement('a');

	resultsTitle.classList.add('title');
	resultsSummary.classList.add('summary');
	resultMessage.classList.add('result');
	linkOnMain.classList.add('submit');

	if (score === questions.length){

		resultsTitle.textContent = 'Поздравляем!!!';
		resultsSummary.textContent = 'Вы ответили на все вопросы правильно';

	} else if ((score * 100) / questions.length >= 50) {

		resultsTitle.textContent = 'Неплохо!';
		resultsSummary.textContent = 'Вы набрали больше 50%';

	} else {

		resultsTitle.textContent = 'Попробуйте ещё';
		resultsSummary.textContent = 'Вы почти у цели';

	}

	// результат
	resultMessage.textContent = `${score} из ${questions.length}`;
	linkOnMain.textContent = 'Вернуться на главную';
	linkOnMain.setAttribute('href', '../index.html');
	linkOnMain.classList.add('link_on_main');

	headerContainer.append(resultsTitle, resultsSummary, resultMessage);	
	document.querySelector('.quiz').append(linkOnMain);

	// расфокусировка кнопки и перезагрузка
	submitBtn.blur();
	submitBtn.textContent = 'Начать заново';
	submitBtn.onclick = () => history.go();
}