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
//  stickersRender()

  } else {
    renderNotes()
    line.style.display = ""
    filterPlus.innerHTML = `<i class="fas fa-filter"></i>`
    noteBtn.innerHTML = `<i class="far fa-sticky-note"></i>`
    displayMonth.innerHTML = currentYear.toString().slice(2,4) + ' ' + months[currentMonth]
    nextMonth.style.visibility = ""
    prevMonth.style.visibility = ""
  }
}

///////////////////////////////////// N A V B A R  ////////////////////////////////////
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

///////////////////////////////////// N A V B A R  ////////////////////////////////////
/* у меня есть аррэй из объектов. каждый объект это контент стикера и его айди.
1.есть стикерАррей. им манипулируем.
изменение положения (вниз): findIndex(текущий стикерАйДи) меняем его индекс на -1
                    и одновременно findIndex(текущий стикерАйди-1) меняем на индекс на +1
                    рендерим по порядку АйдШек.


*/
/// MISHA
let tmpStickerArray = [{ id: '123', text: 'some text'} , { id: '1234', text: 'some text 2'} ]

function removeStick(stickerID){
  tmpStickerArray = tmpStickerArray.filter(sticker => sticker.id !== stickerID )
  renderStickList(tmpStickerArray)
}

let arr = ""

function renderStickList(arr){
  return arr.map(sticker => { 
    return `<div onclick="stickerExpand(${sticker.id})" onfocusout="stickerRetract(${sticker.id})" sticker.id="sticker-${sticker.id}" class="note">
    <textarea  oninput="stickerInput(${sticker.id})" sticker.id="textarea-${sticker.id}" style="resize: none;" cols="30" rows="10"></textarea>
    <div class="buttons-container">
      <div onclick="stickerUp(${sticker.id})" class="btn-nav rotate1"><p><</p></div>
      <div onclick="removeStick(${sticker.id})" class="btn-nav">x</div>
      <div onclick="stickerDown(${id}) "class="btn-nav rotate2"><p>></p></div>
    </div>
    </div>`
   } )
}

function changePosition(direction, stickerID) {
  const stickerIndex = tmpStickerArray.findIndex(sticker => sticker.id === stickerID)
  if(tmpStickerArray.length-1 === stickerIndex && direction === 'down'){
    return 
  }
  if( stickerIndex === 0 && direction === 'up' ){
    return 
  }
  if ( direction === 'down'  ){

  }
  renderStickList()
}

///MISHA

let stickersArr = []
let stickersIDs = []
// let stickersContent = []
let id
let stickersNumber

function defineStickersNumber(){
  if(localStorage.getItem('stickersCount') === null) {
  console.log('no stickers Count Initially')
stickersNumber = 0
localStorage.setItem('stickersCount', stickersNumber) // first creation of stickerscount
localStorage.setItem('stickersNumber', stickersNumber) // creation of stickersNumber
} else {
  console.log('Have stickers Count in localstorage',Number(localStorage.getItem('stickersNumber')))
stickersNumber = Number(localStorage.getItem('stickersNumber'))
console.log(stickersNumber, 'stnumber')
console.log(localStorage.getItem('stickersCount'), 'stickersCount')
}
}

