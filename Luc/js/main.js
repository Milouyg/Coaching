class QuestionList {
    body;
    questionList;
    constructor() {
        this.body = document.querySelector("body");

        this.questionList = document.createElement("ul");
        this.questionList.classList = "vragen"
    }
    render() {
        this.body.appendChild(this.questionList)
    }
}

/* <li class="vragen__vraag">

    <section class="vragen__inhoud">
        <h3 class="vragen__nummer"></h3>
        <p class="vragen__paragraaf">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            assumenda, aspernatur facilis maiores minima soluta voluptatum harum mollitia ab culpa at iure
            perspiciatis vitae quasi, quo doloremque fugiat est cumque.</p>
    </section>
    <div class="vragen__slider"><input type="range" name="" id="" min="1" max="6">
        <ul class="vragen__sliderNumbers">
            <li class="vragen__sliderNumber">1</li>
            <li class="vragen__sliderNumber">2</li>
            <li class="vragen__sliderNumber">3</li>
            <li class="vragen__sliderNumber">4</li>
            <li class="vragen__sliderNumber">5</li>
            <li class="vragen__sliderNumber">6</li>
        </ul>
    </div>
</li> */

class QuestionItem {
    question;
    questionList;
    questionInhoud;
    questionNumber;
    questionParagraaf;

    slider;
    sliderInput;
    sliderNumbers;
    sliderNumber;
    constructor(newQuestionList) {
        this.questionList = newQuestionList;


        this.question = document.createElement("li");
        this.question.classList = "vragen__vraag vragen__vraag--active";

        this.questionInhoud = document.createElement("section");
        this.questionInhoud.classList = "vragen__inhoud";

        this.questionNumber = document.createElement("h3");
        this.questionNumber.classList = "vragen__nummer";
        this.questionParagraaf = document.createElement("p");
        this.questionParagraaf.classList = "vragen__paragraaf";
        this.questionParagraaf.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates assumenda, aspernatur facilis maiores minima soluta voluptatum harum mollitia ab culpa at iure perspiciatis vitae quasi, quo doloremque fugiat est cumque."

        this.slider = document.createElement("div");
        this.slider.classList = "vragen__slider";
        this.sliderInput = document.createElement("input");
        this.sliderInput.setAttribute("type", "range")
        this.sliderInput.setAttribute("min", "1")
        this.sliderInput.setAttribute("max", "6")

        this.sliderNumbers = document.createElement("ul");
        this.sliderNumbers.classList = "vragen__sliderNumbers";
        
        

        // <input type="range" name="" id="" min="1" max="6">
    }
    render() {
        this.questionList.appendChild(this.question);
        this.question.appendChild(this.questionInhoud);
        this.questionInhoud.appendChild(this.questionParagraaf);
        this.question.appendChild(this.slider);
        this.slider.appendChild(this.sliderInput)
        this.slider.appendChild(this.sliderNumbers);
        this.renderSliderNumbers();
    }
    renderSliderNumbers(){
        for(let i = 0; i < 6; i++){
            this.sliderNumber = document.createElement("li");
            this.sliderNumber.innerText = i + 1
            this.sliderNumbers.appendChild(this.sliderNumber);
        }
    }
    
    
}


class Uitleg{
    uitlegElement;
    uitlegInhoud;
    questionlist;
    constructor(newQuestionList){
        this.questionlist = newQuestionList;
        this.uitlegElement = document.createElement("li");
        this.uitlegElement.classList = "vragen__uitleg";

        this.uitlegInhoud = document.createElement("p");
        this.uitlegInhoud.classList = "vragen__paragraafUitleg";
        this.uitlegInhoud.innerText =   "per vraag kan geklikt worden en dan komt er een balk onderaan de vraag tevoorschijn 1 voor niet van toepassing tot 6 altijd van toepassing. 3 is zo nu en dan op mij van toepassing. antwoord op gevoel waar jij het fijnste bij voelt."
        console.log(this.uitlegElement)
    }

    render(){
        this.questionlist.appendChild(this.uitlegElement)
        this.uitlegElement.appendChild(this.uitlegInhoud)
    }
}



class App{
    questionList;
    constructor(){
        this.questionlist = new QuestionList();
        this.questionlist.render();
        const uitleg = new Uitleg(this.questionlist.questionList);
        uitleg.render()
        this.renderItems()
        
    }

    renderItems(){
        for(let i = 0; i < 40; i++){
            const questionItem = new QuestionItem(this.questionlist.questionList);
            questionItem.render();
        }
    }
    renderQuestionNumber = () =>{
        for (let i = 0; i < 1; i++) {
            this.questionNumber.innerText = i + 1;
            this.questionInhoud.appendChild(this.questionNumber)
        } 
    }
}
const app = new App()