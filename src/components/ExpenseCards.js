

import React from 'react';

const Card = ({ expense, deleteHandler, editHandler }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <p><strong>Date:</strong> {expense.date}</p>
        <p><strong>Amount:</strong> ${expense.amount}</p>
        <p><strong>Title:</strong> {expense.title}</p>
        <p><strong>Category:</strong> {expense.category}</p>
        <p><strong>Payment Mode:</strong> {expense.paymentMode}</p>
        <p><strong>Type:</strong> {expense.recurring ? 'Recurring' : 'One-time'}</p>
        <p><strong>Beneficiary:</strong> {expense.beneficiary}</p>
        <p><strong>Tags:</strong> {expense.tags?.join(', ')}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button 
          onClick={deleteHandler} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
        >
          Delete
        </button>
        <button 
          onClick={editHandler} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const ExpenseCards = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {expenses.map((expense) => (
        <Card
          key={expense.id}
          expense={expense}
          deleteHandler={() => onDeleteExpense(expense.id)}
          editHandler={() => onEditExpense(expense.id)}
        />
      ))}
    </div>
  );
};

export default ExpenseCards;