/// stickersNumber --  amount of stickers ever existed in this itiration of Localstorage. Means that is has to be 
// incremented constantly to get a unique id number. ID number = stickernumber. Because when you delete note, 
// it's id has to be gone.
defineStickersNumber()
/////////////////////// S T I C K E R // M O D E /// ADD A NOTE ////////////////////////////////
function filterAddNote(){
  if(days != ""){
    // filtering function
console.log('filtering')
  } else {
    //2nd event  Когда у нас есть данные нам нужно получить их из локалстораге, данные = количество стикеров.StickersCount
    // значит их нельзя оверрайдить а только задавать.
    // problem 05nov after f5 stickersNumber is 1 iteration behind.
    console.log('adding note fired off', stickersNumber)
    // stickersNumber = localStorage.getItem('stickersCount')
    const id = stickersNumber
    stickersIDs.push(id)
    localStorage.setItem('IDs', stickersIDs)
    localStorage.setItem('stickersCount', stickersIDs.length)
    //3rd event
    console.log('stickersNymber before render', stickersNumber)
    stickersNumber++
    localStorage.setItem('stickersNumber', stickersNumber)
    stickersRender()
//     stickersArr.push(`<div onclick="stickerExpand(${id})" onfocusout="stickerRetract(${id})" id="sticker-${id}" class="note">
//     <textarea  oninput="stickerInput(${id})" id="textarea-${id}" style="resize: none;" cols="30" rows="10"></textarea>
//     <div class="buttons-container">
//       <div onclick="stickerUp(${id})" class="btn-nav rotate1"><p><</p></div><div onclick="stickerDelete(${id})" class="btn-nav">x</div><div onclick="stickerDown(${id})"class="btn-nav rotate2"><p>></p></div>
//     </div>
//     </div>`)
// document.querySelector(".note-container").innerHTML = stickersArr.join(' ')
  }
}

function stickersRender(){
  if (localStorage.getItem('IDs')!= null) {
    console.log('stickersRender fired off')
  stickersIDs = localStorage.getItem('IDs').split(',')  
  let stAmount = localStorage.getItem('stickersCount')
  console.log(stAmount,  localStorage.getItem('stickersCount') )
  stickersArr = []
  for (let i=0;i<=stAmount;i++) {
    console.log('sticker rendered:', i, 'stAmount=', stAmount)
  id = stickersIDs[i]
  stickersArr.push(`<div onclick="stickerExpand(${id})" onfocusout="stickerRetract(${id})" id="sticker-${id}" class="note">
  <textarea  oninput="stickerInput(${id})" id="textarea-${id}" style="resize: none;" cols="30" rows="10"></textarea>
  <div class="buttons-container">
    <div onclick="stickerUp(${id})" class="btn-nav rotate1"><p><</p></div><div onclick="stickerDelete(${id})" class="btn-nav">x</div><div onclick="stickerDown(${id})"class="btn-nav rotate2"><p>></p></div>
  </div>
  </div>`) 
  }
  document.querySelector(".note-container").innerHTML = stickersArr.join(' ')
stickersContentRender()
  }

  else {
    console.log('no content, else')
    days = ""
  filterAddNote() ///1st event
}}

// on basis of stickersIDs. and textarea-id
function stickersContentRender(){
for(let i=0;i<stickersIDs.length;i++){
let textAreaContent = document.getElementById(`textarea-${stickersIDs[i]}`)
textAreaContent.innerHTML = localStorage.getItem(`sticker-${stickersIDs[i]}`)
console.log('stickersContentRender fired off', `sticker-${stickersIDs[i]}`)
}}

function stickerInput(id){
  let textArea = document.getElementById(`textarea-${id}`)
  let currentId = 'sticker-' + id.toString()
  localStorage.setItem(currentId, textArea.value)
  // document.getElementById(`sticker-${id}`).children[0].innerText = currentStickerInput.value
  stickersContent[id] = textArea.value
}

function stickerDelete(id){
// delete localstorage content and IDs, decrease localstorage stickersCount
localStorage.removeItem(`sticker-${id}`)
let newStickerIds = localStorage.getItem('IDs').split(',')
// console.log('id:', id, newStickerIds)
newStickerIds.splice(id,1)
localStorage.setItem('IDs', newStickerIds)
localStorage.setItem('stickersCount', localStorage.getItem('stickersCount')-1)
// delete divs


stickersRender()
}

function stickerUp(id){
}

function stickerDown(id){
}

function stickerExpand(id) {
// let sticker = document.getElementById(`sticker-${id}`)
// sticker.classList.remove("note")
// sticker.classList.add("note-wide")
}

