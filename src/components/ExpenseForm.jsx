
import { DateInput, AmountInput, TitleInput, CategoryInput, PaymentModeInput, RecurringInput, BeneficiaryInput, TagsInput } from './Inputs';

const ExpenseForm = ({ onSaveExpense, formValues, setFormValue, resetFormValues }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const tags = typeof formValues.tags === "string" 
      ? formValues.tags.split(',') 
      : Array.isArray(formValues.tags) 
      ? formValues.tags 
      : []; // Default to an empty array if tags are not valid
  
    onSaveExpense(
      { 
        date: formValues.date,
        amount: formValues.amount,
        title: formValues.title,
        category: formValues.category || formValues.newCategory,
        paymentMode: formValues.paymentMode,
        recurring: formValues.recurring,
        beneficiary: formValues.beneficiary,
        tags, // Updated
      }, 
      formValues.index
    );
  
    resetFormValues();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <DateInput value={formValues['date']} onChange={val => setFormValue(val, 'date')} />
      <AmountInput value={formValues['amount']} onChange={val => setFormValue(val, 'amount')} />
      <TitleInput value={formValues['title']} onChange={val => setFormValue(val, 'title')} />
      <CategoryInput selectedCategory={formValues['category']} onChange={val => setFormValue(val, 'category')} newCategory={formValues['newCategory']} onNewCategoryChange={val => setFormValue(val, 'newCategory')} />
      <PaymentModeInput selectedMode={formValues['paymentMode']} onChange={val => setFormValue(val, 'paymentMode')} />
      <RecurringInput value={formValues['recurring']} onChange={val => setFormValue(val, 'recurring')} />
      <BeneficiaryInput selectedBeneficiary={formValues['beneficiary']} onChange={val => setFormValue(val, 'beneficiary')} />
      <TagsInput value={formValues['tags']} onChange={val => setFormValue(val, 'tags')} />
      { formValues['index'] ? (<button type="submit">Edit Expense</button>) : (<button type="submit">Add Expense</button>) }
    </form>
  );
};

export default ExpenseForm;