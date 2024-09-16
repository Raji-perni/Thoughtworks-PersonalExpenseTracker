import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    type: "income",
  });

  useEffect(() => {
    if (loggedIn) {
      fetchTransactions();
    }
  }, [loggedIn]);

  const logout = () => {
    setLoggedIn(false);
    setTransactions([]);
  };

  const addTransaction = () => {
    const newTransaction = { ...formData };
    setTransactions([...transactions, newTransaction]); // In a real app, send this data to the server.
    setFormData({ date: "", category: "", amount: "", type: "income" });
    displayTransaction(newTransaction);
  };

  const fetchTransactions = () => {
    // In a real application, fetch transactions from the server (backend).
    // For simplicity, we will use dummy data.
    const dummyTransactions = [
      {
        date: "2022-02-15",
        category: "Groceries",
        amount: 50.0,
        type: "expense",
      },
      {
        date: "2022-02-14",
        category: "Salary",
        amount: 2000.0,
        type: "income",
      },
      { date: "2022-02-13", category: "Rent", amount: 1000.0, type: "expense" },
    ];
    setTransactions(dummyTransactions);
  };

  const displayTransaction = (transaction) => {
    alert(
      `Transaction Added:\nDate: ${transaction.date}\nCategory: ${
        transaction.category
      }\nAmount: $${transaction.amount.toFixed(2)}\nType: ${transaction.type}`
    );
  };

  return (
    <div className="App">
      <h1>Personal Finance Tracker</h1>

      {!loggedIn ? (
        <div id="loginForm">
          <h2>Login</h2>
          <form>
            <label>Username:</label>
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />

            <label>Password:</label>
            <input
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <button
              type="button"
              onClick={() => setLoggedIn(true)}
              className="loginBtn"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div id="transactionForm">
            <h2>Add Transaction</h2>
            <form>
              <label>Date:</label>
              <input
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />

              <label>Category:</label>
              <input
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />

              <label>Amount:</label>
              <input
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />

              <label>Type:</label>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <button
                type="button"
                onClick={addTransaction}
                className="addTransactionBtn"
              >
                Add Transaction
              </button>
            </form>
          </div>

          <div id="dashboard">
            <h2>Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p>No transactions available.</p>
            ) : (
              <ul>
                {transactions.map((transaction, index) => (
                  <li key={index}>
                    Date: {transaction.date} - Category: {transaction.category}{" "}
                    - Amount: ${transaction.amount.toFixed(2)} - Type:{" "}
                    {transaction.type}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
