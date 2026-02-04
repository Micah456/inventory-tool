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
    //Create table innerHtml
    let tableInnerHtml = `
        <tr class="tr-header">
            <th>Inventory Name</th>
            <th>Date Created</th>
        </tr>
    `
    const inventories = JSON.parse(localStorage.getItem(appDataKey))['inventories']
    tableInnerHtml += createTableRowHtml(inventories, "name", "date")
    table.innerHTML = tableInnerHtml
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
    delInvBtn.textContent = "Delete Inventory"
    delInvBtn.addEventListener('click', deleteInventory)
    delInvBtn.disabled = true
    //Create renInvBtn
    const renInvBtn = document.createElement('button')
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

function createTableRowHtml(dataArray, header1, header2){
    //Creates and returns html string for a table row
    //dataArray is the array of objects containing the data
    //The headers are the headers to access the data from the objects
    //If false, the table is an item table
    let html = ""
    dataArray.forEach((obj) => {
        html += `
            <tr class="tr-data-row">
                <td>${obj[header1]}</td>
                <td>${obj[header2]}</td>
            </tr>
        `
    })
    return html
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
    console.log("Deleting inventory.")
}

function renameInventory(){
    console.log("Renaming inventory.")
}

//Check Local Storage for data
const data = localStorage.getItem(appDataKey)
//If not present, add default data to localstorage
if(!data){
    localStorage.setItem(appDataKey, JSON.stringify(defaultAppData))
}

//Load inventories
displayMain(createInventoryListDiv())