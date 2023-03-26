class Gedachtes {
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

            this.gedachteH2 = document.createElement("gedachte__h2");
            this.gedachteH2.classList = "gedachte__h2";

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

    render() {
        this.placeToRender.appendChild(this.gedachtesForm);
        this.gedachtesForm.appendChild(this.gedachtesSection);
        this.gedachtesSection.appendChild(this.gedachtesUl);
        this.generateCards(7);
    }
}

class getJson{
    url = "";
    data = null;

    constructor(url){
        this.url = url;
    }

    async getData(){
        {
            await fetch(this.url)
            .then(function(response){
            return response.json();
            }).then((data) =>{
                this.data = data;
            })
        }
        return this.data;
    }

}

const gedachtes = new Gedachtes("body");
gedachtes.render();

const gedachteJson = new getJson("../data/gedachtes.json");
gedachteJson.getData().then(function(data){console.log(data)});

