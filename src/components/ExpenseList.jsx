const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense }) => {
  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Title</th>
          <th>Category</th>
          <th>Payment Mode</th>
          <th>Type</th>
          <th>Beneficiary</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.date}</td>
            <td>${expense.amount}</td>
            <td>{expense.title}</td>
            <td>{expense.category}</td>
            <td>{expense.paymentMode}</td>
            <td>{expense.recurring ? 'Recurring' : 'One-time'}</td>
            <td>{expense.beneficiary}</td>
            <td>{expense.tags?.join(', ')}</td>
            <td>
              <button onClick={() => onDeleteExpense(index)}>Delete</button>
              <button onClick={() => onEditExpense(index)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
