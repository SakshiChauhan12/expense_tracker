import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { useNavigate } from 'react-router-dom';

const ExpenseFormPage = ({ editIndex, setEditIndex, expenses, dispatchExpenseAction }) => {
    const navigate = useNavigate();

    const handleSaveExpense = (expense, ind) => {
        const action = {}
        if (ind > -1) {
            action.type = "EDIT";
            action.payload = { ind, expense };
        } else {
            action.type = "ADD";
            action.payload = { expense };
        }
        dispatchExpenseAction(action);
        setEditIndex(-1);
        navigate('/expenses')
    };

    return (
        <>
            <h1>Daily Expense Tracker</h1>
            <ExpenseForm onSaveExpense={handleSaveExpense} editIndex={editIndex} key={editIndex} expenses={expenses || []} />
        </>
    );
};

export default ExpenseFormPage;