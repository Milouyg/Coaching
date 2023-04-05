const calendar = document.getElementById("js--calendar");
const modal = document.querySelectorAll(".modal");
const dates = document.querySelectorAll('.dagboek__listitem'); 
const x = document.querySelectorAll('.modal__x'); 

dates.forEach(date => {
  date.addEventListener('click', function() {
    modal.forEach(modalItem => {
      modalItem.classList.add('modal--on');
    });
    calendar.style.display = "none";
  });
});

x.onclick = function(){
    modal.style.display = "none";
    calendar.style.display = "block"
}

  

var input = document.getElementById('saveServer').value;
localStorage.setItem('server', input);