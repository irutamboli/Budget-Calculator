import React from 'react'
import {MdSend} from 'react-icons/md'
function ExpenseForm({charge, amount, handleCharge, handleAmount, handleSubmit, edit}) {
    return (
        <form onSubmit={handleSubmit}>
             <div>
             <div className="form-group">
                 <label htmlFor="charge">Charge</label>
                 <input type="text" className="form-control" onChange={handleCharge} value={charge} id="charge" name="charge" placeholder='"Ex Text"' />

        </div>
        <div className="form-group">
                 <label htmlFor="amount">Amount</label>
                 <input type="number" className="form-control" onChange={handleAmount} value={amount} id="amount" name="amount" placeholder='"Ex 100"' />

        </div>
            </div>
            <button type="submit" value="amount" className="btn">{edit?"Edit":"Submit"}
            <MdSend/>
            </button>
        </form>
        
    )
}

export default ExpenseForm
