import React from 'react';
import ExpenseList from '../components/ExpenseList';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ExpenseCard from '../components/ExpenseCard';
import './ExpenseListPage.css';

const ExpenseListPage = ({ setEditIndex, expenses, dispatchExpenseAction }) => {
    const navigate = useNavigate();

    const handleDeleteExpense = (ind) => {
        dispatchExpenseAction({
            type: "DELETE",
            payload: { ind },
        });
    };

    const handleEditExpense = (ind) => {
        setEditIndex(ind);
        navigate('/');
    };
    const[table,setTable]=useState(true);

    return (
        <>
        <div className="expense-list-page">
            <h1>Expense List</h1>
            <button onClick={() => setTable(true)}>Tabular View</button>
            <button onClick={() => setTable(false)}>Card View</button>
            <div className="expense-list-container">
                {table ? (
                    <ExpenseList
                        expenses={expenses || []}
                        onDeleteExpense={handleDeleteExpense}
                        onEditExpense={handleEditExpense}
                    />
                ) : (
                    <ExpenseCard
                        expenses={expenses || []}
                        onDeleteExpense={handleDeleteExpense}
                        onEditExpense={handleEditExpense}
                    />
                )}
            </div>
        </div>
    </>
    
    );
};

export default ExpenseListPage;