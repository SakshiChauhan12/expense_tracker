
import React, { useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import ExpenseFormPage from './pages/ExpenseFormPage';
import ExpenseListPage from './pages/ExpenseListPage';
import { getExpensesFromBackend, setExpensesInBackend } from './service/localStorage';
import expenseReducer from './reducers/expenseReducer';
import './styles/tailwind.css';

function App() {
  const [editId, setEditId] = useState(-1);
  const [expenses, dispatchExpenseAction] = useReducer(expenseReducer, []);

  useEffect(() => {
    getExpensesFromBackend().then((expensesVal) => {
      dispatchExpenseAction({
        type: 'FILL',
        payload: { expenses: expensesVal },
      });
    });
  }, []);
console.log("from app",expenses)
  useEffect(() => {
    if (expenses === null) {
      return; // data not loaded from the backend yet
    }
    setExpensesInBackend(expenses).then(() => console.log('Saved expenses successfully!'));
  }, [expenses]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-indigo-600 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-4xl font-bold text-center">Expense Tracker</h1>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-8 py-4">
            <NavLink
              to=""
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-lg font-medium ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              Add Expense
            </NavLink>
            <NavLink
              to="expenses"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-lg font-medium ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              View Expenses
            </NavLink>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Routes>
                <Route
                  path=""
                  element={
                    <ExpenseFormPage
                      editId={editId}
                      setEditId={setEditId}
                      expenses={expenses}
                      dispatchExpenseAction={dispatchExpenseAction}
                    />
                  }
                />
                <Route
                  path="expenses"
                  element={
                    <ExpenseListPage
                      setEditId={setEditId}
                      expenses={expenses}
                      dispatchExpenseAction={dispatchExpenseAction}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 mt-12">
          <div className="text-center text-sm">
            <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
