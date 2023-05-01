class StoplichtMainRender{
    htmlElement;
    mainWrapper;

    constructor(){
        this.htmlElement = document.createElement("main");
        this.htmlElement.classList = "main";

        this.mainWrapper = document.createElement("ul");
        this.mainWrapper.classList = "main__wrapper";
        this.render();
    }

    render(){
        document.querySelector("body").appendChild(this.htmlElement);
        this.htmlElement.appendChild(this.mainWrapper);
    }
}

class StoplichtGezicht{
    id = "";
    name = "";
    mainWrapper;

    constructor(newId, newName,){
        this.id = newId
        this.name = newName;
        this.mainWrapper = document.getElementsByClassName("main__wrapper")[0];

        this.sectionWrapper = document.createElement("li");
        this.sectionWrapper.classList = "main__section--" + this.id;

        this.stoplichtSection = document.createElement("section")
        this.stoplichtSection.classList = "stoplicht--" + this.id;
        this.stoplichtSection.id = this.id

        this.stoplichtHeader = document.createElement("nav")
        this.stoplichtHeader.classList = "stoplicht__nav";

        this.stoplichtGevoel = document.createElement("article");
        this.stoplichtGevoel.classList = "stoplicht__article stoplicht__article--first";

        this.stoplichtGevoelText = document.createElement("h2");
        this.stoplichtGevoelText.classList = "stoplicht__h2";
        this.stoplichtGevoelText.innerText = this.name;
        this.stoplichtGevoelText.animationName = "popup";

        this.stoplichtGezicht = document.createElement("article");
        this.stoplichtGezicht.classList = "stoplicht__article stoplicht__article--second";

        this.stoplichtGezichtFigure = document.createElement("figure");
        this.stoplichtGezichtFigure.classList  = "stoplicht__gevoel";

        this.stoplichtGezichtImage = document.createElement("img");
        this.stoplichtGezichtImage.classList = "stoplicht__gezichtje";
        this.stoplichtGezichtImage.src = "/img/" + this.id + ".png";

        this.stoplichtClose = document.createElement("article");
        this.stoplichtClose.classList = "stoplicht__article stoplicht__article--third";

        this.stoplichtCloseButton = document.createElement("button")
        this.stoplichtCloseButton.classList = "stoplicht__closeButton";

        this.stoplichtCloseIcon = document.createElement("i");
        this.stoplichtCloseIcon.classList = "fa-solid fa-x stoplicht__icon";

        this.stoplichtForms = document.createElement("form");
        this.stoplichtForms.classList = "stoplicht__form";

        this.stoplichtFormContainer = document.createElement("article");
        this.stoplichtFormContainer.classList = "stoplicht__formContainer";

        this.stoplichtTextareaSignalen = document.createElement("textarea");
        this.stoplichtTextareaSignalen.classList = "stoplicht__textarea";
        this.stoplichtTextareaSignalen.placeholder = "Signalen / gewaardwordingen"

        this.stoplichtTextareaActie = document.createElement("textarea");
        this.stoplichtTextareaActie.classList = "stoplicht__textarea";
        this.stoplichtTextareaActie.placeholder = "Actie / Maatregelen"

        this.stoplichtSave = document.createElement("button")
        this.stoplichtSave.innerText = "save";
        this.stoplichtSave.classList = "stoplicht__save";

        this.stoplichtGezichtFigure.onclick = this.stoplichtGezichtFigureClicked;
        this.stoplichtCloseButton.onclick = this.stoplichtCloseButtonClicked;
        this.render()
    }

    stoplichtGezichtFigureClicked = () =>{
        this.stoplichtSection.style.animationName = "expandStoplicht";
        this.stoplichtGevoelText.style.animationName = "popup";
        this.stoplichtCloseButton.style.animationName = "popup";
        this.stoplichtForms.style.animationName = "formPopup";
        this.stoplichtForms.style.animationDelay = "1.2s";
        this.stoplichtForms.style.animationDuration = "1.2s";
    }

    stoplichtCloseButtonClicked = () =>{
        this.stoplichtSection.style.animationName = "closeStoplicht";
        this.stoplichtGevoelText.style.animationName = "popDown";
        this.stoplichtCloseButton.style.animationName = "popDown";
        this.stoplichtForms.style.animationName = "formDisapear";
        this.stoplichtForms.style.animationDelay = "0s";
        this.stoplichtForms.style.animationDuration = "0.2s";
    }

    render(){
        this.mainWrapper.appendChild(this.sectionWrapper);
        this.sectionWrapper.appendChild(this.stoplichtSection);
        this.stoplichtSection.appendChild(this.stoplichtHeader);
        this.stoplichtHeader.appendChild(this.stoplichtGevoel);
        this.stoplichtGevoel.appendChild(this.stoplichtGevoelText);
        this.stoplichtHeader.appendChild(this.stoplichtGezicht);
        this.stoplichtGezicht.appendChild(this.stoplichtGezichtFigure);
        this.stoplichtGezichtFigure.appendChild(this.stoplichtGezichtImage);
        this.stoplichtHeader.appendChild(this.stoplichtClose);
        this.stoplichtClose.appendChild(this.stoplichtCloseButton);
        this.stoplichtCloseButton.appendChild(this.stoplichtCloseIcon);
        this.stoplichtSection.appendChild(this.stoplichtForms);
        this.stoplichtForms.appendChild(this.stoplichtFormContainer);
        this.stoplichtFormContainer.appendChild(this.stoplichtTextareaSignalen);
        this.stoplichtFormContainer.appendChild(this.stoplichtTextareaActie);
        this.stoplichtForms.appendChild(this.stoplichtSave);
    }
}
const mainRender = new StoplichtMainRender("")
const groenStoplicht = new StoplichtGezicht("groen", "Goed", mainRender);
const geelStoplicht = new StoplichtGezicht("geel", "Twijfel", mainRender);
const oranjeStoplicht = new StoplichtGezicht("oranje", "Twijfel", mainRender);
const roodStoplicht = new StoplichtGezicht("rood", "Slecht", mainRender);

