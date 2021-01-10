class UI {
    stickers = []
    totalCount = 0
    containerID = 0

  constructor(containerID) {
    this.containerID = containerID
    getById(containerID).addEventListener('click', this.processEvent)
  }
  addSticker(){
    this.stickers.push(new Sticker(this.totalCount++))
    this.render()
  }
  deleteSticker(id){
    this.stickers.delete(id)
    this.render()
  }
  processEvent(e){
    e.prevent()
    const myId = e.id => 'delete-2'
    const [command, id] = myId.splice('-')

    if (command === 'delete'){
      this.deleteSticker(id)
    }
    id (command === 'up'){
      this.bumpMyStick(currentId)
    }
  }
  render(){
    //imprementaion delete-1
  }

}

class Sticker {

}

const ui  = new UI('container')


/// html sticker'a