function stickerRetract(id){
  // let sticker = document.getElementById(`sticker-${id}`)
  // sticker.classList.remove("note-wide")
  // sticker.classList.add("note")
}

function reset(){
  stickersIDs = []
  localStorage.removeItem('IDs')
  stickersArr = []
  stickersNumber = 0
  localStorage.clear()
}
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

///////////////////////////////////// N A V B A R  ////////////////////////////////////
/* у меня есть аррэй из объектов. каждый объект это контент стикера и его айди.
1.есть стикерАррей. им манипулируем.
изменение положения (вниз): findIndex(текущий стикерАйДи) меняем его индекс на -1
                    и одновременно findIndex(текущий стикерАйди-1) меняем на индекс на +1
                    рендерим по порядку АйдШек.


*/
/// MISHA
let tmpStickerArray = [{ id: '123', text: 'some text'} , { id: '1234', text: 'some text 2'} ]

function removeStick(stickerID){
  tmpStickerArray = tmpStickerArray.filter(sticker => sticker.id !== stickerID )
  renderStickList(tmpStickerArray)
}

let arr = ""

function renderStickList(arr){
  return arr.map(sticker => { 
    return `<div onclick="stickerExpand(${sticker.id})" onfocusout="stickerRetract(${sticker.id})" sticker.id="sticker-${sticker.id}" class="note">
    <textarea  oninput="stickerInput(${sticker.id})" sticker.id="textarea-${sticker.id}" style="resize: none;" cols="30" rows="10"></textarea>
    <div class="buttons-container">
      <div onclick="stickerUp(${sticker.id})" class="btn-nav rotate1"><p><</p></div>
      <div onclick="removeStick(${sticker.id})" class="btn-nav">x</div>
      <div onclick="stickerDown(${id}) "class="btn-nav rotate2"><p>></p></div>
    </div>
    </div>`
   } )
}

function changePosition(direction, stickerID) {
  const stickerIndex = tmpStickerArray.findIndex(sticker => sticker.id === stickerID)
  if(tmpStickerArray.length-1 === stickerIndex && direction === 'down'){
    return 
  }
  if( stickerIndex === 0 && direction === 'up' ){
    return 
  }
  if ( direction === 'down'  ){

  }
  renderStickList()
}

///MISHA

let stickersArr = []
let stickersIDs = []
// let stickersContent = []
let id
let stickersNumber

function defineStickersNumber(){
  if(localStorage.getItem('stickersCount') === null) {
  console.log('no stickers Count Initially')
stickersNumber = 0
localStorage.setItem('stickersCount', stickersNumber) // first creation of stickerscount
localStorage.setItem('stickersNumber', stickersNumber) // creation of stickersNumber
} else {
  console.log('Have stickers Count in localstorage',Number(localStorage.getItem('stickersNumber')))
stickersNumber = Number(localStorage.getItem('stickersNumber'))
console.log(stickersNumber, 'stnumber')
console.log(localStorage.getItem('stickersCount'), 'stickersCount')
}
}

/// stickersNumber --  amount of stickers ever existed in this itiration of Localstorage. Means that is has to be 
// incremented constantly to get a unique id number. ID number = stickernumber. Because when you delete note, 
// it's id has to be gone.
defineStickersNumber()
/////////////////////// S T I C K E R // M O D E /// ADD A NOTE ////////////////////////////////
// function filterAddNote(){
//   if(days != ""){
//     // filtering function
// console.log('filtering')
//   } else {
//     //2nd event  Когда у нас есть данные нам нужно получить их из локалстораге, данные = количество стикеров.StickersCount
//     // значит их нельзя оверрайдить а только задавать.
//     // problem 05nov after f5 stickersNumber is 1 iteration behind.
//     console.log('adding note fired off', stickersNumber)
//     // stickersNumber = localStorage.getItem('stickersCount')
//     const id = stickersNumber
//     stickersIDs.push(id)
//     localStorage.setItem('IDs', stickersIDs)
//     localStorage.setItem('stickersCount', stickersIDs.length)
//     //3rd event
//     console.log('stickersNymber before render', stickersNumber)
//     stickersNumber++
//     localStorage.setItem('stickersNumber', stickersNumber)
//     stickersRender()
// //     stickersArr.push(`<div onclick="stickerExpand(${id})" onfocusout="stickerRetract(${id})" id="sticker-${id}" class="note">
// //     <textarea  oninput="stickerInput(${id})" id="textarea-${id}" style="resize: none;" cols="30" rows="10"></textarea>
// //     <div class="buttons-container">
// //       <div onclick="stickerUp(${id})" class="btn-nav rotate1"><p><</p></div><div onclick="stickerDelete(${id})" class="btn-nav">x</div><div onclick="stickerDown(${id})"class="btn-nav rotate2"><p>></p></div>
// //     </div>
// //     </div>`)
// // document.querySelector(".note-container").innerHTML = stickersArr.join(' ')
//   }
// }

