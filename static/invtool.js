let invTableEl = document.getElementById("inventory-table")
let itemTableEl = document.getElementById("item-table")
let delInvBtnEl
let renInvBtnEl
const mainEl = document.getElementById('main')
const defaultAppData = {
    inventories: []
}
const appDataKey = "Inv Tool Data"

const testData = {
    inventories: [
        {
            name : 'Food',
            date : "30/01/2026",
            items: [
                {
                    name: "Bread",
                    count: 5
                },
                {
                    name: "Milk",
                    count: 3
                },
                {
                    name: "Eggs",
                    count: 1
                }

            ]
        },
        {
            name : 'Books',
            date : "02/02/2026",
            items: [
                {
                    name: "Twilight",
                    count: 2
                },
                {
                    name: "Erha",
                    count: 6
                }

            ]
        }
    ]
}

function createInventoryListDiv(){
    const div = document.createElement("div")
    div.id = "inventory-table-div"
    //Create h2
    const h2 = document.createElement("h2")
    h2.textContent = "List of Inventories"
    //Create table
    const table = document.createElement("table")
    table.id = "inventory-table"
    //Set invTableEl to current table made
    invTableEl = table
    //Create table header row
    const trHeader = document.createElement("tr")
    trHeader.className = "tr-header"
    const th1 = document.createElement("th")
    th1.textContent = "Inventory Name"
    const th2 = document.createElement("th")
    th2.textContent = "Date Created"
    trHeader.appendChild(th1)
    trHeader.appendChild(th2)
    //Append table header row to table
    table.appendChild(trHeader)
    //Create and append table rows to table
    const inventories = JSON.parse(localStorage.getItem(appDataKey))['inventories'] //array
    inventories.forEach((invObj) => {
        table.appendChild(createTableRowElement(invObj, true))
    })
    //Append all children elements
    div.appendChild(h2)
    div.appendChild(table)
    div.appendChild(createInvListActionBtnDiv())
    //Return div
    return div
}

function createInvListActionBtnDiv(){
    //Returns actionbtndiv for invlist
    //Create actionBtnDiv
    const actionBtnDiv = document.createElement('div')
    actionBtnDiv.className = "action-btn-div"
    //Create addNewInvBtn
    const addNewInvBtn = document.createElement('button')
    addNewInvBtn.textContent = "Add New Inventory"
    addNewInvBtn.addEventListener('click', addNewInventory)
    //Create delInvBtn
    const delInvBtn = document.createElement('button')
    delInvBtnEl = delInvBtn
    delInvBtn.textContent = "Delete Inventory"
    delInvBtn.addEventListener('click', deleteInventory)
    delInvBtn.disabled = true
    //Create renInvBtn
    const renInvBtn = document.createElement('button')
    renInvBtnEl = renInvBtn
    renInvBtn.textContent = "Rename Inventory"
    renInvBtn.addEventListener('click', renameInventory)
    renInvBtn.disabled = true
    //Append children elements
    actionBtnDiv.appendChild(addNewInvBtn)
    actionBtnDiv.appendChild(delInvBtn)
    actionBtnDiv.appendChild(renInvBtn)
    //Return
    return actionBtnDiv
}

function displayMain(divEl){
    mainEl.innerHTML = ""
    mainEl.appendChild(divEl)
}


function createTableRowElement(dataObj, inventoryTable){
    //Creates and returns tr element
    //dataObj is the object containing row data
    //inventoryTable bool checks if table is invtable (true)
    //or itemTable (false)

    //Set headers
    const header1 = 'name'
    let header2 = 'date' 
    if(!inventoryTable){
        header2 = 'count'
    }
    //Create tr element
    const tr = document.createElement('tr')
    tr.className = "tr-data-row"
    //Create tds
    const td1 = document.createElement('td')
    td1.textContent = dataObj[header1]
    const td2 = document.createElement('td')
    td2.textContent = dataObj[header2]
    tr.appendChild(td1)
    tr.appendChild(td2)
    //Create eventlistener
    tr.addEventListener('click', (e) => {
        toggleRow(tr, inventoryTable)
    })
    return tr
}

