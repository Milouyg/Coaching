const groenText = document.getElementById("groenText");
const groenCross = document.getElementById("groenCross");
const stoplichtForms = document.getElementById("js--stoplichtForms");

function openModal(name) {
    const modalname = name;
    modalname.style.animationName = "expandStoplicht";
    groenText.style.animationName = "popup";
    groenCross.style.animationName = "popup";
    stoplichtForms.style.animationName = "formPopup";
    stoplichtForms.style.animationDelay = "1.2s";
    stoplichtForms.style.animationDuration = "1.2s";
}

function closeModal(name) {
    const modalname = name;
    modalname.style.animationName = "closeStoplicht";
    groenText.style.animationName = "popDown";
    groenCross.style.animationName = "popDown";
    stoplichtForms.style.animationName = "formDisapear";
    stoplichtForms.style.animationDelay = "0s";
    stoplichtForms.style.animationDuration = "0.2s";
}