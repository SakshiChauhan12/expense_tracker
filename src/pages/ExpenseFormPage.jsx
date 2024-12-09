import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { useNavigate } from 'react-router-dom';

const ExpenseFormPage = ({ editId, setEditId, expenses, dispatchExpenseAction }) => {
  const navigate = useNavigate();

  const handleSaveExpense = (expense, id) => {
    const action = {};
    if (id > -1) {
      action.type = 'EDIT';
      action.payload = { id, expense };
    } else {
      action.type = 'ADD';
      action.payload = { expense };
    }
    dispatchExpenseAction(action);
    setEditId(-1);
    navigate('/expenses');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 mb-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Daily Expense Tracker</h1>
      
      {/* Add a nice form container with a background, padding, and shadow */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-md">
        <ExpenseForm
          onSaveExpense={handleSaveExpense}
          editId={editId}
          key={editId}
          expenses={expenses || []}
        />
      </div>
      
      {/* Optionally, add a Back Button with Tailwind for a good UX */}
      <div className="mt-4 text-center">
        <button 
          onClick={() => navigate('/expenses')} 
          className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-500 focus:outline-none transition duration-300"
        >
          Back to Expenses
        </button>
      </div>
    </div>
  );
};

export default ExpenseFormPage;
