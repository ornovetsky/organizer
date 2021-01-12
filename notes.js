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

function renderPomAmount(i){
let pomDateToday = 'POM-' + date.getFullYear() + '-' + currentMonth + '-' + i
if (!localStorage.getItem(pomDateToday)){
  return ''
}
return localStorage.getItem(pomDateToday)
}

function tabClosed(i){
let currentNote = document.getElementById(`note-${i}`)
currentNote.classList.remove('day-sel')
currentNote.classList.add('day-unsel')
currentNote.innerHTML = ` <div class="day-unsel-number"><p class="date-unsel">${i}</p></div> 
<div class="day-unsel-text">
    <div class="day-unsel-pomodoro-amount"
    <p class="pom-amount-unsel" id="pom-amount">${renderPomAmount(i)}</p>
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
         <p class="pom-amount-sel" id="pom-amount">${renderPomAmount(i)}</p>
       </div>
       <textarea oninput="onInput(${i})" onfocusout="tabClosed(${i})" 
       id="${date.getFullYear() + '-' + currentMonth + '-' + i}" 
       name="" cols="30" rows="10" class="day-sel-notes-input" 
       placeholder="">${renderTextContent(i)}</textarea>
 </div>`
 document.getElementById(date.getFullYear() + '-' + currentMonth + '-' + i).focus()
 // Scroll the Note to the Top of the list
 let notePos = currentNote.offsetTop - 180
 ContainerOrganizer.scroll({ top: notePos, behavior: 'smooth'})
}}


function renderNotes(){
days = ''
for (let i=1; i<= lastDay; i++) {
  days += `<div class="day-unsel" id="note-${i}" onclick="noteExpand(${i})">
  <div class="day-unsel-number"><p class="date-unsel">${i}</p></div> 
   <div class="day-unsel-text">
       <div class="day-unsel-pomodoro-amount"
         <p class="pom-amount-unsel" id="pom-amount">${renderPomAmount(i)}</p>
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
noteExpand(today)

/// Task input

const enterBtn = document.getElementById('stats')
const taskInput = document.getElementById('pomodoro-task-input')
taskInput.addEventListener('keypress', (e)=> {
  if (e.key === 'Enter') {
    let currentId = date.getFullYear() + '-' + currentMonth + '-' + today
    let currentDayInput = document.getElementById(`${date.getFullYear() + '-' + currentMonth + '-' + today}`)
    const currentDayContent = localStorage.getItem(`${date.getFullYear() + '-' + currentMonth + '-' + today}`)
    localStorage.setItem(`${date.getFullYear() + '-' + currentMonth + '-' + today}`, 
    '&bull;&nbsp;&nbsp;&nbsp;'+ taskInput.value + '&#10;' + currentDayContent
    )
    taskInput.value = ''
    renderNotes()
  }
})
enterBtn.addEventListener('click', (e)=> {
  let currentId = date.getFullYear() + '-' + currentMonth + '-' + today
  let currentDayInput = document.getElementById(`${date.getFullYear() + '-' + currentMonth + '-' + today}`)
  const currentDayContent = localStorage.getItem(`${date.getFullYear() + '-' + currentMonth + '-' + today}`)
  localStorage.setItem(`${date.getFullYear() + '-' + currentMonth + '-' + today}`, 
  '&bull;&nbsp;&nbsp;&nbsp;'+ taskInput.value + '&#10;' + currentDayContent
  )
  taskInput.value = ''
  renderNotes()
})