function stickersRender(){
  if (localStorage.getItem('IDs')!= null) {
  stickersIDs = localStorage.getItem('IDs').split(',')  
  let stAmount = localStorage.getItem('stickersCount')
  console.log(stAmount,  localStorage.getItem('stickersCount') )
  stickersArr = []
  for (let i=0;i<=stAmount;i++) {
    console.log('sticker rendered:', i, 'stAmount=', stAmount)
  id = stickersIDs[i]
  stickersArr.push(`<div onclick="stickerExpand(${id})" onfocusout="stickerRetract(${id})" id="sticker-${id}" class="note">
  <textarea  oninput="stickerInput(${id})" id="textarea-${id}" style="resize: none;" cols="30" rows="10"></textarea>
  <div class="buttons-container">
    <div onclick="stickerUp(${id})" class="btn-nav rotate1"><p><</p></div><div onclick="stickerDelete(${id})" class="btn-nav">x</div><div onclick="stickerDown(${id})"class="btn-nav rotate2"><p>></p></div>
  </div>
  </div>`) 
  }
  document.querySelector(".note-container").innerHTML = stickersArr.join(' ')
stickersContentRender()
  }

  else {
    console.log('no content, else')
    days = ""
  filterAddNote() ///1st event
}}

// on basis of stickersIDs. and textarea-id
function stickersContentRender(){
for(let i=0;i<stickersIDs.length;i++){
let textAreaContent = document.getElementById(`textarea-${stickersIDs[i]}`)
textAreaContent.innerHTML = localStorage.getItem(`sticker-${stickersIDs[i]}`)
console.log('stickersContentRender fired off', `sticker-${stickersIDs[i]}`)
}}

function stickerInput(id){
  let textArea = document.getElementById(`textarea-${id}`)
  let currentId = 'sticker-' + id.toString()
  localStorage.setItem(currentId, textArea.value)
  // document.getElementById(`sticker-${id}`).children[0].innerText = currentStickerInput.value
  stickersContent[id] = textArea.value
}

function stickerDelete(id){
// delete localstorage content and IDs, decrease localstorage stickersCount
localStorage.removeItem(`sticker-${id}`)
let newStickerIds = localStorage.getItem('IDs').split(',')
// console.log('id:', id, newStickerIds)
newStickerIds.splice(id,1)
localStorage.setItem('IDs', newStickerIds)
localStorage.setItem('stickersCount', localStorage.getItem('stickersCount')-1)
// delete divs


stickersRender()
}

function stickerUp(id){
}

function stickerDown(id){
}

function stickerExpand(id) {
// let sticker = document.getElementById(`sticker-${id}`)
// sticker.classList.remove("note")
// sticker.classList.add("note-wide")
}

function stickerRetract(id){
  // let sticker = document.getElementById(`sticker-${id}`)
  // sticker.classList.remove("note-wide")
  // sticker.classList.add("note")
}

function reset(){
  stickersIDs = []
  localStorage.removeItem('IDs')
  stickersArr = []
  stickersNumber = 0
  localStorage.clear()
}

