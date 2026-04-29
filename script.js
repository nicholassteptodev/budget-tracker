let income = 0;
let expenses = 0;

// 🔹 LOAD SAVED DATA (PUT IT HERE)
let savedIncome = localStorage.getItem("income");
let savedExpenses = localStorage.getItem("expenses");

if (savedIncome !== null) {
  income = Number(savedIncome);
}

if (savedExpenses !== null) {
  expenses = Number(savedExpenses);
}

// 🔹 GET ELEMENTS
const incomeTotal = document.getElementById("income-total");
const expenseTotal = document.getElementById("expense-total");
const balance = document.getElementById("balance");

const incomeInput = document.getElementById("income-input");
const expenseInput = document.getElementById("expense-input");
const expenseName = document.getElementById("expense-name");

const addIncomeButton = document.getElementById("add-income");
const addExpenseButton = document.getElementById("add-expense");

const expenseList = document.getElementById("expense-list");

// 🔹 UPDATE FUNCTION
function updateSummary() {
  incomeTotal.textContent = income;
  expenseTotal.textContent = expenses;
  balance.textContent = income - expenses;

  // 🔹 SAVE DATA
  localStorage.setItem("income", income);
  localStorage.setItem("expenses", expenses);
}

// 🔹 ADD INCOME
addIncomeButton.addEventListener("click", function () {
  const amount = Number(incomeInput.value);

  income = income + amount;
  incomeInput.value = "";

  updateSummary();
});

// 🔹 ADD EXPENSE
addExpenseButton.addEventListener("click", function () {
  const name = expenseName.value;
  const amount = Number(expenseInput.value);

  expenses = expenses + amount;

  const listItem = document.createElement("li");
  listItem.textContent = name + " - $" + amount + " ";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    expenses = expenses - amount;
    expenseList.removeChild(listItem);
    updateSummary();
  });

  listItem.appendChild(deleteButton);
  expenseList.appendChild(listItem);

  expenseName.value = "";
  expenseInput.value = "";

  updateSummary();
});

// 🔹 RUN ON PAGE LOAD
updateSummary();