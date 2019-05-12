const DOMElements = {
  month: document.querySelector('.budget__title--month'),
  budgetTotal: document.querySelector('.budget__value'),
  budgetIncome: document.querySelector('.budget__income--value'),
  budgetExpense: document.querySelector('.budget__expenses--value'),
  budgentPercentage: document.querySelector('.budget__expenses--percentage'),
  budgetIncomePercentage: document.querySelector('.budget__income--percentage'),
  addType: document.querySelector('.add__type'),
  addDescription: document.querySelector('.add__description'),
  addValue: document.querySelector('.add__value'),
  addBtn: document.querySelector('.add__btn'),
  incomeList: document.querySelector('.income__list'),
  expenseList: document.querySelector('.expenses__list'),
  expensePercentage: document.querySelector('.item__percentage'),
  container: document.querySelector('.container'),
  clearBtn: document.querySelector('.btn__clear'),
}

const months =["January","February","March","April","May","June","July",
"August","September","October","November","December"]

const getExpHTML = (valueObj) => {
  const {id = '', description = '', value = -1, percentage = 0, type} = valueObj
  return `<div class="item clearfix" id="exp-${id}">
  <div class="item__description"><a href="/edit.html#${id}+${type}">${description}</a></div>
  <div class="right clearfix">
      <div class="item__value">${value > 0 ? `- ${value}` : value} €</div>
      <div class="item__percentage">${percentage}</div>
      <div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
      </div>
  </div>
</div>`
}

const getIncHTML = (valueObj) => {
  const {id = '', description = '', value = -1, type} = valueObj
  return `<div class="item clearfix" id="inc-${id}">
  <div class="item__description"><a href="/edit.html#${id}+${type}">${description}</a></div>
  <div class="right clearfix">
      <div class="item__value">+ ${value} €</div>
      <div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
      </div>
  </div>
</div>`
}

class View {
  constructor(domElements) {
    this.domElements = domElements
  }

  updateList(data) {
    const {allItems: {exp : expenses, inc : incomes}} = data

    this.domElements.expenseList.innerHTML = ''
    expenses.forEach(exp => {
      this.domElements.expenseList.insertAdjacentHTML('beforeend', getExpHTML(exp))
    })
    
    this.domElements.incomeList.innerHTML = ''
    incomes.forEach(inc => {
      this.domElements.incomeList.insertAdjacentHTML('beforeend', getIncHTML(inc))
    })
  }

  updateBudget(data) {
    const {budget, total: {inc, exp, percentage}} = data
    let budgetValue 
    if(budget > 0) {
      budgetValue = `+ ${budget}`
    } else if(budget < 0) {
      budgetValue = `- ${budget * -1}`
    } else {
      budgetValue = budget
    }
    console.log('updata budget: ', percentage);
    this.domElements.budgetTotal.textContent = `${budgetValue} €`
    this.domElements.budgetIncome.textContent = `${inc} €`
    this.domElements.budgetExpense.textContent = `${exp} €`
    this.domElements.budgentPercentage.textContent = `${percentage} %`
  }

  updateMonth() {
    const date = new Date()
    const monthIndex = date.getMonth()

    this.domElements.month.textContent = months[monthIndex]
  }
}

// init view
const view = new View(DOMElements)

export {view}