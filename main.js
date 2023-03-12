let addBtn = document.getElementById('addBtn');
let expenseList = document.getElementById('expenseList');
addBtn.addEventListener("click", addExpense);

displayExpenseList();
expenseList.addEventListener("click", updateList);


function displayExpenseList() {
    let expList = localStorage.getItem("expenses");

    if (expList != null) {
        let expArr = JSON.parse(expList);

        expArr.forEach(exp => {

            // display new added expense into expense list table on page
            let newRow = document.createElement('tr');

            let nameTd = document.createElement('td');
            let amntTd = document.createElement('td');
            let typeTd = document.createElement('td');
            let updateTd = document.createElement('td');
            let delTd = document.createElement('td');

            let editBtn = document.createElement('btn')
            let delBtn = document.createElement('btn')

            // set values within all the elements
            nameTd.textContent = exp.name;
            amntTd.textContent = exp.amount;
            typeTd.textContent = exp.type;

            updateTd.appendChild(editBtn);
            delTd.appendChild(delBtn);

            editBtn.textContent = "Edit";
            editBtn.classList = "btn btn-sm btn-success editExpense"
            delBtn.textContent = "X";
            delBtn.classList = "btn btn-sm btn-danger delExpense"

            newRow.appendChild(nameTd);
            newRow.appendChild(amntTd);
            newRow.appendChild(typeTd);
            newRow.appendChild(updateTd);
            newRow.appendChild(delTd);


            expenseList.appendChild(newRow);

        });
    }

}


function addExpense(event) {
    event.preventDefault();

    const expName = titleCase(document.getElementById('name').value);
    const expType = titleCase(document.getElementById('type').value);
    const expAmount = "₹ " + titleCase(document.getElementById('amount').value);

    document.getElementById('name').value = "";
    document.getElementById('type').value = "";
    document.getElementById('amount').value = "";


    const newExp = {
        "name": expName,
        "amount": expAmount,
        "type": expType
    };

    // get expense list from localstorage
    let expList = localStorage.getItem("expenses");
    if (expList == null) {
        expList = [];
    } else {
        expList = JSON.parse(expList);
    }

    // save new expense into expList
    expList.push(newExp);
    localStorage.setItem("expenses", JSON.stringify(expList));

    // display new added expense into expense list table on page
    let newRow = document.createElement('tr');

    let nameTd = document.createElement('td');
    let amntTd = document.createElement('td');
    let typeTd = document.createElement('td');
    let updateTd = document.createElement('td');
    let delTd = document.createElement('td');

    let editBtn = document.createElement('btn')
    let delBtn = document.createElement('btn')

    // set values within all the elements
    nameTd.textContent = expName;
    amntTd.textContent = expAmount;
    typeTd.textContent = expType;

    updateTd.appendChild(editBtn);
    delTd.appendChild(delBtn);
    editBtn.textContent = "Edit";
    editBtn.classList = "btn btn-sm btn-success editExpense"
    delBtn.textContent = "X";
    delBtn.classList = "btn btn-sm btn-danger delExpense"

    newRow.appendChild(nameTd);
    newRow.appendChild(amntTd);
    newRow.appendChild(typeTd);
    newRow.appendChild(updateTd);
    newRow.appendChild(delTd);


    expenseList.appendChild(newRow);

}


function updateList(event) {
    event.preventDefault();

    if (Array.from(event.target.classList).includes("delExpense")) {
        deleteExpense(event);
    } else if (Array.from(event.target.classList).includes('editExpense')) {
        let item = deleteExpense(event);

        document.getElementById('name').value = item.name;
        document.getElementById('type').value = item.type;
        document.getElementById('amount').value = item.amount;

    }

}


function deleteExpense(event) {
    const currentRow = event.target.parentNode.parentNode;
    // get the index of current row using 'rowIndex'
    const rowIndx = currentRow.rowIndex;

    // fetch the details from localstorage
    let expenseDetails = localStorage.getItem("expenses");
    expenseDetails = JSON.parse(expenseDetails);

    let deletedExp = expenseDetails.splice(rowIndx - 1, 1)[0];

    currentRow.remove();  // remove the complete row

    console.log(expenseDetails);
    // update the localstorage
    if (expenseDetails.length == 0)
        localStorage.clear();
    else
        localStorage.setItem("expenses", JSON.stringify(expenseDetails));

    return deletedExp;
}


function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}