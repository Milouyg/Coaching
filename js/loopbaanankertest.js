class Json{
    url;
    
    constructor(url){
        this.url = url;
    }

    async getQuestionsJson() {
        await fetch(this.url)
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.questionsJson = data;
            });
        return this.questionsJson["opvattingen"];
    }
}

class Main {
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

    modal;

    scores;

    localStorage;

    constructor(placeToRender) {
        this.placeToRender = document.getElementsByTagName(placeToRender)[0];
        this.placeToRender.classList = "body__loopbaanankertest";

        this.scores = [];

        this.questionMain = document.createElement("main");
        this.questionMain.classList = "vragen__main";

        this.localStorage = new LocalStorage();
        this.modal = new Modal(this.placeToRender, this.questionMain, this.localStorage, this.scores);

        this.questionUl = document.createElement("ul");
        this.questionUl.classList = "vragen";

        this.questionUitlegDiv = document.createElement("div");
        this.questionUitlegDiv.classList = "vragen__uitleg"

        this.questionExplanationP = document.createElement("p");
        this.questionExplanationP.classList = "vragen__paragraafUitleg";
        this.questionExplanationP.innerText = "per vraag kan geklikt worden en dan komt er een balk onderaan de vraag tevoorschijn 1 voor niet van toepassing tot 6 altijd van toepassing. 3 is zo nu en dan op mij van toepassing. antwoord op gevoel waar jij het fijnste bij voelt.";

        this.questionButtonWrapper = document.createElement("div");
        this.questionButtonWrapper.classList = "vragen__buttonWrapper";

        this.questionButton = document.createElement("button");
        this.questionButton.classList = "vragen__button";
        this.questionButton.innerText = "Volgende stap";
        this.questionButton.style.display = "none"; 

        this.questionButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.modal.openModal();
            this.questionButton.remove();
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

            this.sliderInput.addEventListener("click", (event) => {
                this.activateNextQuestion(i);
                this.saveData(event, questions, i);
            });
            // Stopped scrolling
            this.sliderInput.addEventListener("wheel", (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
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
        const found = this.scores.findIndex(unserAnswer => unserAnswer["id"] === formData["id"]);
        if (found !== -1) {
            this.scores.splice(found, 1, formData);
        }
        else {
            this.scores.push(formData);
        }

        if (i === questions.length - 1) {
            this.localStorage.clearScores();
            this.questionButton.style.display = "block";
            this.localStorage.saveScores(this.scores);
        }
    }
}

class Modal{
    placeToRender
    questionMain;
    localStorage
    scores

    modalSection;
    modalExplanation;
    modalButton;
    modalLi;
    modalQuestion;
    modalNumber;

    modalCheckbox;

    constructor(placeToRender, questionMain, localStorage, scores){
        this.placeToRender = placeToRender;
        this.questionMain = questionMain;
        this.localStorage = localStorage;
        this.scores = scores;
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

        const dataJson = this.localStorage.getScores();
        

        for (let i = 0; i < dataJson.length; i++) {
            if (dataJson[i]["value"] > 4) {
                this.modalLi = document.createElement("li");
                this.modalLi.classList = "modal__li";

                this.modalWrapperNumber = document.createElement("div");
                this.modalWrapperNumber.classList = "modal__wrapperNumber";

                this.modalNumber = document.createElement("p");
                this.modalNumber.classList = "modal__number";
                this.modalNumber.innerText = dataJson[i]["value"];

                this.modalQuestion = document.createElement("p");
                this.modalQuestion.classList = "modal__vraag";
                this.modalQuestion.innerText = dataJson[i]["opvatting"];

                this.modalWrapper = document.createElement("div");
                this.modalWrapper.classList = "modal__wrapper";

                this.modalCheckbox = document.createElement("input");
                this.modalCheckbox.classList = "modal__input";
                this.modalCheckbox.setAttribute("type", "checkbox");
                this.modalCheckbox.setAttribute("id", dataJson[i]["id"]);

                this.modalSection.appendChild(this.modalLi);
                this.modalLi.appendChild(this.modalWrapperNumber);
                this.modalWrapperNumber.appendChild(this.modalNumber);
                this.modalLi.appendChild(this.modalQuestion);
                this.modalLi.appendChild(this.modalWrapper);
                this.modalWrapper.appendChild(this.modalCheckbox);

                this.modalCheckbox.addEventListener("click", () => {
                    this.checkboxValidation(dataJson);
                });
            }
        }

        this.modalSection.appendChild(this.modalButton);
        this.modalButton.addEventListener("click", (event) => {
            event.preventDefault()
            this.addFourPoints(dataJson);
            new ChartWrapper(this.questionMain, this.localStorage.getScores(), this.placeToRender);
        });
    }

    checkboxValidation(dataJson) {
        const allCheckboxes = document.querySelectorAll(".modal__input");
        let amountCheckboxChecked = 0;
        let modalNumber = document.getElementsByClassName("modal__number");
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (allCheckboxes[i].checked === true) {
                amountCheckboxChecked += 1;
                modalNumber[i].textContent = +dataJson[i]["value"] + 4;
            }
            else{
                modalNumber[i].textContent = +dataJson[i]["value"];
            }
        }
        // Not more than 3 checkbox checked
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
        for (let i = 0; i < allCheckboxes.length; i++) {
            if (allCheckboxes[i].checked === true) {
                const checkboxId = allCheckboxes[i]["id"];

                // Convert a string to a number with the + operator
                const newValue = +dataJson[checkboxId]["value"] + 4;
                dataJson[checkboxId]["value"] = newValue;
            }
        }
        this.scores.length = 0;
        this.scores = dataJson;
        this.localStorage.saveScores(this.scores);
    }
}

class LocalStorage{
    
