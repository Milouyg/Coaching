class Question{
    htmlElement;
    constructor(newHtmlElement){
        this.htmlElement = newHtmlElement;
    }
}

class QuestionList{
    htmlElement;
    question;
    questionInhoud;
    questionNumber;
    constructor(newHtmlElement, question, newQuestionInhoud){
        this.htmlElement = newHtmlElement;
        this.questionInhoud = newQuestionInhoud;
        this.question = question;
        this.renderNumber();
    }
    renderNumber(){
        for(let i = 0; i < this.htmlElement.length; i++){
            this.questionNumber = this.questionInhoud[i].children[0]
            this.questionNumber.innerText = i + 1;

        }
    }
}

const question = new Question(document.getElementsByClassName("vragen"))
const questionList = new QuestionList(document.getElementsByClassName("vragen__vraag"), question, document.getElementsByClassName("vragen__inhoud"))