import {data} from './model'
import {localDB} from './localStorage'

const DOMElements = {
  span: document.querySelector('.heading__span'),
  description: document.querySelector('.edit__description'),
  value: document.querySelector('.edit__value'),
  btn: document.querySelector('.btn'),
}
// get id form url
const hash = location.hash.substring(1)
const [id, type] = hash.split('+')
console.log(id);
// customize heading -> edit your expense || edit your income
DOMElements.span.textContent = type === 'inc' ? 'income' : 'expense'

// get item with id
const item = data.allItems.getItem(type, id)
console.log(item);
// fill inputfields with values from item
DOMElements.description.value = item.description
DOMElements.value.value = item.value

// focus first field
DOMElements.description.focus()

// update item and redirect to ./index.html by pressing enter
window.addEventListener('keypress', e => {
  if(e.keyCode === 13 || e.which === 13) {
    item.description = DOMElements.description.value
    item.value = parseFloat(DOMElements.value.value)
    data.calcTotal()
    data.calcBudget()
    data.allItems.calcExpPercentage(data.total.inc)
    localDB.saveData(data)
    location.assign('/index.html')
  }
})

DOMElements.btn.addEventListener('click', () => {
  item.description = DOMElements.description.value
  item.value = parseFloat(DOMElements.value.value)
  data.calcTotal()
  data.calcBudget()
  data.allItems.calcExpPercentage(data.total.inc)
  localDB.saveData(data)
  location.assign('/index.html')
})