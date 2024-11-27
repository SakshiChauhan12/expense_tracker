
import React,{useState} from 'react';
import ExpenseList from '../components/ExpenseList';
import { useNavigate } from 'react-router-dom';
import { useFormValues } from '../context/FormContext';

// function forceUpdate(){
//     const [,setValue] = useState(0);
//     return () => setValue(value => value + 1);
// }
function  useForceUpdate(){
    const [,setValue] = useState(0);
    return () => setValue(value => value + 1);
}
const ExpenseListPage = () => {

    const expenseDataString=localStorage.getItem('expenses_data_key')||"[]";
    const forceUpdate=useForceUpdate();
    const { setFormValues } = useFormValues();


    const expenses=JSON.parse(expenseDataString);
    const navigate=useNavigate();
   
    const handleDeleteExpense=(ind)=>{
        expenses.splice(ind,1);
        const updatedExpensesString=JSON.stringify(expenses);
        localStorage.setItem('expenses_data_key',updatedExpensesString);
        // window.location.reload();
        forceUpdate();
         
    }
    const handleEditExpense=(ind)=>{
        const expense = expenses[ind];
        setFormValues({...expense, index: ind});
        navigate('/');
    }
    return ( 
        <div>
            <h1>------------ExpenseList-----------</h1>
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} onEditExpense={handleEditExpense}>

            </ExpenseList>

        </div>
     );
}


 
export default ExpenseListPage;