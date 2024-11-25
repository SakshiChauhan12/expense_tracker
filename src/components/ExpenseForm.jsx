import React,{useState,useEffect} from 'react';
import {DateInput, AmountInput, TitleInput,CategoryInput, PaymentModeInput, RecurringInput , BeneficiaryInput ,TagsInput} from './Inputs';
const ExpenseForm = ({onSaveExpense , editIndex, prefilledExpense }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [recurring, setRecurring] = useState(false);
    const [beneficiary, setBeneficiary] = useState('');
    const [tags, setTags] = useState('');


    useEffect(() => {
        if (editIndex > -1) {
          setDate(prefilledExpense.date);
          setAmount(prefilledExpense.amount);
          setTitle(prefilledExpense.title);
          setCategory(prefilledExpense.category);
          setNewCategory('');
          setPaymentMode(prefilledExpense.paymentMode);
          setRecurring(prefilledExpense.recurring);
          setBeneficiary(prefilledExpense.beneficiary);
          setTags(prefilledExpense.tags);
        }
      }, [editIndex]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Ensure tags is a string before splitting
        const processedTags = typeof tags === 'string' ? tags.split(',') : [];
    
        // Use category or newCategory
        const finalCategory = category || newCategory;
    
        // Pass the processed tags to onSaveExpense
        onSaveExpense({
            date,
            amount: +amount,
            title,
            category: finalCategory,
            paymentMode,
            recurring,
            beneficiary,
            tags: processedTags,
        });
    
        // Reset the form fields
        setDate(new Date().toISOString().split('T')[0]);
        setAmount('');
        setTitle('');
        setCategory('');
        setNewCategory('');
        setPaymentMode('');
        setRecurring(false);
        setBeneficiary('Self');
        setTags(''); // Ensure this is a string for the next submission
    };
    
    return ( 
        <form onSubmit={handleSubmit}>
         <DateInput value={date} onChange={setDate}></DateInput>
         <AmountInput value={amount} onChange={setAmount}></AmountInput>
         <TitleInput value={title} onChange={setTitle}></TitleInput>
         <CategoryInput selectedCategory={category} onChange={setCategory} newCategory={newCategory} onNewCategoryChange={setNewCategory} ></CategoryInput>
         <PaymentModeInput selectedMode={paymentMode} onChange={setPaymentMode} />
         <RecurringInput value={recurring} onChange={setRecurring} />
         <BeneficiaryInput selectedBeneficiary={beneficiary} onChange={setBeneficiary} />
         <TagsInput value={tags} onChange={setTags} />
        {editIndex>-1 ?(<button type="submit">Update Expense</button>):(<button type="submit">Add Expense</button>)} 

        </form>
     );
}
 
export default ExpenseForm; 
