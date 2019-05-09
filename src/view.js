const DOMElements = {
  budgetIncome: document.querySelector('.budget__income--value'),
  budgetExpense: document.querySelector('.budget__expenses--value'),
  budgetIncomePercentage: document.querySelector('.budget__income--percentage'),
  addType: document.querySelector('.add__type'),
  addDescription: document.querySelector('.add__description'),
  addValue: document.querySelector('.add__value'),
  addBtn: document.querySelector('.add__btn'),
  incomeList: document.querySelector('.income__list'),
  expenseList: document.querySelector('.expenses__list'),
}

const getExpenseHTML = (valueObj) => {
  const {id = '', description = '', value = -1, percentage = 0} = valueObj
  return `<div class="item clearfix" id="${id}">
  <div class="item__description">${description}</div>
  <div class="right clearfix">
      <div class="item__value">${value > 0 ? `- ${value}` : value} €</div>
      <div class="item__percentage">${percentage}%</div>
      <div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
      </div>
  </div>
</div>`
}

const getIncomeHTML = (valueObj) => {
  const {id = '', description = '', value = -1} = valueObj
  return `<div class="item clearfix" id="${id}">
  <div class="item__description">${description}</div>
  <div class="right clearfix">
      <div class="item__value">+ ${value}</div>
      <div class="item__delete">
          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
      </div>
  </div>
</div>`
}


class Render {
  constructor(domElement) {
    this.domElement = domElement
  }
}

class RenderExpenses extends Render {
  constructor(domElement) {
    super(domElement)
  }

  render(expenses) {
    this.domElement.innerHTML = ''

    expenses.forEach(exp => {
      this.domElement.insertAdjacentHTML('beforeend', getExpenseHTML(exp))
    })
  }
}

class RenderIncomes extends Render {
  constructor(domElement) {
    super(domElement)
  }

  render(incomes) {
    this.domElement.innerHTML = ''

    incomes.forEach(inc => {
      this.domElement.insertAdjacentHTML('beforeend', getIncomeHTML(inc))
    })
  }
}

export {RenderExpenses, RenderIncomes, DOMElements}