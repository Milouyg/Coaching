class Gedachtes {
    // Kaartjes
    placeToRender;
    gedachtesForm;
    gedachtesSection;
    gedachtesUl;
    gedachteLi;
    gedachteFigure;
    gedachteH2;
    gedachteButton;
    gedachteFigureTextarea;
    gedachteTextarea;

    cardContent;
    // Modaal
    modaalFigure;
    modaalHeader;
    modaalButton;
    modaalP;

    constructor(placeToRender) {
        // We pakken hier de html body element
        this.placeToRender = document.getElementsByTagName(placeToRender)[0];

        this.gedachtesForm = document.createElement("form");
        this.gedachtesForm.classList = "gedachtes__form";

        this.gedachtesSection = document.createElement("section");
        this.gedachtesSection.classList = "gedachtes__section";

        this.gedachtesUl = document.createElement("ul");
        this.gedachtesUl.classList = "gedachtes__ul";
    }

    generateCards(amount) {
        for (let i = 0; i < amount; i++) {
            this.gedachteLi = document.createElement("li");
            this.gedachteLi.classList = "gedachte__li";
            this.gedachteLi.setAttribute("id", i);

            this.gedachteFigure = document.createElement("figure");
            this.gedachteFigure.classList = "gedachte__figure gedachte__figure--head";

            this.gedachteH2 = document.createElement("h2");
            this.gedachteH2.classList = "gedachte__h2";
            this.gedachteH2.setAttribute("id", i);

            this.gedachteButton = document.createElement("button");
            this.gedachteButton.classList = "gedachte__question";
            this.gedachteButton.innerText = "?";

            this.gedachteFigureTextarea = document.createElement("figure");
            this.gedachteFigureTextarea.classList = "gedachte__figure gedachte__figure--textarea";

            this.gedachteTextarea = document.createElement("textarea");
            this.gedachteTextarea.classList = "textarea__figure";

            this.gedachtesUl.appendChild(this.gedachteLi);
            this.gedachteLi.appendChild(this.gedachteFigure);
            this.gedachteFigure.appendChild(this.gedachteH2);
            this.gedachteFigure.appendChild(this.gedachteButton);
            this.gedachteLi.appendChild(this.gedachteFigureTextarea);
            this.gedachteFigureTextarea.appendChild(this.gedachteTextarea);
        }
    }

    modaal() {
        this.modaalFigure = document.createElement("figure");
        this.modaalFigure.classList = "modaal__figure";
        this.modaalHeader = document.createElement("header");
        this.modaalHeader.classList = "modaal__header";
        this.modaalButton = document.createElement("button");
        this.modaalButton.classList = "modaal__button";
        this.modaalButton.innerText = "X";
        this.modaalP = document.createElement("p")
        this.modaalP.classList = "modaalP";
        this.modaalP.innerText = "Lorem ipsum lorem ipsum";

        this.gedachtesSection.appendChild(this.modaalFigure);
        this.modaalFigure.appendChild(this.modaalHeader);
        this.modaalHeader.appendChild(this.modaalButton);
        this.modaalFigure.appendChild(this.modaalP);
    }

    render() {
        this.placeToRender.appendChild(this.gedachtesForm);
        this.gedachtesForm.appendChild(this.gedachtesSection);
        this.gedachtesSection.appendChild(this.gedachtesUl);
        this.generateCards(7);

        const textarea = document.getElementsByClassName("textarea__figure");
        for (let i = 0; i < 7; i++) {
            textarea[i].addEventListener(
                "blur",
                () =>
                    this.showCards(i)
            );

            const gedachteButtonQuestion = document.getElementsByClassName("gedachte__question");
            const gedachteButtonX = document.getElementsByClassName("modaal__button");

            gedachteButtonQuestion[i].onclick = (event) => {
                event.preventDefault();
                this.modaalFigure.classList.toggle("modaal__figure--show");
            }

            gedachteButtonX[i].onclick = (event) => {
                event.preventDefault();
                this.modaalFigure.classList.toggle("modaal__figure--show");
            }
        }
    }

    // Haalt gedachtes.json op
    async getCardContent() {
        await fetch("../data/gedachtes.json")
            .then(function (response) {
                return response.json();
            }).then((data) => {
                this.cardContent = data;
            });
        return this.cardContent;
    }

    pickUpContent(cardContent) {
        for (let i = 0; i < 7; i++) {
            const gedachteH2 = document.getElementsByClassName('gedachte__h2')[i];
            const textarea = document.getElementsByClassName("textarea__figure")[i];

            gedachteH2.innerText = cardContent["cardContents"][i]["h2"];
            textarea.placeholder = cardContent["cardContents"][i]["textarea"];
        }
    }

    hiddenCards() {
        for (let i = 1; i < 7; i++) {
            const gedachteLi = document.getElementsByClassName("gedachte__li")[i];
            gedachteLi.style.display = "none";
        }
    }

    showCards(i) {
        const gedachteLi = document.getElementsByClassName("gedachte__li");
        gedachteLi[i + 1].style.display = "block";
    }

}

const gedachtes = new Gedachtes("body");
gedachtes.render();
gedachtes.getCardContent().then((cardContent) => {
    gedachtes.pickUpContent(cardContent);
});
gedachtes.hiddenCards();
gedachtes.modaal();
gedachtes.showModaal();

