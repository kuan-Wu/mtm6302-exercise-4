const counterName = document.getElementById('counter_name');
const counterDate = document.getElementById('counter_date');
const counterTime = document.getElementById('counter_time');
const counterHeader = document.getElementById('counter_header');
const counterForm = document.myForm;
const idDays = document.getElementById('days');
const idHours = document.getElementById('hours');
const idMinutes = document.getElementById('minutes');
const idSeconds = document.getElementById('seconds');
const currentDate = document.getElementById('current_date');
let countdown;


counterForm.addEventListener("submit", function(e) {
  e.preventDefault();
  clearInterval(countdown);
  const myDate = counterDate.value;
  const myName = counterName.value;
  const myTime = counterTime.value;
  prepareCounter(createDate(myDate, myTime));
  countdown = setInterval(function() {
    prepareCounter(createDate(myDate, myTime))
  }, 1000);
  counterDate.value = '';
  counterName.value = '';
  counterTime.value = '00:00';
  localStorage.setItem("date", myDate);
  localStorage.setItem("time", myTime);
  localStorage.setItem("name", myName);
  let currentText = `Enter your date (Current Date: ${myDate} ${myTime})`;
  currentDate.textContent = currentText;
  counterHeader.textContent = myName;
});

function createCounter(ms) {
  let seconds = ms / 1000;
  const days = parseInt(seconds / 86400);
  seconds = seconds % 86400;
  const hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = parseInt(seconds / 60);
  seconds = Math.round(seconds % 60);
  //const hour = Math.floor(beforeSec / 60 / 60) % 24;
  //const days = Math.floor(beforeSec / 60 / 60 / 24);
  updateCounter(days, hours, minutes, seconds);
};

function updateCounter(days, hours, minutes, seconds) {
  idDays.removeChild(idDays.firstChild);
  idDays.appendChild(createSpan(days));
  idHours.removeChild(idHours.firstChild);
  idHours.appendChild(createSpan(hours));
  idMinutes.removeChild(idMinutes.firstChild);
  idMinutes.appendChild(createSpan(minutes));
  idSeconds.removeChild(idSeconds.firstChild);
  idSeconds.appendChild(createSpan(seconds));
};

function createSpan(textInput) {
  let x = document.createElement('SPAN');
  x.className = "white bg-black";
  let y = document.createTextNode(`${textInput}`);
  x.appendChild(y);
  return x;
};

function prepareCounter(dateValue) {
  const myDate = new Date(dateValue);
  const difference = myDate - Date.now();
  if(difference <= 0) {
    clearInterval(countdown);
    updateCounter(0, 0, 0, 0);
    currentDate.textContent = "Enter your date";
    alert("Timer over");
  }
  else {
    createCounter(difference);
  }
};

function createDate(dateString, timeString) {
  const newDate = new Date(dateString);
  const myTimeArray = timeString.split(":");
  newDate.setHours(myTimeArray[0]);
  newDate.setMinutes(myTimeArray[1]);
  return newDate;
};

window.onload = function() {
  let myDateString = localStorage.getItem("date");
  let myName = localStorage.getItem("name");
  let myTime = localStorage.getItem("time");
  let myDate = createDate(myDateString, myTime);
  let now = Date.now()
  let myCurrentDifference =  myDate - now;
  console.log({myCurrentDifference})
  if(myDateString != null && myCurrentDifference > 0) {
    countdown = setInterval(function() {
      prepareCounter(myDate);
    }, 1000);
    let currentText = document.createTextNode(` (Current Date: ${myDateString})`);
    currentDate.appendChild(currentText);
    counterHeader.textContent = myName;
  }
  counterTime.value = "00:00";
};
