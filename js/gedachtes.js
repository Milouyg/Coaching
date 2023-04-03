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
    modaalH2;
    modaalButton;
    modaalP;

    // Kaart animatie
    animation;

    constructor(placeToRender) {
        // We pakken hier de html body element
        this.placeToRender = document.getElementsByTagName(placeToRender)[0];

        this.gedachtesForm = document.createElement("form");
        this.gedachtesForm.classList = "gedachtes__form";
        // this.gedachtesForm.setAttribute("method", "POST" );
        // this.gedachtesForm.setAttribute("action", "../components/mail.php");

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
            this.gedachteLi.animation = "gedachtePopup";

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
        this.modaalH2 = document.createElement("h2");
        this.modaalH2.classList = "modaal__h2";
        this.modaalH2.innerText = "Voorbeeld";
        this.modaalButton = document.createElement("button");
        this.modaalButton.classList = "modaal__button";
        this.modaalButton.innerText = "X";
        this.modaalP = document.createElement("p")
        this.modaalP.classList = "modaalP";

        this.placeToRender.appendChild(this.modaalFigure);
        this.modaalFigure.appendChild(this.modaalHeader);
        this.modaalHeader.appendChild(this.modaalH2);
        this.modaalHeader.appendChild(this.modaalButton);
        this.modaalFigure.appendChild(this.modaalP);
    }

    render() {
        this.placeToRender.appendChild(this.gedachtesForm);
        this.gedachtesForm.appendChild(this.gedachtesSection);
        this.gedachtesSection.appendChild(this.gedachtesUl);
        this.generateCards(7);
        this.modaal();

        const textarea = document.getElementsByClassName("textarea__figure");
        for (let i = 0; i < 7; i++) {
            textarea[i].addEventListener("blur", () =>
                this.showCards(i)
            );

            const gedachteButtonQuestion = document.getElementsByClassName("gedachte__question");
            const gedachteButtonX = document.getElementsByClassName("modaal__button");

            gedachteButtonQuestion[i].addEventListener("click", (event) => {
                event.preventDefault();
                this.modaalFigure.classList.toggle("modaal__figure--show");

                this.getCardContent().then((cardContent) => {
                    this.exampleCard(cardContent, i);

                    this.gedachtesForm.style.filter= "blur(2px)";
                });
            });
            
            gedachteButtonX[0].addEventListener("click", (event) => {
                event.preventDefault();
                this.modaalFigure.classList.toggle("modaal__figure--show");

                this.gedachtesForm.style.filter= "blur(0px)";
            });
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
        gedachteLi[i + 1].style.animation = "gedachtePopup";
        gedachteLi[i + 1].style.animationDuration = ".6s";
    }

    exampleCard(cardContent, i){
            this.modaalP.innerText = cardContent["cardContents"][i]["question"];
    }

}

const gedachtes = new Gedachtes("body");
gedachtes.render();
gedachtes.getCardContent().then((cardContent) => {
    gedachtes.pickUpContent(cardContent);
});
gedachtes.hiddenCards();



