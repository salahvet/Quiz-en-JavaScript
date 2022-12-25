fetch('questions.json')
 .then(response => response.json())
 .then(data => {
const questionsHTML = data.questionsHTML;
const questionsCSS = data.questionsCSS;
const questionsJS = data.questionsJS;
const questionsPHP = data.questionsPHP;
const questionsSQL = data.questionsSQL;

    class QuizElement {
        constructor (question, answers, correctAnswer){

            this.question = question
            this.answers = answers
            this.correctAnswer = correctAnswer
            this.index = 0
        }

        generateHTML(){

            let html = `<legend>${this.question}</legend>`
            let idVlue  = 0
            for(let answer of this.answers){
                
                idVlue +=1
                html +=
            
                `<div id='setAnswer'>
                    <input  value = "${answer}" id ='answerElement${idVlue}' type="radio" name ="q${this.index}">
                    <label for="answerElement">${answer}</label> 
        
                </div>`

            }
            return  `<fieldset class ="layout" id="Quiz-Element-${this.index}">${html}<h2 id="Main-Answer-${this.index}"></h2></fieldset>` 
        }

        checkOneAnswer(){
            let userAnswer = document.querySelector(`#Quiz-Element-${this.index} input:checked`).value;
            
            // console.log(userAnswer)
            // console.log(this.correctAnswer)
            
            if (userAnswer === this.correctAnswer) {
                let mainAnser = document.getElementById(`Main-Answer-${this.index}`);
                mainAnser.textContent = 'Correct';
                return true
                
            } else {
                let mainAnser = document.getElementById(`Main-Answer-${this.index}`);
                mainAnser.textContent = 'Mauvaise réponse';
                return false
                
            }

        }
    }

    class QuizManager {
        constructor(){
            this.quizElements = [];
            this.currentPage = 1;
            this.totalPage = 5;
            this.score = 0
            this.scores = []
        }
        
            
        
        addQuizElement(question, answers, correctAnswer) {
            const quizElement = new QuizElement(question, answers, correctAnswer);
            quizElement.index = this.quizElements.length;
            this.quizElements.push(quizElement);
            
            return quizElement;
        }

        showQuizElement(quizElement) {
        return quizElement.generateHTML();
        }
        submitAnswers() {
            this.score = 0;

                for (const quizElement of this.quizElements) {
                if (quizElement.checkOneAnswer()) {
                    this.score++;
                }
            }
            this.scores[this.currentPage - 1] = this.score;
            let scoreElement = document.getElementById('score');
            scoreElement.textContent = `Votre score est : ${this.scores[this.currentPage - 1]}/${this.quizElements.length}`;
            
        }
        
        goToNextPage() {
            
            
            if (this.currentPage === this.totalPage) {
              return;
            }

            let scoreElement = document.getElementById('score');
            scoreElement.textContent = `Votre score est : ${0}/10`;

            const currentPageId = `#Quiz-container${this.currentPage}`;
            const currentPage = document.querySelector(currentPageId);
            currentPage.classList.add('hide');
            this.currentPage++;
            const nextPageId = `#Quiz-container${this.currentPage}`;
            const nextpage = document.querySelector(nextPageId);
            nextpage.classList.remove('hide');

            const quizElements = this.getQuizElementsForNextPage()
            
            

            for (const quizElement of quizElements) {
                const quizElementHTML = this.showQuizElement(quizElement);
                nextpage.innerHTML += quizElementHTML;
                }

        }
        getQuizElementsForNextPage() {
            let quizElements = [];
            let currentPageIndex = this.currentPage - 1;
          
            for (let i = currentPageIndex; i < currentPageIndex + 1; i++) {
              const devQuizPage = devQuizPages[i];
          
              for (const question of devQuizPage) {
                const quizElement = this.addQuizElement(question.question, question.answers, question.correctAnswer);
                quizElements.push(quizElement);
              }
            }
          
            return quizElements;
          }
        
          goBackPage() {
            
        if (this.currentPage === 1) {
            return;
        }

        let scoreElement = document.getElementById('score');
        scoreElement.textContent = `Votre score est : 0/10`;

        const currentPageId = `#Quiz-container${this.currentPage}`;
        const currentPage = document.querySelector(currentPageId);
        currentPage.classList.add('hide');
        currentPage.innerHTML = '';
        this.currentPage--;
        const previousPageId = `#Quiz-container${this.currentPage}`;
        const previousPage = document.querySelector(previousPageId);
        previousPage.classList.remove('hide');

        const quizElements = this.getQuizElementsForPreviousPage();
        

        for (const quizElement of quizElements) {
            const quizElementHTML = this.showQuizElement(quizElement);
            previousPage.innerHTML += quizElementHTML;
 
        }
         
}

getQuizElementsForPreviousPage() {
  let quizElements = [];
  let currentPageIndex = this.currentPage - 1;

  for (let i = currentPageIndex; i < currentPageIndex + 1; i--) {
    const devQuizPage = devQuizPages[i];

    for (const question of devQuizPage) {
      const quizElement = this.addQuizElement(question.question, question.answers, question.correctAnswer);
      quizElements.push(quizElement);
    }
  }

  return quizElements;
}

    }

    ////////////----variable------///////////
    let quizManager = new QuizManager();
    let currentPage = document.getElementById('Quiz-container1')
    const validateButton = document.getElementById('submitButton');
    const nextButton = document.getElementById('nextButton')
    const goBacktButton = document.getElementById('goBack')
    const devQuizPages = [questionsHTML, questionsCSS, questionsJS ,questionsPHP, questionsSQL]
    

    ///////////----global--------//////////
    
   
        
    for ( let  question of questionsHTML) {
        quizManager.addQuizElement(question.question, question.answers, question.correctAnswer);
    }

   
    

    let questionIndex = 0
    for (const quizElement of quizManager.quizElements) {
    questionIndex +=1
    const html = quizManager.showQuizElement(quizElement); 
    currentPage.innerHTML += html;
    }
    

    validateButton.addEventListener('click', function() {quizManager.submitAnswers();});
   
    console.log(quizManager)

    nextButton.addEventListener('click', function() {quizManager.goToNextPage()});
    
    goBacktButton.addEventListener('click', function() {
        quizManager.goBackPage()
    
    });
      

});







