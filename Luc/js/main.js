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
    constructor(newQuestionList) {
        this.question = document.createElement("li");
        this.question.classList = "vragen__vraag"

        this.questionList = newQuestionList;
    }
    render() {
        this.questionList.appendChild(this.question);
    }
}

class QuestionNumber {
    questionList;
    questionNumber;
    constructor(newQuestionList) {
        this.questionList = newQuestionList;

    }
    render() {
        for (let i = 0; i < this.htmlElement.length; i++) {
            this.questionNumber = this.questionInhoud[i].children[0]
            this.questionNumber.innerText = i + 1;
        }
    }
}

// const questionlist = new QuestionList();
// questionlist.render();
// const questionItem = new QuestionItem(questionlist.questionList, "vragen__inhoud");
// questionItem.render();
// const questionNumber = new QuestionNumber(questionlist)