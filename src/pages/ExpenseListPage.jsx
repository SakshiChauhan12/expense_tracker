import React, { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import { useNavigate } from 'react-router-dom';
import ExpenseCards from '../components/ExpenseCards';
import FilterDropdown from '../components/FilterDropdown';

const ExpenseListPage = ({ setEditId, expenses, dispatchExpenseAction }) => {
  const [showList, setShowList] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]); // Default as empty array
  const navigate = useNavigate();

  // Debugging line to check if expenses are passed correctly
  console.log('Expenses:', expenses);

  if (expenses === null || expenses.length === 0) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  const allCategories = [];
  expenses?.forEach((expense) => {
    if (!allCategories.includes(expense.category)) {
      allCategories.push(expense.category);
    }
  });

  // Debugging line to check allCategories
  console.log('All Categories:', allCategories);

  const onSelectCategory = (category) => {
    console.log('Selected Category:', category); // Debugging selected category
    setSelectedCategories((prevSelectedCategories) => [
      ...prevSelectedCategories,
      category,
    ]);
  };

  const onDeselectCategory = (category) => {
    console.log('Deselected Category:', category); // Debugging deselected category
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.filter((val) => val !== category)
    );
  };

  const handleDeleteExpense = (ind) => {
    console.log('Deleting expense with index:', ind); // Debugging delete action
    dispatchExpenseAction({
      type: 'DELETE',
      payload: { ind },
    });
  };

  const handleEditExpense = (id) => {
    console.log('Editing expense with ID:', id); // Debugging edit action
    setEditId(id);
    navigate('/');
  };

  const toggleView = () => {
    console.log('Toggling view to:', showList ? 'Expense Cards' : 'Expense List'); // Debugging view toggle
    setShowList((val) => !val);
  };

  const heading = showList ? 'Expense List' : 'Expense Cards';
  const ExpenseView = showList ? ExpenseList : ExpenseCards;

  const filteredExpenses =
    selectedCategories.length > 0
      ? expenses?.filter((expense) => selectedCategories.includes(expense.category))
      : expenses;

  // Debugging filtered expenses
  console.log('Filtered Expenses:', filteredExpenses);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{heading}</h1>
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Toggle View
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <FilterDropdown
          allOptions={allCategories}
          selectedOptions={selectedCategories}
          onSelectOption={onSelectCategory}
          onDeselectOption={onDeselectCategory}
          resetSelection={() => {
            console.log('Resetting selection'); // Debugging reset action
            setSelectedCategories([]);
          }}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <ExpenseView
          expenses={filteredExpenses || []}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
        />
      </div>
    </div>
  );
};

export default ExpenseListPage;
