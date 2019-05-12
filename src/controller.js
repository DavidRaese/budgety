// import {v4 as uuidv4} from 'uuid'
import {localDB} from './localStorage'
import {data, emptyData, Expense, Income} from './model'
import {view} from './view'

class Controller {
  constructor(data, view) {
    this.data = data
    this.view = view
  }

  inputIsValid() {
    const description = this.view.domElements.addDescription.value
    const value = parseFloat(this.view.domElements.addValue.value)

    if(!isNaN(value) && description.length > 0) {
      return true
    }

  }

  // private
  getInput() {
    if(this.inputIsValid()) {
      const type = this.view.domElements.addType.value
      const description = this.view.domElements.addDescription.value
      const value = this.view.domElements.addValue.value

      return {
        description,
        value,
        type,
      }
    }
    return null

  }

  // public
  addItem() {
    if(this.getInput() !== null) {

      const {description, value, type} = this.getInput()
      let newItem
      
      switch(type) {
        case 'exp':
        newItem = new Expense(description, value)
        break
        case 'inc':
        newItem = new Income(description, value)
        break
      }
      // clear input fields and foucs descriptionfield
      this.view.domElements.addDescription.value = ''
      this.view.domElements.addValue.value = ''
      this.view.domElements.addDescription.focus()
      
      data.allItems.addItem(newItem)
      // calcTotal -> calcBudget -> calcExpPercentage -> saveData
      this.data.calcTotal()
      this.data.calcBudget()
      this.data.allItems.calcExpPercentage(this.data.total.inc)
      localDB.saveData(this.data)
      this.view.updateList(this.data)
      this.view.updateBudget(this.data)
    }
  }
  // public
  removeItem(type, id) {
    this.data.allItems.removeItem(type, id)
    // calcTotal -> calcBudget -> calcExpPercentage -> saveData
    this.data.calcTotal()
    this.data.calcBudget()
    this.data.allItems.calcExpPercentage(this.data.total.inc)
    localDB.saveData(this.data)
    this.view.updateBudget(this.data)
    this.view.updateList(this.data)
  }

  // public
  init() {
    window.onload = () => {
      localDB.saveData(this.data)
      this.data.calcBudget()
      this.data.calcTotal()
      this.data.allItems.calcExpPercentage(this.data.total.inc)
      this.view.updateMonth()
      this.view.updateBudget(this.data)
      this.view.updateList(this.data)
    }

    // add eventListener

    // 1. window listen for enter press
    window.addEventListener('keypress', e => {
      if(e.keyCode === 13 || e.which === 13) {
        this.addItem()
      }
    })

    // 2. btn for adding
    this.view.domElements.addBtn.addEventListener('click', this.addItem.bind(this))

    // 3. item container for deleting
    this.view.domElements.container.addEventListener('click', e => {
      const idRegex = /^inc|exp/
      const concatId = e.target.parentNode.parentNode.parentNode.parentNode.id
      const idExists = idRegex.test(concatId)
      
      if(idExists) {
        const [type, id] = concatId.split(/-(.+)/)
        this.removeItem(type, id)
      }
    })

    // 4. btn for clearing
    this.view.domElements.clearBtn.addEventListener('click', () => {
      this.data = emptyData
      //localDB.saveData(this.data)
      this.view.updateBudget(this.data)
      this.view.updateList(this.data)
    })
  }
}

// initialize controller
const controller = new Controller(data, view)

export {controller}