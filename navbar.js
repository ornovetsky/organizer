const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// const dayUnsel = document.getElementsByClassName("day-unsel");
const noteBtn = document.getElementById("nav-notes")
const filterPlus = document.getElementById("nav-filter")
const line = document.getElementsByClassName("line")[0]

const dayUnsel = document.querySelectorAll(".day-unsel")
const ContainerOrganizer = document.getElementsByClassName("container-organizer-inside")[0]
const date = new Date();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

let currentMonth = date.getMonth()
let currentYear = date.getFullYear()
let today = date.getDate()

// display current month that is selected, default - today
const displayMonth = document.querySelector(".month")
displayMonth.innerHTML = months[currentMonth] + ' ' + currentYear.toString()



// switch notes Mode from days to blocks
  function noteMode() {
  if (days != '') {
    days = ''
    ContainerOrganizer.innerHTML = `
 <div class="note-container">
 </div>
 `
    line.style.display = "none"
    filterPlus.innerHTML = `<p class="text">+</p>`
    noteBtn.innerHTML = `<i class="fas fa-list-ul"></i>`
    displayMonth.innerHTML = "&nbsp;&nbsp;Your Notes"
    nextMonth.style.visibility = "hidden"
    prevMonth.style.visibility = "hidden"
    renderStickers()

  } else {
    renderNotes()
    line.style.display = ""
    filterPlus.innerHTML = `<i class="fas fa-filter"></i>`
    noteBtn.innerHTML = `<i class="far fa-sticky-note"></i>`
    displayMonth.innerHTML = months[currentMonth] + ' ' + currentYear.toString()
    nextMonth.style.visibility = ""
    prevMonth.style.visibility = ""
  }
}

///////////////////////////////////// N A V B A R  ////////////////////////////////////
//Change current month
const nextMonth = document.getElementById('nav-month-next')
nextMonth.addEventListener('click', () => {
  if (currentMonth < 11) {
    currentMonth++
    displayMonth.innerHTML = months[currentMonth] + ' ' + currentYear.toString()
    renderNotes()
  } else {
    currentMonth = 0
    currentYear++
    displayMonth.innerHTML = months[currentMonth] + ' ' + currentYear.toString()
    renderNotes()
  }
})

const prevMonth = document.getElementById('nav-month-prev')
prevMonth.addEventListener('click', () => {
  if (currentMonth > 0) {
    currentMonth--
    displayMonth.innerHTML = months[currentMonth] + ' ' + currentYear.toString()
    renderNotes()
  } else {
    currentMonth = 11
    currentYear--
    displayMonth.innerHTML = currentYear.toString().slice(2, 4) + ' ' + months[currentMonth]

    renderNotes()
  }
})
