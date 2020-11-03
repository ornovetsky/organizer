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
const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()

let currentMonth = date.getMonth()
let currentYear = date.getFullYear()

// display current month that is selected, default - today
const displayMonth = document.querySelector(".month")
displayMonth.innerHTML = currentYear.toString().slice(2,4) + ' ' + months[currentMonth]



// switch notes Mode from days to blocks
function noteMode(){
  if(days != ''){
 ContainerOrganizer.innerHTML = `
 <div class="note-container">
 </div>
 `
 document.querySelector(".note-container").innerHTML = notes
 line.style.display = "none"
 filterPlus.innerHTML = `<p class="text">+</p>`
 noteBtn.innerHTML = `<i class="fas fa-list-ul"></i>`
 displayMonth.innerHTML = "&nbsp;&nbsp;Your Notes"
 nextMonth.style.visibility = "hidden"
 prevMonth.style.visibility = "hidden"

 days = ''
  } else {
    renderNotes()
    line.style.dis
    play = ""
    filterPlus.innerHTML = `<i class="fas fa-filter"></i>`
    noteBtn.innerHTML = `<i class="far fa-sticky-note"></i>`
    displayMonth.innerHTML = currentYear.toString().slice(2,4) + ' ' + months[currentMonth]
    nextMonth.style.visibility = ""
    prevMonth.style.visibility = ""
  }
}

// note Creating function. Each note has to have a unique ID. Buttons within function have to access this id/number.
//Has to be an array. to be able to move the notes around. Have to be able to select notes by ID-numbr 

let notesArr1 = [`<div class="note">
<textarea style="resize: none;" name="" id="" cols="30" rows="10"></textarea>
<div class="buttons-container">
  <div class="btn-nav rotate1"><p><</p></div><div class="btn-nav">x</div><div class="btn-nav rotate2"><p>></p></div>
</div>
</div>`,
`<div class="note">
    <textarea style="resize: none;" name="" id="" cols="30" rows="10"></textarea>
    <div class="buttons-container">
      <div class="btn-nav rotate1"><p><</p></div><div class="btn-nav">x</div><div class="btn-nav rotate2"><p>></p></div>
    </div>
</div>`]
///////////////////////////////////// S T I C K E R S ////////////////////////////////////

let stickersArr = []
// has to be stored in localstorage in function and also has to get the number from localstorage
let stickersNumber = 0

// let objectyle = {step:0}

function addSticker() {
stickersNumber++
stickersArr.push(`<div class="note">
<textarea style="resize: none;" name="" id="sticker-${stickersNumber}" cols="30" rows="10"></textarea>
<div class="buttons-container">
  <div class="btn-nav rotate1"><p><</p></div><div class="btn-nav">x</div><div class="btn-nav rotate2"><p>></p></div>
</div>
</div>`)
}

function moveStickerUp(){
  
}

function renderStickers(){
  for(let j=0; j < stickersNumber; j++) {
document.querySelector(".note-container").innerHTML = stickersArr[j]
  }
}

///////////////////////////////////// N A V B A R  ////////////////////////////////////

// Button that adds or filters the Notes
function filterAddNote(){
  
  if(days != ''){
    // filtering function
console.log('filtering')
  } else {
    // add a note function
    notes+= `<div class="note">
    <textarea style="resize: none;" name="" id="" cols="30" rows="10"></textarea>
    <div class="buttons-container">
      <div class="btn-nav rotate1"><p><</p></div><div class="btn-nav">x</div><div class="btn-nav rotate2"><p>></p></div>
    </div>
</div>`
document.querySelector(".note-container").innerHTML = notes
console.log('adding note')
  }
}


//Change current month
const nextMonth = document.getElementById('nav-month-next')
nextMonth.addEventListener('click', () => {
  if(currentMonth<11){
    currentMonth++
    displayMonth.innerHTML = currentYear.toString().slice(2,4) + ' ' + months[currentMonth]
    renderNotes()
  } else{
    currentMonth=0
    currentYear++
    displayMonth.innerHTML = currentYear.toString().slice(2,4) + ' ' + months[currentMonth]
    renderNotes()
  }
})

const prevMonth = document.getElementById('nav-month-prev')
prevMonth.addEventListener('click', () => {
  if(currentMonth>0){
    currentMonth--
    displayMonth.innerHTML = currentYear.toString().slice(2,4) + ' ' + months[currentMonth]
    renderNotes()
  } else{
    currentMonth=11
    currentYear--
    displayMonth.innerHTML = currentYear.toString().slice(2,4) + ' ' + months[currentMonth]
    renderNotes()
  }
})

