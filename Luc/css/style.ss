*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 2rem;
}

body {
  flex-direction: column;
  font-family: "Open Sans", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, white, 70%, rgb(131, 195, 193));
}

@keyframes popup {
  0% {
    height: 16rem;
  }
  100% {
    height: 30rem;
  }
}
@keyframes popup--responsive {
  0% {
    height: 28rem;
  }
  100% {
    height: 35rem;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.vragen__main {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.vragen__main .vragen {
  margin: 4rem;
  border-radius: 2rem;
  border: 0.2rem solid;
  display: flex;
  flex-direction: column;
  border: 0.5rem solid rgb(131, 195, 193);
}
.vragen__main .vragen__uitleg {
  width: 70rem;
  height: 20rem;
  list-style: none;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  border-radius: 2rem 2rem 0 0;
  background: white;
}
.vragen__main .vragen__button {
  border: none;
  width: 20rem;
  height: 4rem;
  margin-bottom: 2rem;
  background: #51ABA9;
  color: white;
  border-top-left-radius: 1.8rem;
  border-bottom-right-radius: 1.8rem;
  transition: 0.4s all;
  font-size: 2rem;
}
.vragen__main .vragen__button:hover {
  border-top-left-radius: 0rem;
  border-bottom-right-radius: 0rem;
  border-top-right-radius: 1.8rem;
  border-bottom-left-radius: 1.8rem;
}
.vragen__main .vragen__vraag {
  width: 70rem;
  height: 16rem;
  list-style: none;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: white;
  flex-shrink: 1;
  color: black;
  border-bottom: 0.3rem solid rgb(131, 195, 193);
  opacity: 0.5;
}
.vragen__main .vragen__vraag:nth-of-type(41) {
  border-radius: 0 0 2rem 2rem;
}
.vragen__main .vragen__vraag--active {
  box-shadow: 0 0 1rem 0.5rem rgb(131, 195, 193);
  z-index: 1;
  position: relative;
  opacity: 1;
  height: 30rem;
  animation-name: popup;
  animation-duration: 0.3s;
}
.vragen__main .vragen__vraag--active .vragen__slider {
  display: flex;
  opacity: 1;
  animation-name: fade-in;
  animation-fill-mode: backwards;
  animation-delay: 0.3s;
  animation-duration: 0.5s;
}
.vragen__main .vragen__input--responsive {
  width: 20rem;
  height: 8rem;
  font-size: 200%;
  border-radius: 2rem;
  border: 0.3rem solid rgb(131, 195, 193);
  text-align: center;
  display: none;
}
.vragen__main .vragen__nummer {
  height: 10%;
  color: black;
}
.vragen__main .vragen__paragraaf {
  width: 100%;
  height: 30%;
  padding: 1rem;
}
.vragen__main .vragen__inhoud {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.vragen__main .vragen__slider {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: none;
  padding: 1rem;
  gap: 2rem;
  display: none;
  opacity: 0;
}
.vragen__main .vragen input {
  -webkit-appearance: none;
  height: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  background: rgb(131, 195, 193);
  border: 0.1rem solid rgba(0, 0, 0, 0.6);
}
.vragen__main .vragen input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: blue;
  color: blue;
}
.vragen__main .vragen input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: rgb(131, 195, 193);
  cursor: pointer;
  margin-top: -14px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.vragen__main .vragen input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: rgb(131, 195, 193);
  cursor: pointer;
}
.vragen__main .vragen input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: rgb(131, 195, 193);
  cursor: pointer;
}
.vragen__main .vragen__sliderNumbers {
  display: flex;
  justify-content: space-between;
  list-style: none;
  font-size: 70%;
}

.chart1 {
  height: 50rem;
  aspect-ratio: 1;
}

.modal__section {
  margin: 0 auto;
  box-shadow: 0 0 1rem 1rem rgb(131, 195, 193);
  width: 60rem;
  height: 60rem;
  border-radius: 2.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 50%;
  transform: translate(-50%, 27%);
  overflow-y: scroll;
  background: white;
}

.modal__button {
  border: none;
  width: 20rem;
  height: 4rem;
  margin-bottom: 2rem;
  background: #51ABA9;
  color: white;
  border-top-left-radius: 1.8rem;
  border-bottom-right-radius: 1.8rem;
  transition: 0.4s all;
  font-size: 2rem;
}
.modal__button:hover {
  border-top-left-radius: 0rem;
  border-bottom-right-radius: 0rem;
  border-top-right-radius: 1.8rem;
  border-bottom-left-radius: 1.8rem;
}

.modal__uitleg {
  width: 100%;
  font-size: 100%;
  text-align: center;
}

.modal__li {
  padding: 0rem 1rem;
  font-size: 85%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  width: 100%;
  border: 0.2rem solid rgb(131, 195, 193);
  border-radius: 1rem;
  padding: 1.5rem;
}

.modal__vraag {
  width: 90%;
  font-size: 120%;
}

.modal__wrapperNumber {
  padding: 2rem;
  width: 2rem;
  height: 2rem;
}

.modal__number {
  color: red;
}

.modal__wrapper {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__input {
  appearance: none;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid currentColor;
  border-radius: 0.15rem;
  transform: translateY(-0.075rem);
  border-radius: 0.5rem;
}
.modal__input:checked {
  background: rgb(131, 195, 193);
}
.modal__input::before {
  content: "";
  width: 1rem;
  height: 1rem;
  transform: scale(0);
  transition: 120ms trasform ease-in-out;
  box-shadow: inset 1rem 1rem rgb(131, 195, 193);
}
.modal__input:checked::before {
  transform: scale(1);
}

.vragen__buttonWrapper {
  height: 10rem;
  width: 100%;
}

@media screen and (max-width: 59.375rem) {
  .vragen {
    width: 95%;
  }
  .vragen__main {
    width: 100vw;
  }
  .vragen__vraag {
    width: 100%;
  }
}

/*# sourceMappingURL=style.ss.map */