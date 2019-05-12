import {v4 as uuidv4} from 'uuid'
import {localDB} from './localStorage'

class Data {
  constructor(allItems) {
    this.allItems = allItems
    this.total = {
      exp: this.allItems.calcTotal(this.allItems.exp),
      inc: this.allItems.calcTotal(this.allItems.inc),
      percentage: Math.round(this.allItems.calcTotal(this.allItems.inc) / this.allItems.calcTotal(this.allItems.exp)) * 100 || '- 1'
    }
    this.budget = 0
  }

  calcBudget() {
    this.budget = this.allItems.calcTotal(this.allItems.inc) - 
      this.allItems.calcTotal(this.allItems.exp)
  }

  calcTotal() {
    this.total.exp = this.allItems.calcTotal(this.allItems.exp)
    this.total.inc = this.allItems.calcTotal(this.allItems.inc)

    if (this.total.exp > 0 && this.total.inc > 0) {
      this.total.percentage =  Math.round(this.total.exp / this.total.inc * 100)
    } else {
      this.total.percentage = -1
    }
  }

}

class AllItems {
  constructor(expenses = [], incomes = []) {
    this.exp = expenses
    this.inc = incomes
  }

  calcTotal(arr) {
    return arr.reduce((acc, exp) => acc += exp.value, 0)
  }

  calcExpPercentage(totalIncome) {
    this.exp.forEach(exp => {
      if(totalIncome > 0) {
        exp.percentage = Math.round(exp.value / totalIncome * 100) + ' %'
      } else {
        exp.percentage = -1
      }
    })
  }

  addItem(item) {
    this[item.type].push(item)
  }

  removeItem(type, id) {
    this[type] = this[type].filter(item => item.id != id)
  }

  getItem(type, id) {
    return this[type].find(item => item.id === id)
  }
}
 
class Expense {
  constructor(description, value) {
    this.type = 'exp'
    this.id = uuidv4()
    this.description = description
    this.value = parseFloat(value)
    this.percentage = 0
  }
}

class Income {
  constructor(description, value) {
    this.type = 'inc'
    this.id = uuidv4()
    this.description = description
    this.value = parseFloat(value)
  }
}

// initialize data
let allItems

if(localDB.loadData() !== null) {
  const {exp : expenses, inc: incomes} = localDB.loadData()
  allItems = new AllItems(expenses, incomes)
} else {
  // dummy data for testing
  const income1 = new Income('Gehalt', 1500)
  const income2 = new Income('Ebay Verkauf', 80)

  const expense1 = new Expense('Miete', 400)
  const expense2 = new Expense('Essen', 150)
  const expense3 = new Expense('Urlaub', 600)

  const expenses = [expense1, expense2, expense3]
  const incomes = [income1, income2]

  allItems = new AllItems(expenses, incomes)
}

const data = new Data(allItems)
const emptyData = new Data(new AllItems())

export {data, emptyData, Expense, Income}