    clearScores() {
        localStorage.removeItem("userAnswer");
    }

    saveScores(scores) {
        // convert scores into a string and storage it in localStorage
        localStorage.setItem("userAnswer", JSON.stringify(scores));
    }

    getScores() {
        return JSON.parse(localStorage.getItem("userAnswer"));
    }
}

class ChartWrapper {
    scores;
    placeToRender;
    article;
    canvas;

    constructor(questionMain, scores, placeToRender) {
        questionMain.remove();
        this.scores = scores;
        this.placeToRender = placeToRender;

        this.article = document.createElement("article");
        this.article.classList = "chart1";

        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "js--chart--1");

        this.render();
        this.renderChart();
    }

    render() {
        this.placeToRender.appendChild(this.article);
        this.article.appendChild(this.canvas);
    }

    renderChart() {
        new Chart(this.canvas, {
            type: 'radar',
            data: {
                labels: [
                    "Technisch/functioneel (TF)",
                    "Algemeen management (AM)",
                    "Autonomie/onafhankelijkheid (AU)",
                    "Zekerheid en stabiliteit (ZE)",
                    "Ondernemingsgerichte creativiteit (OC)",
                    "Dienstverlening/toewijding aan de zaak (DV)",
                    "Zuivere uitdaging (UI)",
                    "Levensstijl (LS)"
                ],
                datasets: [{
                    label: 'Uitslag Loopbaanankertest',
                    data: this.calcResults(),
                    borderWidth: 1
                }]
            },
        });
    }

    calcResults() {
        // ts, am, au, ze, oc, dv, ui, ls
        let value = [0, 0, 0, 0, 0, 0, 0, 0];

        // Sums values per category
        const categories = ["tf", "am", "au", "ze", "oc", "dv", "ui", "ls"];
        for(let i = 0; i < categories.length; i++){
            const results = this.scores.filter(score => score["categorie"] === categories[i]);
            results.forEach(object => value[i] += +object["value"]);
        }

        // Divide the value
        for (let i = 0; i < value.length; i++) {
            value[i] = value[i] / 5;
        }
        return value;
    }
}

class Loopbaanankertest{
    placeToRender;
    main;
    json;

    constructor(placeToRender){
        this.placeToRender = placeToRender;

        this.json = new Json("../data/loopbaanankertest.json");
        this.main = new Main("body");
        
        this.json.getQuestionsJson().then((questionsJson) => {
            this.main.render(questionsJson);
        });
    }
}

const loopbaanankertest = new Loopbaanankertest("body");





