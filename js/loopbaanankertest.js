class LoopBaanAnkerTest {
    placeToRender;

    questionUl;
    questionExplanation;

    questionsJson;

    questionList;
    questionFigure;
    questionNumber;
    questionParagraph;
    slider;
    sliderInput;
    sliderNumbers;

    scores;

    constructor(placeToRender) {
        this.placeToRender = document.getElementsByTagName(placeToRender)[0];

        this.scores = [];

        this.questionUl = document.createElement("ul");
        this.questionUl.classList = "vragen";

        this.questionUitlegDiv = document.createElement("div");
        this.questionUitlegDiv.classList = "vragen__uitleg"

        this.questionExplanationP = document.createElement("p");
        this.questionExplanationP.classList = "vragen__paragraafUitleg";
        this.questionExplanationP.innerText = "per vraag kan geklikt worden en dan komt er een balk onderaan de vraag tevoorschijn 1 voor niet van toepassing tot 6 altijd van toepassing. 3 is zo nu en dan op mij van toepassing. antwoord op gevoel waar jij het fijnste bij voelt.";
    }

    render(questions) {
        this.questionUl.appendChild(this.questionUitlegDiv);
        this.questionUitlegDiv.appendChild(this.questionExplanationP)
        this.placeToRender.appendChild(this.questionUl);
        this.generateQuestions(questions);
    }

    generateQuestions(questions) {
        for (let i = 0; i < questions.length; i++) {

            this.questionList = document.createElement("li");
            this.questionList.classList = "vragen__vraag";

            if (i === 0) {
                this.questionList.classList.add("vragen__vraag--active");
            }

            this.questionFigure = document.createElement("figure");
            this.questionFigure.classList = "vragen__inhoud";

            this.questionNumber = document.createElement("h3");
            this.questionNumber.classList = "vragen__nummer";
            this.questionNumber.innerText = i + 1;

            this.questionParagraph = document.createElement("p");
            this.questionParagraph.classList = "vragen__paragraaf";
            this.questionParagraph.innerText = questions[i]["Opvatting"];

            this.slider = document.createElement("div");
            this.slider.classList = "vragen__slider";
            this.sliderInput = document.createElement("input");
            this.sliderInput.setAttribute("type", "range");
            this.sliderInput.setAttribute("min", "1");
            this.sliderInput.setAttribute("max", "6");
            this.sliderInput.setAttribute("value", "1")

            this.sliderNumbers = document.createElement("ul");
            this.sliderNumbers.classList = "vragen__sliderNumbers";

            this.questionUl.appendChild(this.questionList);
            this.questionList.appendChild(this.questionNumber);
            this.questionList.appendChild(this.questionParagraph);
            this.questionList.appendChild(this.slider);

            this.slider.appendChild(this.sliderInput);

            this.slider.appendChild(this.sliderNumbers);
            this.renderSliderNumbers();

            this.sliderInput.addEventListener("mouseup", (event) => {
                this.activateNextQuestion(i);
                this.saveData(event, questions, i);
            });
        }
    }

    renderSliderNumbers() {
        for (let i = 0; i < 6; i++) {
            this.sliderNumber = document.createElement("li");
            this.sliderNumber.innerText = i + 1
            this.sliderNumbers.appendChild(this.sliderNumber);
        }
    }

    activateNextQuestion(i) {
        const quesionLiArray = document.querySelectorAll(".vragen__vraag");
        const nextQuestionItem = quesionLiArray[i + 1];
        if (nextQuestionItem) {
            nextQuestionItem.classList.add("vragen__vraag--active");
            nextQuestionItem.scrollIntoView({ behavior: "smooth" });
        }
    }

    saveData(event, questions, i) {
        const formData = { 
            categorie: questions[i]["Categorie"], 
            opvatting: questions[i]["Opvatting"], 
            value: event["target"]["value"]
        };
        this.scores.push(formData);
        if(i === questions.length - 1){
            const score = new scoreStorage(this.scores);
            score.saveScores();
        }
    }

    async getQuestionsJson() {
        await fetch("../data/loopbaanankertest.json")
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.questionsJson = data;
            });
        return this.questionsJson["Opvattingen"];
    }
}

const form = new LoopBaanAnkerTest("body");
form.getQuestionsJson().then((questionsJson) => {
    form.render(questionsJson);
});


class scoreStorage {
    scores;

    constructor(scores) {
        this.scores = scores;
    }

    saveScores(){
        localStorage.setItem("userAnswer", JSON.stringify(this.scores));
        console.log(localStorage);
    }
}

