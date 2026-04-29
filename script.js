let income = 0;
let expenses = 0;
let expenseItems = [];

let savedIncome = localStorage.getItem("income");
let savedExpenses = localStorage.getItem("expenses");
let savedExpenseItems = localStorage.getItem("expenseItems");

if (savedIncome !== null) {
  income = Number(savedIncome);
}

if (savedExpenses !== null) {
  expenses = Number(savedExpenses);
}

if (savedExpenseItems !== null) {
  expenseItems = JSON.parse(savedExpenseItems);
}

const incomeTotal = document.getElementById("income-total");
const expenseTotal = document.getElementById("expense-total");
const balance = document.getElementById("balance");

const incomeInput = document.getElementById("income-input");
const expenseInput = document.getElementById("expense-input");
const expenseName = document.getElementById("expense-name");

const addIncomeButton = document.getElementById("add-income");
const addExpenseButton = document.getElementById("add-expense");

const expenseList = document.getElementById("expense-list");

function saveData() {
  localStorage.setItem("income", income);
  localStorage.setItem("expenses", expenses);
  localStorage.setItem("expenseItems", JSON.stringify(expenseItems));
}

function updateSummary() {
  incomeTotal.textContent = income;
  expenseTotal.textContent = expenses;
  balance.textContent = income - expenses;

  saveData();
}

function renderExpenses() {
  expenseList.innerHTML = "";

  expenseItems.forEach(function (item, index) {
    const listItem = document.createElement("li");
    listItem.textContent = item.name + " - $" + item.amount + " ";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      expenses = expenses - item.amount;
      expenseItems.splice(index, 1);

      renderExpenses();
      updateSummary();
    });

    listItem.appendChild(deleteButton);
    expenseList.appendChild(listItem);
  });
}

addIncomeButton.addEventListener("click", function () {
  const amount = Number(incomeInput.value);

  if (amount <= 0) {
    alert("Please enter a valid income amount.");
    return;
  }

  income = income + amount;
  incomeInput.value = "";

  updateSummary();
});

addExpenseButton.addEventListener("click", function () {
  const name = expenseName.value;
  const amount = Number(expenseInput.value);

  if (!name || amount <= 0) {
    alert("Please enter an expense name and valid amount.");
    return;
  }

  expenses = expenses + amount;

  expenseItems.push({
    name: name,
    amount: amount
  });

  expenseName.value = "";
  expenseInput.value = "";

  renderExpenses();
  updateSummary();
});

renderExpenses();
updateSummary();