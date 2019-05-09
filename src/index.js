import {AllItems, Data, Total} from './model'
const item1 = {value: 100}
const item2 = {value: 150}
const item3 = {value: 330}
const item4 = {value: 60}

const allItems = new AllItems()
allItems.addExp(item1)
allItems.addExp(item2)
allItems.addExp(item3)
allItems.addExp(item4)

const total = new Total()

const data = new Data(allItems, total)

console.log(data.getTotal());