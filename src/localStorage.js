class LocalDB {
  loadData() {
    const allItemsJSON = localStorage.getItem('allItems')
    const allItems = JSON.parse(allItemsJSON)
    return allItems
  }

  saveData(data) {
    const dataJSON = JSON.stringify(data.allItems)
    localStorage.setItem('allItems', dataJSON)
  }
}

// init
const localDB = new LocalDB()
export {localDB}