///////////////////////////////////// N O T E S   ////////////////////////////////////


let days = "";
let notes = "";

function onInput(i){
  let currentId = date.getFullYear() + '-' + currentMonth + '-' + i
  let currentNote = document.getElementById(`note-${i}`)
  let currentDayInput = document.getElementById(`${date.getFullYear() + '-' + currentMonth + '-' + i}`)
  // get input data into localstorage
  localStorage.setItem(currentId, currentDayInput.value)
  //display stored data on the notes
  let currentNoteContent = localStorage.getItem(currentId)
  currentDayInput.innerHTML = currentNoteContent
}

function renderTextContent(i){
  let currentId = date.getFullYear() + '-' + currentMonth + '-' + i
  let currentNoteContent = localStorage.getItem(currentId)
  if(currentNoteContent === null){
    return ''
  }else {
    return currentNoteContent
  }
}


function tabClosed(i){
let currentNote = document.getElementById(`note-${i}`)
currentNote.classList.remove('day-sel')
currentNote.classList.add('day-unsel')
currentNote.innerHTML = ` <div class="day-unsel-number"><p class="date-unsel">${i}</p></div> 
<div class="day-unsel-text">
    <div class="day-unsel-pomodoro-amount"
      <p class="pom-amount-unsel">5</p>
    </div>
    <textarea onfocus="noteExpand(${i})" style="resize: none;" id="${date.getFullYear() + '-' + currentMonth + '-' + i}"  
    name="" cols="30" rows="1" class="day-sel-notes-input" placeholder="">${renderTextContent(i)}</textarea>
</div>`
}

function noteExpand(i){
  let currentNote = document.getElementById(`note-${i}`)
  if(currentNote.classList.contains('day-unsel')){
  currentNote.classList.remove('day-unsel')
  currentNote.classList.add('day-sel')
  currentNote.innerHTML = `  <div class="day-sel-number"><p class="date-sel" id="date-sel">${i}</p></div> 
   <div class="day-sel-text">
       <div class="day-sel-pomodoro-amount" id="day-pomodoro-amount">
         <p class="pom-amount-sel" id="pom-amount-sel">5</p>
       </div>
       <textarea oninput="onInput(${i})" onfocusout="tabClosed(${i})" id="${date.getFullYear() + '-' + currentMonth + '-' + i}" 
       name="" cols="30" rows="10" class="day-sel-notes-input" 
       placeholder="">${renderTextContent(i)}</textarea>
 </div>`
 document.getElementById(date.getFullYear() + '-' + currentMonth + '-' + i).focus()
 // Scroll the Note to the Top of the list
 let notePos = currentNote.offsetTop - 10
 ContainerOrganizer.scroll({ top: notePos, behavior: 'smooth'})
}}


function renderNotes(){
days = ''
for (let i=1; i<= lastDay; i++) {
  days += `<div class="day-unsel" id="note-${i}" onclick="noteExpand(${i})">
  <div class="day-unsel-number"><p class="date-unsel">${i}</p></div> 
   <div class="day-unsel-text">
       <div class="day-unsel-pomodoro-amount"
         <p class="pom-amount-unsel">5</p>
       </div>
       <textarea oninput="onInput(${i})" onfocus="noteExpand(${i})" style="resize: none;" id="${date.getFullYear() + '-' + currentMonth + '-' + i}"  
       name="" cols="30" rows="1" class="day-sel-notes-input" value="penis" 
       placeholder=""
       >${renderTextContent(i)}</textarea>
 </div>
</div>`
ContainerOrganizer.innerHTML = days;

}}

renderNotes();
 
// let notes = []
// notes.length = lastDay
// notes.forEach(el, index => {
// el = `<div class="day-unsel" id="note-${index}">
// <div class="day-unsel-number"><p class="date-unsel">${index}</p></div> 
//  <div class="day-unsel-text">
//      <div class="day-unsel-pomodoro-amount"
//        <p class="pom-amount-unsel">5</p>
//      </div>
//      <input type="text" class="day-unsel-notes-input" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ">
// </div>
// </div>`
// })

// note delete button (defunct)        <div class="btn-nav" onclick="noteDel(${i})" id="note-del-${i}"><p class="text">x</p></div>
// function noteDel(i){
//   console.log('asd')
//   let currentId = date.getFullYear() + '-' + currentMonth + '-' + i
//   localStorage.removeItem(currentId)
//   // ne renderitsya prosto

// }