-----------------------
/* двигать стикеры на основе аррея объектов
объект типа id:0 pos:0 content:asdkaksfkas div:`html`

*/
let stickersArray = []
let idPosCounter = 0

class Sticker {
  constructor(id, pos, div) {
    this.id = id;
    this.pos = pos;
    this.div = div;
  }
}

class UI {
  addSticker(sticker) {
    stickersArray.push(sticker)
    // const container = document.querySelector(".note-container")
    // container.innerHTML = stickersArray.map((item) => item.div).join(' ')
    
    // adding delete button functionality

    new UI().renderStickers()
    new UI().deleteSticker()
    new UI().moveStickerUp()
    new UI().moveStickerDown()
    // new UI().expandSticker()
  }

  deleteSticker() {
    let xBut = document.querySelectorAll(`.deleteX`)
    xBut = [...xBut]
    xBut.map( (item)=> item.addEventListener('click', function (e) {
      // console.log(e.target.id, 'delete')
      stickersArray = stickersArray.filter(sticker => sticker.id != e.target.id)
      new UI().renderStickers()
    }) )
  }

  moveStickerUp() {
      let upBut = document.getElementsByClassName('stickerUP')
      upBut = [...upBut]
      upBut.map( (item)=> item.addEventListener('click', function (e) {
        e.preventDefault()
        const id = +e.target.parentElement.id
        console.log(id)
      //   // копирую предыдущий элемент
      //   stickersArray.splice(id--, 0, stickersArray[id--])
      //  // делаю таргет посишн элемент = куррент элемент
      //  stickersArray.splice(id--,1, stickersArray[id++])
      //  // удаляю исходный элемент В позиции +1
      //  stickersArray.splice(id++,1)
      stickersArray.splice(id,1)
      //  console.log(stickersArray)
      new UI().renderStickers()
    }) )
  }

  moveStickerDown() {
    
  }

  expandSticker(id){
    const sticker = document.getElementById(`sticker-${id}`)
    sticker.classList.remove("note")
    sticker.classList.add("note-wide")
  }

  retractSticker(){}

  renderStickers() {
    const container = document.querySelector(".note-container")
    container.innerHTML = stickersArray.map((item) => item.div).join(' ')
    new UI().deleteSticker()
    new UI().moveStickerUp()
    new UI().moveStickerDown()
    console.log('rendered')
  }

}

//Adding a new sticker
document.getElementById('nav-filter').addEventListener('click', function (e) {
  if (days != '') {
    // filtering function
    console.log('filtering')
  } else {
    // console.log('plus clicked')
    const id = idPosCounter
    const pos = idPosCounter
    const div = `<div id="sticker-${id}" class="note">
    <textarea  oninput="stickerInput(${id})" sticker.id="textarea-${id}" 
    style="resize: none;" cols="30" rows="10"></textarea>
    <div class="buttons-container">
      <div class="btn-nav rotate1 stickerUP" id="${id}"><p><</p></div>
      <div class="btn-nav deleteX" id="${id}">x</div>
      <div class="btn-nav rotate2 stickerDOWN" id="${id}"><p>></p></div>
    </div>
    </div>`
    idPosCounter++
    //instantiating a sticker
    const sticker = new Sticker(id, pos, div)

    //instantiating a new UI action
    const ui = new UI()

    //adding a sticker to ui
    ui.addSticker(sticker, id)

  }

})

///
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
//  stickersRender()

  } else {
    renderNotes()
    line.style.display = ""
    filterPlus.innerHTML = `<i class="fas fa-filter"></i>`
    noteBtn.innerHTML = `<i class="far fa-sticky-note"></i>`
    displayMonth.innerHTML = currentYear.toString().slice(2,4) + ' ' + months[currentMonth]
    nextMonth.style.visibility = ""
    prevMonth.style.visibility = ""
  }
}

///////////////////////////////////// N A V B A R  ////////////////////////////////////
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
