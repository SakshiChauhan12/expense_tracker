const ExpenseCard = ({ expenses, onDeleteExpense, onEditExpense }) => {
    return (
        <div className="expense-card-container">
            {expenses.map((expense, index) => (
                <div className="expense-card" key={index}>
                    <div className="expense-details">
                        <p><strong>Date:</strong> {expense.date}</p>
                        <p><strong>Amount:</strong> ${expense.amount}</p>
                        <p><strong>Title:</strong> {expense.title}</p>
                        <p><strong>Category:</strong> {expense.category}</p>
                        <p><strong>Payment Mode:</strong> {expense.paymentMode}</p>
                        <p><strong>Type:</strong> {expense.recurring ? 'Recurring' : 'One-time'}</p>
                        <p><strong>Beneficiary:</strong> {expense.beneficiary}</p>
                        <p><strong>Tags:</strong> {expense.tags?.join(', ') || 'None'}</p>
                    </div>
                    <div className="expense-actions">
                        <button onClick={() => onEditExpense(index)}>Edit</button>
                        <button onClick={() => onDeleteExpense(index)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExpenseCard;

  