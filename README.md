# inventory-tool
A tool to keep inventory on type of items

This will be a static webpage using only HTML, JS, and CSS
Data will be saved locally via local storage.

## How it will work
1) User creates an inventory type and names it
2) They can add items and values to the inventory
3) There will be a button that will allow them to increment/decrement the value of the items
4) They will be able to remove items from the inventory
5) They will be able to delete an inventory
6) An error will be thrown if decrementing by an amount that an item doesn't have

## Data
- Data will be object containing an array of inventories
- Inventories will be an object containing an array of items
{
  'inventories' : []
}
- Items will be an object containing a name and a count
{ 'name' : 'item1', 'count'  : 2}



# Things to implement
1) Check if inventory present - if it is, load it. If not, create a default
{
  'inventories' : []
}
2) Create an inventory - prompts user to enter a name for the inventory, then creates and saves an inventory object in the inventory array
3) Show inventories - default page shows a list of inventories. Shows none if none exist and prompts the user to create
4) Open an inventory - opens the inventory. This will show a table of items and their counts, or nothing if there are no items
5) Create an item - opens a dialog that allows you to enter the item and the count
6) Increment and decrement: on the open inventory, on the line of the item, there will be an increment and decrement button to allow quick changing of the value. Decrement will be disabled if the value is zero
7) Edit quantity - a button next to the item will allow you to open a dialog and change the value manually
8) Delete item - a button next to the item will allow you to delete the item. The data will be updated and the inventory page reloaded
9) Delete inventory - a button on the page will allow you to delete the inventory. The data will be updated and the index page will be reloaded.
