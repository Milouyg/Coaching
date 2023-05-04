class Calendar {
  dagboekSection;
  dagboekArticle;
  dagboekH1;
  dagboekUl;
  dagboekLiFirst;
  dagboekLiSecond;
  dagboekLiThird;
  dagboekList;
  placeToRenderCalendar;
  currentMonth;
  dagboekSection;

  placeToRenderModal;
  modalSection;
  modalContent;
  modalSave;
  modalDate;
  modalForm;
  modalWrap1;
  modalLabel1;
  modalInput1;
  modalWrap2;
  modalLabel2;
  modalInput2;
  modalWrap3;
  modalLabel3;
  modalInput3;

  generateDates(month) {
    const dateList = this.dagboekList;
    dateList.innerHTML = "";

    const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();
    this.currentMonth = month;
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(new Date().getFullYear(), month, i);
      const listItem = document.createElement("li");
      listItem.classList.add("dagboek__listitem");
      listItem.innerHTML = `<div class="dagboek__dag">${i}</div>`;
      dateList.appendChild(listItem);

      listItem.addEventListener("click", () => {
        this.showModal(listItem);
      });
    }

    this.dagboekLiSecond.textContent = this.currentMonthName();
  }

  currentMonthName = () => {
    const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    const year = new Date().getFullYear();
    return months[this.currentMonth] + " " + year;
  }

  constructor(placeToRenderCalendar) {

    this.currentMonth = new Date().getMonth();

    this.placeToRenderCalendar = document.getElementsByTagName(placeToRenderCalendar)[0];
    this.dagboekSection = document.createElement("section");
    this.dagboekSection.classList = "dagboek";

    this.dagboekArticle = document.createElement("article");
    this.dagboekArticle.classList = "dagboek__container";

    this.dagboekH1 = document.createElement("h1");
    this.dagboekH1.classList = "dagboek__heading";
    this.dagboekH1.innerText = "Succesdagboek Kalender";

    this.dagboekUl = document.createElement("ul");
    this.dagboekUl.classList = "dagboek__select";

    this.dagboekLiFirst = document.createElement("li");
    this.dagboekLiFirst.classList = "dagboek__selectli dagboek__selectli--first";
    this.dagboekLiFirst.innerText = "<";

    this.dagboekLiSecond = document.createElement("li");
    this.dagboekLiSecond.classList = "dagboek__selectli dagboek__selectli--second";
    this.dagboekLiSecond.innerText = "April 2023";

    this.dagboekLiThird = document.createElement("li");
    this.dagboekLiThird.classList = "dagboek__selectli dagboek__selectli--third";
    this.dagboekLiThird.innerText = ">";

    this.dagboekList = document.createElement("ul");
    this.dagboekList.classList = "dagboek__list";

    this.modalSection = document.createElement("section");
    this.modalSection.classList = "modal";

    this.modalContent = document.createElement("article");
    this.modalContent.classList = "modal__content";


    this.modalSave = document.createElement("button");
    this.modalSave.classList = "modal__save";
    this.modalSave.innerText = "x";

    this.modalDate = document.createElement("h2");
    this.modalDate.classList = "modal__date";

    this.modalForm = document.createElement("form");
    this.modalForm.classList = "modal__form";

    this.modalInput1 = document.createElement("input");
    this.modalInput1.classList = "modal__input";
    this.modalInput1.setAttribute("name", "modal__input1");
    this.modalInput1.setAttribute("type", "text");
    this.modalInput1.setAttribute("id", "modal__input1");


    this.modalInput2 = document.createElement("input");
    this.modalInput2.classList = "modal__input";
    this.modalInput2.setAttribute("name", "modal__input2");
    this.modalInput2.setAttribute("type", "text");
    this.modalInput2.setAttribute("id", "modal__input2");

    this.modalInput3 = document.createElement("input");
    this.modalInput3.classList = "modal__input";
    this.modalInput3.setAttribute("name", "modal__input3");
    this.modalInput3.setAttribute("type", "text");
    this.modalInput3.setAttribute("id", "modal__input3");

    this.modalLabel1 = document.createElement("label");
    this.modalLabel1.setAttribute("for", "modal__Input1");
    this.modalLabel1.innerText = "succes 1";

    this.modalLabel2 = document.createElement("label");
    this.modalLabel2.setAttribute("for", "modal__Input2");
    this.modalLabel2.innerText = "succes 2";

    this.modalLabel3 = document.createElement("label");
    this.modalLabel3.setAttribute("for", "modal__Input3");
    this.modalLabel3.innerText = "succes 3";


    this.modalWrap1 = document.createElement("div");
    this.modalWrap1.classList = "modal__wrap1";

    this.modalWrap2 = document.createElement("div");
    this.modalWrap2.classList = "modal__wrap2";

    this.modalWrap3 = document.createElement("div");
    this.modalWrap3.classList = "modal__wrap3";



    //   for(let i = 0; i < 3; i++){
    //     this.modalWrap = document.createElement("div");
    //     this.modalWrap.classList = "modal__wrap";

    //     const elementIds = ["modal__input1", "modal__input2", "modal__input3"];
    //     this.modalLabel = document.createElement("label");
    //     this.modalLabel.setAttribute("for", elementIds[i]);
    //     this.modalLabel.innerText =  `succes ${i+1}`;

    //     this.modalInput = document.createElement("input");
    //     this.modalInput.classList = "modal__input";
    //     this.modalInput.setAttribute("name", `modal__input${i+1}`);
    //     this.modalInput.setAttribute("type", "text");
    //     this.modalInput.setAttribute("id", elementIds[i]);

    //     this.modalForm.appendChild(this.modalWrap);

    //     this.modalWrap.appendChild(this.modalLabel);
    //     this.modalForm.appendChild(this.modalInput);


    // }



    this.currentMonth = new Date().getMonth();
    this.generateDates(this.currentMonth);


    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.saveData = this.saveData.bind(this);

    this.dagboekLiThird.addEventListener("click", () => this.nextMonth());
    this.dagboekLiFirst.addEventListener("click", () => this.prevMonth());
    this.modalSave.addEventListener("click", () => this.saveData());
  }


  saveData = () => {
    const date = this.modalDate.textContent.split(" ")[0];
    const data = {
      modalInput1: this.modalInput1.value,
      modalInput2: this.modalInput2.value,
      modalInput3: this.modalInput3.value
    };
    localStorage.setItem(`data-${date}-${this.currentMonth}`, JSON.stringify(data));
    this.closeModal();
  }


  closeModal = () => {
    this.modalInput1.value = null;
    this.modalInput2.value = null;
    this.modalInput3.value = null;
    this.modalSection.classList.remove("show");
  }



  nextMonth = () => {
    if (this.currentMonth < 11) {
      this.currentMonth++;
    } else {
      this.currentMonth = 0;
    }
    this.generateDates(this.currentMonth);
    this.dagboekLiSecond.textContent = this.currentMonthName();
  }

  prevMonth = () => {
    if (this.currentMonth > 0) {
      this.currentMonth--;
    } else {
      this.currentMonth = 11;
    }
    this.generateDates(this.currentMonth);
    this.dagboekLiSecond.textContent = this.currentMonthName();
  }



  showModal(listItem) {
    const date = listItem.textContent;
    const data = {
      modalInput1: this.modalInput1.value,
      modalInput2: this.modalInput2.value,
      modalInput3: this.modalInput3.value
    };

    this.modalDate.textContent = date + " " + this.currentMonthName();
    this.modalSection.classList.add("show");

    const savedData = JSON.parse(localStorage.getItem(`data-${date}-${this.currentMonth}`));
    if (savedData) {
      this.modalInput1.value = savedData.modalInput1;
      this.modalInput2.value = savedData.modalInput2;
      this.modalInput3.value = savedData.modalInput3;
    } else {
      this.modalInput1.value = null;
      this.modalInput2.value = null;
      this.modalInput3.value = null;
    }
  }


  render() {
    this.dagboekSection.appendChild(this.dagboekArticle);
    this.dagboekArticle.appendChild(this.dagboekH1);
    this.dagboekArticle.appendChild(this.dagboekUl);
    this.dagboekArticle.appendChild(this.dagboekList);
    this.dagboekUl.appendChild(this.dagboekLiFirst);
    this.dagboekUl.appendChild(this.dagboekLiSecond);
    this.dagboekUl.appendChild(this.dagboekLiThird);
    this.modalSection.appendChild(this.modalContent);
    this.modalContent.appendChild(this.modalForm);
    this.modalForm.appendChild(this.modalWrap1);
    this.modalWrap1.appendChild(this.modalLabel1);
    this.modalForm.appendChild(this.modalInput1);
    this.modalForm.appendChild(this.modalWrap2);
    this.modalWrap2.appendChild(this.modalLabel2);
    this.modalForm.appendChild(this.modalInput2);
    this.modalForm.appendChild(this.modalWrap3);
    this.modalWrap3.appendChild(this.modalLabel3);
    this.modalForm.appendChild(this.modalInput3);
    this.modalContent.appendChild(this.modalSave);
    this.modalContent.appendChild(this.modalDate);
    this.modalContent.appendChild(this.modalForm);
    this.placeToRenderCalendar.appendChild(this.dagboekSection);
    this.placeToRenderCalendar.appendChild(this.modalSection);
  }
}


class App {
  constructor() {
    this.calendar = new Calendar("body");
    this.calendar.render();

  }
}

class LocalStorageSpaceChecker {
  constructor() {
    this.maxSize = 5 * 1024 * 1024; // 5 MB
  }

  get usedSpace() {
    let used = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length * 2;
      }
    }
    return used;
  }

  get availableSpace() {
    return this.maxSize - this.usedSpace;
  }

  get availableSpaceInMB() {
    return (this.availableSpace / (1024 * 1024)).toFixed(2) + " MB";
  }
}

const localStorageSpaceChecker = new LocalStorageSpaceChecker();
console.log(localStorageSpaceChecker.usedSpace);



const app = new App();