function addNewInventory(){
    console.log("Creating new inventory.")
    const newInvName = prompt("Please name your new inventory.").trim()
    if(newInvName){
        const inventory = {
            name: newInvName,
            date: formatDate(new Date()),
            items: []
        }
        const data = JSON.parse(localStorage.getItem(appDataKey))
        data['inventories'].push(inventory)
        localStorage.setItem(appDataKey, JSON.stringify(data))
        //Reload inventory table
        displayMain(createInventoryListDiv())
    }
    
}

function formatDate(date){
    //Converts date in desired string format
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
}

function deleteInventory(){
    const row = findSelectedRow(true)
    const invName = row.firstChild.textContent
    const invDate = row.lastChild.textContent
    if(confirm(`Are you sure you want to delete ${invName} (${invDate})?`)){
        console.log(`Delecting inventory name: ${invName}`)
        const data = JSON.parse(localStorage.getItem(appDataKey))
        console.log(data)
        const inventories = data['inventories']
        console.log(inventories)
        const invIndex = findIndexOfInventory(inventories, invName, invDate)
        if(invIndex >= 0){
            data['inventories'].splice(invIndex, 1)
        }
        localStorage.setItem(appDataKey, JSON.stringify(data))
        //reload
        displayMain(createInventoryListDiv())
    }
    
}

function findIndexOfInventory(invArray, invName, invDate){
    for(let i = 0; i < invArray.length; i++){
        if(invArray[i].name === invName && invArray[i].date === invDate){
            return i
        }
    }
    return -1
}

function renameInventory(){
    const row = findSelectedRow(true)
    const invName = row.firstChild.textContent
    const invDate = row.lastChild.textContent
    const newName = (prompt(`What would you like to rename ${invName} to?`)).trim()
    if(newName){
        console.log(`Renaming ${invName} inventory to ${newName} `)
        const data = JSON.parse(localStorage.getItem(appDataKey))
        const inventories = data['inventories']
        const invIndex = findIndexOfInventory(inventories, invName, invDate)
        if(invIndex >= 0){
            data['inventories'][invIndex].name = newName
        }
        localStorage.setItem(appDataKey, JSON.stringify(data))
        //reload
        displayMain(createInventoryListDiv())
    }
}

function toggleRow(trElement, inventoryTable){
    //Deselects row if selected and vice versa
    //If row is not selected, it deselects all  rows
    //Then selects target row
    //inventoryTable bool checks if it's the invTable
    //false means it is the item table

    //Check if selected
    if(rowSelected(trElement)){ //selected
        //Deselect
        trElement.classList.remove("row-selected")
        delInvBtnEl.disabled = true
        renInvBtnEl.disabled = true
    }
    else{ //not selected
        //Delesecting all other rows
        deselectAllRows(inventoryTable)
        trElement.classList.add("row-selected")
        delInvBtnEl.disabled = false
        renInvBtnEl.disabled = false
    }
}

function rowSelected(trElement){
    //Check if a row is selected
    const classes = trElement.classList
    return classes.contains("row-selected")
}

function deselectAllRows(inventoryTable){
    let tableEl
    if(inventoryTable){
        tableEl = invTableEl
    }
    else{
        tableEl = itemTableEl
    }
    const rows = tableEl.children
    for(let row of rows){
        const classes = row.classList
        if(classes.contains("row-selected")){
            classes.remove("row-selected")
        }
    }
}

function findSelectedRow(inventoryTable){
    //Finds selected row in table and returns it
    //Searches invTable if inventoryTable is true
    //If false, searches itemTable
    //Returns selected row or null if no rows selected
    let tableEl
    if(inventoryTable){
        tableEl = invTableEl
    }
    else{
        tableEl = itemTableEl
    }
    const rows = tableEl.children
    for(let row of rows){
        const classes = row.classList
        if(classes.contains("row-selected")){
            return row
        }
    }
    return null
}

//Check Local Storage for data
const data = localStorage.getItem(appDataKey)
//If not present, add default data to localstorage
if(!data){
    localStorage.setItem(appDataKey, JSON.stringify(defaultAppData))
}

//Load inventories
displayMain(createInventoryListDiv())

//TODO use parameters to be able to load an inventory without needing a separate endpoint
//const urlParams = new URLSearchParams(window.location.search)
//console.log(urlParams.get('inv'))