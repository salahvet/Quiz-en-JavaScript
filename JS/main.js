//////////////////////////////////-----Classes----------////////////////////////////////

class QuizManager {
    constructor(){
        this.quizElements = [];
        this.currentTndex = 0;
        
        
    }


    addQuizElement(question, answers, correctAnswer){
        const quizElement = {
            question,
            answers,
            correctAnswer,
            index: this.quizElements.length
            
        }
        this.quizElements.push(quizElement);
        return quizElement
       
        
        // console.log(answers)
    }

     //////-affichage de Quiz--//////
    showQuizElement(quizElement){ 

        console.log(quizElement)
            let idValue = 0
            let html = `
                        <legend class="Question01">${quizElement.question}</legend>`;
                        
                        for( const answer of quizElement.answers ){
                                
                            idValue +=1
                                    
                            html += `
                          <div class = "answer">
                            <input value = "qs${idValue}" id="idAnswer${idValue}" type="radio" name="q${quizElement.index}">
                            <label for="idAnswer${idValue}">${answer}</label>
                          </div>`;

                            
                        // console.log(answer);
                    //    console.log(idValue);
                    } 
            return `<fieldset class="QuizElement">${html}
                    <h3 id="Main-answer"></h3></fieldset>`;

    }
    getCurrentQuizElement(){
      return this.quizElements[this.currentTndex];
    
    }

    submitAnswers(){
      const currentAnswer = this.getCurrentQuizElement()
    //recupérer la réponse de l'utilisateur et la stocker dans un variable
      let i = 0
      console.log(currentAnswer.correctAnswer)
      console.log(currentAnswer.index)
      
      let userAnswer = document.querySelector(`input[name="q${currentAnswer.index}"]:checked`).value;
      
      console.log(document.querySelector(`input[name="q${currentAnswer.index}"]:checked`).value)
      
    
      if (userAnswer === currentAnswer.correctAnswer) {
        i ++
        let mainAnser = document.getElementById('Main-answer')
        mainAnser.textContent=('Correct');

        let score = document.getElementById('score')
        score.textContent=('Votre score et : '+i);
      } else {
        let mainAnser = document.getElementById('Main-answer')
        mainAnser.textContent=('Mauvaise réponse')
        
      }


      
    }
      
    

    displayFeedback(message) {
      
    }

    goToNextSecion() {
      this.currentIndex++;
    }
    
  
                   
};

//////////////////////////////////-----Variables----------////////////////////////////////

const questions = [ 
    { question: "1/Qu'est-ce que HTML?", 
      answers: ["Onglet Maison de Liste de Diffusion", "Langage de balisage hypertexte", 
      "Langage de marque commerciale hyperspace", "XpTdr Mdr Lol"],
      correctAnswer: "Langage de balisage hypertexte"
    },

    {question: "2/Quel est le but de HTML?",
    answers: ["Pour formater les pages web", "Pour structurer le contenu d'une page web", 
    "Pour créer des pages dynamiques", "Pour concurrencer Google et Facebook"],
    correctAnswer: "Pour structurer le contenu d'une page web"
    },

    {question: "3/En quelle année HTML est né?",
    answers: ["Dans les années 1970 avec Arpanet", "Entre 1986 et 1988 avec Club Dorothée",
     "Exactement en 1990 avec la naissance d'Emma Watson", "Quelque part en 1993 sous le mandat de Bill Clinton"],
    correctAnswer: "Quelque part en 1993 sous le mandat de Bill Clinton"
    },

    {question: "4/Qu'est-ce qu'un navigateur web?",
    answers: ["Un réseau social", "Un outil d'accès à Internet", "Un logiciel qui interprète et affiche le code HTML", 
    "La première application mondiale"],
    correctAnswer: "Un logiciel qui interprète et affiche le code HTML"
    },

    {question: "5/Comment représentez-vous un paragraphe en HTML?",
    answers: ["&lt;ul&gt;", "&lt;li&gt;", "&lt;h1&gt;", "&lt;div&gt;", "paragraph", "&lt;p&gt;"],
    correctAnswer: "&lt;p&gt;"
    },
    {question: "6/Comment représentez-vous une liste en HTML?",
    answers: ["&lt;ul&gt;", "&lt;li&gt;", "&lt;a&gt;", "&lt;div&gt;", "list", "&lt;p&gt;"],
    correctAnswer: "&lt;p&gt;"
    },

    {question: "7/Quel élément ne fait pas partie de cette liste?",
    answers: ["&lt;ul&gt;", "&lt;li&gt;", "&lt;a&gt;", "&lt;div&gt;", "&lt;img&gt;", "&lt;span&gt;"],
    correctAnswer: "&lt;img&gt;"
    },
    
    {question: "8/Citez un attribut HTML lié aux images?",
    answers: ["class", "href", "src", "link", "a", "data"],
    correctAnswer: "href"
    },
    {question: "9/Quel attribut spécifie la destination d'un lien?",
    answers: ["class", "href", "src", "link", "img", "data"],
    correctAnswer: "src"
    },

    {question: "10/À quoi servent les spécifications ARIA, liées à HTML ?", answers:[
        "à rendre le contenu et les applications web accessibles",
        "à gérer les familles de polices sur la page web",
        "à construire des pages web audibles et musicales",
        "à aider à l'internationalisation du web"],
    correctAnswer: "à rendre le contenu et les applications web accessiblesrc"
    }
];

//////////////////////////////////-----Globales----------////////////////////////////////

//////////////---Affichage de la page-----//////////////

const container = document.querySelector(".Quiz")

 const quizManager = new QuizManager();

for (const question of questions) {
  let quizElement = quizManager.addQuizElement(question.question, question.answers, question.correctAnswer);

  const html = quizManager.showQuizElement(quizElement) 
  container.innerHTML += html;

}
   
const validate = document.getElementById("submitButton")
quizManager.submitAnswers()



validate.addEventListener('click', submitAnswers);


  


// const correct = document.querySelector('[for="idAnswer1"]').className = 'correct';
// const wrong = document.querySelector('[for="idAnswer4"]').className = 'wrong';
  

// console.log("clicked")





