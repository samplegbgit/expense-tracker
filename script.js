const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const balanceEl = document.getElementById('balance');

let expenses = [];

function updateBalance() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  balanceEl.textContent = `₹${total}`;
}

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.className = 'expense-item';
    li.innerHTML = `
      ${expense.name} - ₹${expense.amount}
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
  updateBalance();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('expense-name').value.trim();
  const amount = parseFloat(document.getElementById('expense-amount').value);

  if (name && amount > 0) {
    expenses.push({ name, amount });
    renderExpenses();
    expenseForm.reset();
  } else {
    alert('Please enter valid details');
  }
});
