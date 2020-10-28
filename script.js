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
const dayUnsel = document.querySelectorAll(".day-unsel")

const date = new Date();

const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()



// display current month
document.querySelector(".month").innerHTML = months[date.getMonth()];

const ContainerOrganizer = document.getElementsByClassName("container-organizer-inside")[0]


let days = "";

// function clicked(){
//   console.log('parent')
// }

function noteExpand(i){

  renderNotes()
  // let currentId = 'note-' + i
  let currentNote = document.getElementById(`note-${i}`)
  currentNote.classList.remove('day-unsel')
  currentNote.classList.add('day-sel')
  currentNote.innerHTML = `  <div class="day-sel-number"><p class="date-sel" id="date-sel">${i}</p></div> 
   <div class="day-sel-text">
       <div class="day-sel-pomodoro-amount" id="day-pomodoro-amount">
         <p class="pom-amount-sel" id="pom-amount-sel">5</p>
       </div>
       <textarea name="" cols="30" rows="10" class="day-sel-notes-input" placeholder="Phasellus vestibulum lorem sed risus ultricies tristique nulla. Purus ut faucibus pulvinar elementum. Nulla facilisi etiam dignissim diam quis enim lobortis. Tempor id eu nisl nunc mi ipsum. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Eu consequat ac felis donec et odio. Enim sit amet venenatis urna cursus. Facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris. Sit amet volutpat consequat mauris nunc. Duis tristique sollicitudin nibh sit amet commodo nulla. Nisl tincidunt eget nullam non nisi est sit. Curabitur vitae nunc sed velit dignissim. Sed risus ultricies tristique nulla aliquet enim tortor."></textarea>
 </div>`

}

function renderNotes(){
days = ''
for (let i=1; i<= lastDay; i++) {
  days += `<div class="day-unsel" id="note-${i}" onclick="noteExpand(${i})">
  <div class="day-unsel-number"><p class="date-unsel">${i}</p></div> 
   <div class="day-unsel-text">
       <div class="day-unsel-pomodoro-amount"
         <p class="pom-amount-unsel">5</p>
       </div>
       <input type="text" class="day-unsel-notes-input" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ">
 </div>
</div>`
ContainerOrganizer.innerHTML = days;
}}

renderNotes();


// написать компонент РендерНоутс, при клике 

// const notesDays = document.getElementsByClassName("day-unsel")
// let asd = Array.from(notesDays).forEach( el => {
//   el.addEventListener('click', e => {console.log(e.target, 'clicked')})
// })

// ContainerOrganizer.addEventListener('click', e => {console.log('clicked')})


// -----------------// 

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


// notesDays.forEach(el => {
//   el.addEventListener('click', e => {
//     console.log('asd')
//   })
// })

// if (e.target.classList.contains('day-unsel-notes-input')) {
//     e.target.classList.remove('day-unsel-notes-input')
//     e.target.classList.add('day-sel-notes-input')
// }
//   if (e.target.classList.contains('day-unsel'))   {
//     e.target.classList.remove('day-unsel')
//     e.target.classList.add('day-sel')
// }
// }
