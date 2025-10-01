let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
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
  saveToLocalStorage();
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

// Load existing expenses on page load
renderExpenses();
