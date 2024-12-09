import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <ul className="space-y-6">
      {expenses.map((expense) => (
        <li key={expense.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-xl transition-shadow bg-white">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-900">{expense.date}</p>
              <p className="text-sm text-gray-700">{`${expense.amount} - ${expense.title} - ${expense.category} - ${expense.paymentMode}`}</p>
              <p className="text-sm text-gray-500">{`${expense.recurring ? 'Recurring' : 'One-time'} - Beneficiary: ${expense.beneficiary}`}</p>
              <p className="text-sm text-gray-500">Tags: {expense.tags?.join(', ')}</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => onDeleteExpense(expense.id)} 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none transition-colors"
              >
                Delete
              </button>
              <button 
                onClick={() => onEditExpense(expense.id)} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
