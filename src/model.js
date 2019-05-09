class AllItems {
  constructor(expenses, incomes) {
    this.exp = Array.isArray(expenses) ? expenses : []
    this.inc = Array.isArray(incomes) ? incomes : []
  }

  addExp(exp) {
    this.exp.push(exp)
  }

  addInc(inc) {
    this.inc.push(inc)
  }

  removeExp(id) {
    this.exp = this.exp.filter(exp => id != exp.id)
  }

  removeInc(id) {
    this.inc = this.inc.filter(inc => id != inc.id)
  }
}

class Total {
  constructor(totalExp = 0, totalInc = 0) {
    this.exp = totalExp
    this.inc = totalInc
  }
}

class Data {
  constructor(AllItems, Total, budget = 0) {
    this.allItems = AllItems
    this.total = Total
    this.budget = budget
  }

  calculateTotal() {
    this.total.exp = this.allItems.exp.reduce((acc, exp) => acc += exp.value, 0)
    this.total.inc = this.allItems.inc.reduce((acc, inc) => acc += inc.value, 0)
  }

  claculateBudget() {
    this.budget = this.total.inc - this.total.exp
  }

  getData() {
    this.claculateBudget()
    this.calculateTotal()
    return this
  }

  getTotal() {
    this.calculateTotal()
    return this.total
  }
}

export {AllItems, Total, Data}