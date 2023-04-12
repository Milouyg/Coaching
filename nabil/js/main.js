document.addEventListener("DOMContentLoaded", function() {
  const listItems = document.querySelectorAll(".dagboek__listitem");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const saveButton = document.querySelector(".modal__save");
  const cancelButton = document.querySelector(".modal__cancel");
  const input1 = document.querySelector("#modal__input1");
  const input2 = document.querySelector("#modal__input2");
  const input3 = document.querySelector("#modal__input3");
  const prevMonthButton = document.querySelector(".dagboek__selectli--first");
  const nextMonthButton = document.querySelector(".dagboek__selectli--third");
  const monthName = document.querySelector(".dagboek__selectli--second");
  let currentMonth = new Date().getMonth();

  function generateDates(month) {
    const dateList = document.querySelector(".dagboek__list");
    dateList.innerHTML = "";

    const daysInMonth = new Date(new Date().getFullYear(), month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(new Date().getFullYear(), month, i);
      const listItem = document.createElement("li");
      listItem.classList.add("dagboek__listitem");
      listItem.innerHTML = `<div class="dagboek__dag">${i}</div>`;
      dateList.appendChild(listItem);

      listItem.addEventListener("click", () => {
        showModal(listItem);
      });
    }

    monthName.textContent = currentMonthName();
  }

  function showModal(listItem) {
    const date = listItem.querySelector(".dagboek__dag").textContent;
    modal.querySelector(".modal__date").textContent = date + " " + currentMonthName();
    modal.classList.add("show");
    overlay.classList.add("show");

    const savedData = JSON.parse(localStorage.getItem(`data-${date}-${currentMonth}`));
    if (savedData) {
      input1.value = savedData.input1;
      input2.value = savedData.input2;
      input3.value = savedData.input3;
    } else {
      input1.value = "";
      input2.value = "";
      input3.value = "";
    }
  }

  function saveData() {
    const date = modal.querySelector(".modal__date").textContent.split(" ")[0];
    const data = {
      input1: input1.value,
      input2: input2.value,
      input3: input3.value
    };
    localStorage.setItem(`data-${date}-${currentMonth}`, JSON.stringify(data));
    closeModal();
  }

  function closeModal() {
    input1.value = "";
    input2.value = "";
    input3.value = "";
    modal.classList.remove("show");
    overlay.classList.remove("show");
  }

  function currentMonthName() {
    const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    const year = new Date().getFullYear();
    return months[currentMonth] + " " + year;
  }

  function prevMonth() {
    if (currentMonth > 0) {
      currentMonth--;
    } else {
      currentMonth = 11;
    }
    generateDates(currentMonth);
  }

  function nextMonth() {
    if (currentMonth < 11) {
      currentMonth++;
    } else {
      currentMonth = 0;
    }
    generateDates(currentMonth);
  }

  prevMonthButton.addEventListener("click", prevMonth);
  nextMonthButton.addEventListener("click", nextMonth);
  saveButton.addEventListener("click", saveData);
  cancelButton.addEventListener("click", closeModal);

  generateDates(currentMonth);
});
