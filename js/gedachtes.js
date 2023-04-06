class Gedachtes {
    // Kaartjes
    placeToRender;
    gedachteMain;
    gedachteUitleg;
    gedachtesSection;
    gedachtesUl;
    gedachteLi;
    gedachteFigure;
    gedachteH2;
    gedachteButton;
    gedachteFigureTextarea;
    gedachteTextarea;
    gedachteInput

    // Content in Json
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

        this.gedachteMain = document.createElement("main");
        this.gedachteMain.classList = "gedachtes__main";

        this.gedachteUitleg = document.createElement("p");
        this.gedachteUitleg.classList = "gedachteUitleg";
        this.gedachteUitleg.innerText = "Vul de gegevens in en wanneer je klaar bent druk je met je muis ergens anders op dan het vakje, dan verschijnt het tweede kaartje";

        this.gedachtesSection = document.createElement("section");
        this.gedachtesSection.classList = "gedachtes__section";

        this.gedachtesUl = document.createElement("ul");
        this.gedachtesUl.classList = "gedachtes__ul";
    }

    generateCards(amount) {
        for (let i = 0; i < amount; i++) {
            if (i < amount - 1) {
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
            else {
                this.gedachteLi = document.createElement("li");
                this.gedachteLi.classList = "gedachte__li";
                this.gedachteLi.setAttribute("id", i);
                this.gedachteLi.style.display = "none";
                this.gedachteLi.animation = "gedachtePopup";

                this.gedachteFigureHeader = document.createElement("figure");
                this.gedachteFigureHeader.classList = "gedachte__figure__head";

                this.gedachteH2 = document.createElement("h2");
                this.gedachteH2.classList = "gedachte__h2";
                this.gedachteH2.innerText = "Download antwoorden";

                this.gedachteFigureBody = document.createElement("figure");
                this.gedachteFigureBody.classList = "gedachte__figure__body";

                this.gedachteP = document.createElement("p");
                this.gedachteP.classList = "gedachteP"; 
                this.gedachteP.innerText = "Dank u wel voor het invullen, hier kunt u uw gegevens downloaden in een txt bestand";

                this.gedachteDownloadBtn = document.createElement("button");
                this.gedachteDownloadBtn.classList = "gedachte__downloadBtn";
                this.gedachteDownloadBtn.innerText = "Download hier";

                this.gedachtesUl.appendChild(this.gedachteLi);
                this.gedachteLi.appendChild(this.gedachteFigureHeader);
                this.gedachteFigureHeader.appendChild(this.gedachteH2);
                this.gedachteLi.appendChild(this.gedachteFigureBody);
                this.gedachteFigureBody.appendChild(this.gedachteP);
                this.gedachteFigureBody.appendChild(this.gedachteDownloadBtn);
                this.gedachteDownloadBtn.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.downloadFileInTxt();
                });
            }
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
        this.modaalP = document.createElement("p");
        this.modaalP.classList = "modaalP";

        this.placeToRender.appendChild(this.modaalFigure);
        this.modaalFigure.appendChild(this.modaalHeader);
        this.modaalHeader.appendChild(this.modaalH2);
        this.modaalHeader.appendChild(this.modaalButton);
        this.modaalFigure.appendChild(this.modaalP);
    }

    render(cardContent) {
        this.placeToRender.appendChild(this.gedachteMain);
        this.gedachteMain.appendChild(this.gedachteUitleg);
        this.gedachteMain.appendChild(this.gedachtesSection);
        this.gedachtesSection.appendChild(this.gedachtesUl);
        this.generateCards(cardContent.length + 1);
        this.modaal();

        const textarea = document.getElementsByClassName("textarea__figure");
        for (let i = 0; i < cardContent.length; i++) {
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

                    this.gedachteMain.style.filter = "blur(2px)";
                });
            });

            gedachteButtonX[0].addEventListener("click", (event) => {
                event.preventDefault();
                this.modaalFigure.classList.toggle("modaal__figure--show");
                this.gedachteMain.style.filter = "blur(0px)";
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
        return this.cardContent["cardContents"];
    }

    pickUpContent(cardContent) {
        for (let i = 0; i < cardContent.length; i++) {
            const gedachteH2 = document.getElementsByClassName('gedachte__h2')[i];
            const textarea = document.getElementsByClassName("textarea__figure")[i];

            gedachteH2.innerText = cardContent[i]["h2"];
            textarea.placeholder = cardContent[i]["textarea"];
        }
    }

    hiddenCards(cardContent) {
        for (let i = 1; i < cardContent.length; i++) {
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

    exampleCard(cardContent, i) {
        this.modaalP.innerText = cardContent[i]["question"];
    }

    downloadFileInTxt() {
        const link = document.createElement("a");
        const h2 = document.querySelectorAll("h2");
        const textareas = document.querySelectorAll("textarea");
        let textContent = "";
        for (let i = 0; i < textareas.length; i++) {
            textContent += h2[i].innerText + "\n";
            textContent += textareas[i].value + "\n \n";
        }
        const file = new Blob([textContent], { type: "text/plain" });
        link.href = URL.createObjectURL(file);
        link.download = "test.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    }

}

const gedachtes = new Gedachtes("body");
gedachtes.getCardContent().then((cardContent) => {
    gedachtes.render(cardContent);
    gedachtes.pickUpContent(cardContent);
    gedachtes.hiddenCards(cardContent);
});





