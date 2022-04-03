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
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

// function declaration show question

function showQuestion(){
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	headerContainer.innerHTML = title;
	
	for (let [answerIndex, answerText] of questions[questionIndex]['answers'].entries()){
		
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`
		let answerHTML = questionTemplate
										.replace('%answer%', answerText)
										.replace('%number%', answerIndex);
		
		listContainer.innerHTML += answerHTML;		
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
	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
	`;

	let title, message;

	if (score === questions.length){

		title = 'Congratulations!!';
		message = 'You answered all questions correctly';

	} else if ((score * 100) / questions.length >= 50) {

		title = 'Not bad!';
		message = 'You gotted more 50%';

	} else {

		title = 'Try more';
		message = 'You have not enough';

	}
	// result
	let result = `${score} of ${questions.length}`;

	const finalMessage = resultsTemplate
							.replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;
	submitBtn.blur();
	submitBtn.innerText = 'Restart';
	submitBtn.onclick = () => history.go();
}