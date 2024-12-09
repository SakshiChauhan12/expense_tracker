import React, { useState } from 'react';
import { DateInput, AmountInput, TitleInput, CategoryInput, PaymentModeInput, RecurringInput, BeneficiaryInput, TagsInput } from './Inputs';

const emptyForm = () => ({
  date: new Date().toISOString().split('T')[0],
  amount: '',
  title: '',
  category: '',
  newCategory: '',
  paymentMode: 'Cash',
  recurring: false,
  beneficiary: 'Self',
  tags: '',
});

function formValuesFromLocalStorage(id, expenses) {
  const expense = expenses.find(expense => expense.id === id);
  return {
    ...expense,
    newCategory: '',  // TODO: fix later
    tags: expense.tags?.join ? expense.tags.join(',') : expense.tags,
  };
}

const ExpenseForm = ({ onSaveExpense, editId, expenses }) => {
  const prefilledForm = editId > -1 ? formValuesFromLocalStorage(editId, expenses) : emptyForm();
  const [formValues, setFormValues] = useState(prefilledForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      ...formValues,
      amount: +formValues.amount,
      category: formValues.category || formValues.newCategory,
      newCategory: undefined,
      tags: formValues.tags?.split(','),
    };
    onSaveExpense(expense, editId);
    setFormValues(emptyForm());
  };

  const handleInputChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitButtonText = editId > -1 ? "Edit Expense" : "Add Expense";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <DateInput value={formValues.date} onChange={(val) => handleInputChange('date', val)} />
      <AmountInput value={formValues.amount} onChange={(val) => handleInputChange('amount', val)} />
      <TitleInput value={formValues.title} onChange={(val) => handleInputChange('title', val)} />
      <CategoryInput
        selectedCategory={formValues.category}
        onChange={(val) => handleInputChange('category', val)}
        newCategory={formValues.newCategory}
        onNewCategoryChange={(val) => handleInputChange('newCategory', val)}
      />
      <PaymentModeInput selectedMode={formValues.paymentMode} onChange={(val) => handleInputChange('paymentMode', val)} />
      <RecurringInput value={formValues.recurring} onChange={(val) => handleInputChange('recurring', val)} />
      <BeneficiaryInput selectedBeneficiary={formValues.beneficiary} onChange={(val) => handleInputChange('beneficiary', val)} />
      <TagsInput value={formValues.tags} onChange={(val) => handleInputChange('tags', val)} />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default ExpenseForm;
