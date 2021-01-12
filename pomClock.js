const timer = document.getElementById('timer');
const play = document.getElementById('play-pause')
const stop = document.getElementById('stop-done')
const pomodoroCounter = document.getElementById('tomato')
const pomodoroCounterInside = document.querySelector('.pomodoro-counter-inside')
const dayWeek = document.getElementById('day')
const clock = document.getElementById('clock')
const clockInside = document.querySelector('.clock-inside')
let pomDateToday = 'POM-' + date.getFullYear() + '-' + currentMonth + '-' + today
let intervalID
let minute = 24;
let sec = 60;
pomNumber = 0;
play.addEventListener('click', playPause)
stop.addEventListener('click', stopComplete)

if (localStorage.getItem(pomDateToday)) {
  pomodoroCounter.innerHTML = localStorage.getItem(pomDateToday)
}

function incrementPom() {
  let a = localStorage.getItem(pomDateToday)
  localStorage.setItem(pomDateToday, ++a)
  pomodoroCounter.innerHTML = a
  renderPomAmount(pomDateToday)
  playPause()
  renderNotes()
  noteExpand(today)
}

function stopComplete() {
  // incrementing pomodoro amount if clicked Check, and re-rendering the entire notes list
  if (stop.innerHTML === '<i class="fas fa-check"></i>') {
    incrementPom()
  }
  minute = 24
  sec = 60
  timer.innerHTML = '25:00'
  stop.innerHTML = '<i class="fas fa-stop"></i>'
}
function playPause() {
  if (intervalID === undefined) {
    if (!localStorage.getItem(pomDateToday)) {
      localStorage.setItem(pomDateToday, '0')
    }
    play.innerHTML = '<i class="fas fa-pause"></i>'
    stop.innerHTML = '<i class="fas fa-check"></i>'
    intervalID = setInterval(function () {
      sec--;
      if (sec == 00) {
        minute--;
        sec = 60;
        if (minute == 0) {
          // TIMER ENDS
          minute = 24;
          timer.innerHTML = '25:00'
          incrementPom()
        }
      }
      if (sec === 60) {
        timer.innerHTML = minute + ':' + '59';
      }
      if (sec < 10) {
        timer.innerHTML = minute + ':' + '0' + sec;
      } else {
        timer.innerHTML = minute + ':' + sec;
      }
    }, 1000);
  } else {  // останавливаю интервал. собираю минуты+секунды в глобал вариабле
    // при нажатии check нужно инкрементировать помодор и сделать стоп.
    clearInterval(intervalID)
    intervalID = undefined
    play.innerHTML = '<i class="fas fa-play"></i>'
    stop.innerHTML = '<i class="fas fa-stop"></i>'
  }
}

// clock 
const hourHand = document.querySelector('.hand-hour');
const minuteHand = document.querySelector('.hand-minute');
const clockDate = document.getElementById('date')
clockDate.innerHTML = today + '-' + currentMonth + '-' + date.getFullYear()

function getTime() {
  const now = new Date();
  const minutes = now.getMinutes();
  const minutesDegree = (((minutes / 60) * 360) + 90);
  minuteHand.style.transform = `rotate(${minutesDegree}deg)`
  const hours = now.getHours();
  const hoursDegree = (((hours / 12) * 360) + 90);
  hourHand.style.transform = `rotate(${hoursDegree}deg)`

}

setInterval(getTime, 1000);

clockInside.addEventListener('mouseover', () => {
  hourHand.style.visibility = 'hidden'
  minuteHand.style.visibility = 'hidden'
  clockDate.style.visibility = 'visible'
})

clockInside.addEventListener('mouseout', () => {
  hourHand.style.visibility = 'visible'
  minuteHand.style.visibility = 'visible'
  clockDate.style.visibility = 'hidden'
})

// day of week on pomodoro counter
var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getDay()];

dayWeek.innerHTML = n.slice(0,2)
pomodoroCounterInside.addEventListener('mouseover', () => {
  pomodoroCounter.style.display = 'none'
  dayWeek.style.display = 'inline'
})

pomodoroCounterInside.addEventListener('mouseout', () => {
  pomodoroCounter.style.display = 'inherit'
  dayWeek.style.display = 'none'
})