
import './App.css';
import { BrowserRouter, Routes, Route,NavLink } from 'react-router-dom';
import ExpenseFormPage from './pages/ExpenseFormPage';
import ExpenseListPage from './pages/ExpenseListPage';
import { useState } from 'react';

function App() {
  const [editIndex,setEditIndex]=useState(-1);
  return (
    <BrowserRouter>
     <div className="App">
     <nav className="tab">
       <NavLink to="" className="add_expenses">Add Expense</NavLink>
        <NavLink to="expenses" className={"view_expenses"}>View Expense</NavLink>
     </nav>
     <Routes>
      <Route path='/' element={<ExpenseFormPage  editIndex={editIndex}></ExpenseFormPage>}></Route>
      <Route path='expenses' element={<ExpenseListPage setEditIndex={setEditIndex}  ></ExpenseListPage>}></Route>
     </Routes>
     </div>
    </BrowserRouter>
   
  );
}

export default App;
