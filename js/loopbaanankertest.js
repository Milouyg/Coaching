class LoopBaanAnkerTest {
    placeToRender;

    questionMain;
    questionUl;
    questionExplanation;
    questionButton;

    questionsJson;

    questionList;
    questionFigure;
    questionNumber;
    questionParagraph;
    slider;
    sliderInput;
    sliderNumbers;

    scores;

    modalSection;
    modalExplanation;
    modalLi;
    modalQuestion;

    modalCheckbox;

    constructor(placeToRender) {
        this.placeToRender = document.getElementsByTagName(placeToRender)[0];

        this.scores = [];

        this.questionMain = document.createElement("main");
        this.questionMain.classList = "vragen__main";

        this.questionUl = document.createElement("ul");
        this.questionUl.classList = "vragen";

        this.questionUitlegDiv = document.createElement("div");
        this.questionUitlegDiv.classList = "vragen__uitleg"

        this.questionExplanationP = document.createElement("p");
        this.questionExplanationP.classList = "vragen__paragraafUitleg";
        this.questionExplanationP.innerText = "per vraag kan geklikt worden en dan komt er een balk onderaan de vraag tevoorschijn 1 voor niet van toepassing tot 6 altijd van toepassing. 3 is zo nu en dan op mij van toepassing. antwoord op gevoel waar jij het fijnste bij voelt.";

        this.questionButton = document.createElement("button");
        this.questionButton.classList = "vragen__button";
        this.questionButton.innerText = "Volgende stap";

        this.questionButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.openModal();
            // this.questionButton.remove();
        });
    }

    render(questions) {
        this.placeToRender.appendChild(this.questionMain);
        this.questionMain.appendChild(this.questionUl);
        this.questionMain.appendChild(this.questionButton);
        this.questionUl.appendChild(this.questionUitlegDiv);
        this.questionUitlegDiv.appendChild(this.questionExplanationP)
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
            this.questionParagraph.innerText = questions[i]["opvatting"];

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
            id: questions[i]["id"],
            categorie: questions[i]["categorie"],
            opvatting: questions[i]["opvatting"],
            value: event["target"]["value"]
        };
        this.scores.push(formData);
        if (i === questions.length - 1) {
            this.saveScores();
        }
    }

    openModal() {
        this.modalSection = document.createElement("section");
        this.modalSection.classList = "modal__section";

        this.modalExplanation = document.createElement("p");
        this.modalExplanation.classList = "modal__uitleg";
        this.modalExplanation.innerText = "Kijk nu naar de antwoorden en zoek de bewering die je het hoogst gewaardeerd hebt. Kies hieruit 3 beweringen die het meest op jou van toepassing zijn. Dit kan je doen door op de knopjes te klikken, dit kent 4 punten toe.";

        this.modalButton = document.createElement("button");
        this.modalButton.classList = "modal__button";
        this.modalButton.innerText = "Resultaten";

        this.questionMain.appendChild(this.modalSection);
        this.modalSection.appendChild(this.modalExplanation);

        const dataJson = this.getScores();

        for (let i = 0; i < dataJson.length; i++) {
            if (dataJson[i]["value"] > 4) {
                this.modalLi = document.createElement("li");
                this.modalLi.classList = "modal__li";

                this.modalQuestion = document.createElement("p");
                this.modalQuestion.classList = "modal_vraag";
                this.modalQuestion.innerText = dataJson[i]["opvatting"];

                this.modalCheckbox = document.createElement("input");
                this.modalCheckbox.classList = "modal__input";
                this.modalCheckbox.setAttribute("type", "checkbox");
                this.modalCheckbox.setAttribute("id", dataJson[i]["id"]);

                this.modalSection.appendChild(this.modalLi);
                this.modalLi.appendChild(this.modalQuestion);
                this.modalLi.appendChild(this.modalCheckbox);

                this.modalCheckbox.addEventListener("click", () => {
                    this.checkboxValidation();
                });
            }
        }

        this.modalSection.appendChild(this.modalButton);
        this.modalButton.addEventListener("click", (event) => {
            event.preventDefault()
            this.addFourPoints(dataJson);

        });
    }

    checkboxValidation() {
        const allCheckboxes = document.querySelectorAll(".modal__input");
        let amountCheckboxChecked = 0;
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (allCheckboxes[i].checked === true) {
                amountCheckboxChecked += 1;
            }
        }
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (amountCheckboxChecked > 2 && !allCheckboxes[i].checked) {
                allCheckboxes[i].disabled = true;
            }
            else {
                allCheckboxes[i].disabled = false;
            }
        }
    }

    addFourPoints(dataJson) {
        const allCheckboxes = document.querySelectorAll(".modal__input");
        console.log(this.scores);
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (allCheckboxes[i].checked === true) {
                const checkboxId = allCheckboxes[i]["id"];
                const newDataJson = dataJson[checkboxId]; 

                // Convert a string to a number with the + operator
                const newValue = +newDataJson["value"] + 4;
                newDataJson["value"] = newValue;
                
                // this.scores.length = 0;

                // for(let x = 0; x < dataJson.length; x++){
                //     this.scores.push(dataJson[x]);
                // }
            }
        }
    }

    saveScores() {
        localStorage.setItem("userAnswer", JSON.stringify(this.scores));
    }

    getScores() {
        return JSON.parse(localStorage.getItem("userAnswer"));
    }

    async getQuestionsJson() {
        await fetch("../data/loopbaanankertest.json")
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.questionsJson = data;
            });
        return this.questionsJson["opvattingen"];
    }
}

const form = new LoopBaanAnkerTest("body");
form.getQuestionsJson().then((questionsJson) => {
    form.render(questionsJson);
});



