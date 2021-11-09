import React from 'react'//child of expense list
import {MdEdit,MdDelete} from 'react-icons/md'

function ExpenseItem({expense, handleEdit, handleDelete }) {
const{id,charge,amount} = expense; // destructuring expenses props coming from app.js and 

    return (
        <li className="item">
            <div className="info">
                <span className="expense">
                {charge}    
                </span>
                <span className="amount">
                ${amount}    
                </span>
            </div>
            <div>
                <button className="edit-btn" onClick={()=>handleEdit(id)} aria-label="edit button"><MdEdit/></button>
                <button className="clear-btn" onClick={()=>handleDelete(id)} aria-label="delete button"><MdDelete/></button>
            </div>
        </li>
        
    )
}

export default ExpenseItem
