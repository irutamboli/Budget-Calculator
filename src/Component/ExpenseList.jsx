import React from 'react'
import ExpenseItem from './ExpenseItem' //parent of expense item but child of app.js
import {MdDelete} from 'react-icons/md'
function ExpenseList({expenses, clearItems, handleDelete, handleEdit}) {
    return (
        <div>
        <ul className="list">
            {expenses.map((expense)=>{
              return <ExpenseItem key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} />
            })}
            
            </ul> 
            {expenses.length>0 && <button onClick={clearItems} className="btn">Clear Expenses
                <MdDelete className="btn-icon"/>
                </button>}
        </div>
    )
}

export default ExpenseList
