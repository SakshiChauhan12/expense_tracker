const ExpenseList = ({ expenses, onDeleteExpense,onEditExpense }) => {
    return (
      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Title</th>
              <th>Category</th>
              <th>Payment Mode</th>
              <th>Recurring</th>
              <th>Beneficiary</th>
              <th>Tags</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.date}</td>
                <td>{expense.amount}</td>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{expense.paymentMode}</td>
                <td>{expense.recurring ? 'Recurring' : 'One time'}</td>
                <td>{expense.beneficiary}</td>
                <td>{expense.tags.join(', ')}</td>
                <td>
                  <button className="delete-btn" onClick={() => onDeleteExpense(index)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => onEditExpense(index)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ExpenseList;
  