
let stickersArray = []
let idPosCounter = 0
ContainerOrganizer.addEventListener('click', e => {
  // Sticker EVENTS
  if ((e.target.tagName === ('TEXTAREA') && e.target.parentElement.parentElement.classList.value === 'note-container')) {
    console.log(e.target.parentElement.parentElement.classList.value === 'note-container')
    e.target.parentElement.classList.remove('note')
    e.target.parentElement.classList.add('note-wide')
    let textAR = document.getElementById(e.target.id)
    // adding Sticker Content on input to LOCALSTORAGE
    textAR.addEventListener('change', (e) => {
      const id = e.target.id.slice(9,10)
      const index = stickersArray.indexOf(stickersArray.find(item => item.id == id))
      stickersArray[index].con = e.target.value  
      setLS()
    })

    // Sticker expanding on focusin focusout
    textAR.addEventListener('focusout', (e) => {
      e.target.parentElement.classList.remove('note-wide')
      e.target.parentElement.classList.add('note')
    })
  }
  // Triggering deleteSticker() on X click
  if (e.target.innerHTML === 'x') {
    deleteSticker(e.target.id)
    setLS()

  }
  // Moving Sticker UP
  if (e.target.innerHTML === '&lt;') {
    moveStickerUp(e.target.parentElement.id)
  }
  // Moving Sticker DOWN
  if (e.target.innerHTML === '&gt;') {
    moveStickerDown(e.target.parentElement.id)
  }
})

class Sticker {
  constructor(id, con, div) {
    this.id = id;
    this.con = con;
    this.div = div;
  }
}

function setLS(){
  localStorage.setItem('stickers', JSON.stringify(stickersArray))
}

function addSticker(sticker, id) {
  stickersArray.push(sticker)
  console.log(id)
  setLS()
  renderStickers()
}

function deleteSticker(e) {
  stickersArray = stickersArray.filter(sticker => sticker.id != e)
  setLS()
  renderStickers()
}

function moveStickerUp(id) {
  let ID = Number(id)
  if (stickersArray.indexOf(stickersArray.find(item => item.id === ID)) == 0) {
  } else {
    let index = Number(stickersArray.indexOf(stickersArray.find(item => item.id === ID)))
    // копирую предыдущий элемент
    stickersArray.splice(Number(--index), 0, stickersArray[index])
    // делаю таргет посишн элемент = куррент элемент
    stickersArray.splice(index, 1, stickersArray[Number(index + 2)])
    //  // удаляю исходный элемент В позиции 
    stickersArray.splice([Number(index + 2)], 1)
    setLS()
    renderStickers()
  }
}

function moveStickerDown(id) {
  let ID = Number(id)
  let index = Number(stickersArray.indexOf(stickersArray.find(item => item.id === ID)))
  if (index === stickersArray.length - 1) {
    console.log('last sticker, cant move down')
  }
  else {
    // копирую след. элемент
    stickersArray.splice(Number(++index), 0, stickersArray[index])
    // делаю таргет посишн элемент = куррент элемент
    stickersArray.splice(++index, 1, stickersArray[Number(index - 2)])
    //  // удаляю исходный элемент В позиции 
    stickersArray.splice([Number(index - 2)], 1)
    setLS()
    renderStickers()
  }
}
// для каждого элемента аррея forEach, взять его айди, сделать новый евент листенер с textarea+id и сказать что он равен КОН

function renderStickers() {
  idPosCounter = +localStorage.getItem('posCounter')
  const container = document.querySelector(".note-container")
  if(JSON.parse(localStorage.getItem('stickers')) === null) {
    stickersArray = []
  }  else {
    stickersArray = JSON.parse(localStorage.getItem('stickers'))
    container.innerHTML = stickersArray.map((item) => item.div).join(' ')
// Rendering stickers content for Each sticker
    stickersArray.forEach(el => {
      let textArea = document.getElementById(`textarea-${el.id}`)
      textArea.innerHTML = `${el.id}  ${el.con}`
    });
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
    const con = ''
    const div = `<div id="sticker-${id}" class="note">
    <textarea id="textarea-${id}" 
    style="resize: none;" cols="30" rows="10">${id}</textarea>
    <div class="buttons-container">
      <div class="btn-nav rotate1 stickerUP" id="${id}"><p><</p></div>
      <div class="btn-nav deleteX" id="${id}">x</div>
      <div class="btn-nav rotate2 stickerDOWN" id="${id}"><p>></p></div>
    </div>
    </div>`
    // Incrementing the counter, storing it in Localstorage
    idPosCounter++
    localStorage.setItem('posCounter', idPosCounter)
    //instantiating a sticker
    const sticker = new Sticker(id, con, div)
    //adding a sticker to ui
    addSticker(sticker, id)
  }
})
