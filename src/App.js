import React, {useState, useEffect} from 'react';
import "./Component/Expense.css"
import ExpenseForm from './Component/ExpenseForm';
import ExpenseList from './Component/ExpenseList';
import Alert from './Component/Alert';
import { uuid } from 'uuidv4';


// const initialExpenses = [
//   {id:uuid(),charge:"rent",amount:1600},
//   {id:uuid(),charge:"car payment",amount:400},
//   {id:uuid(),charge:"credit card bill",amount:1200}
// ];
// console.log(initialExpenses)

const initialExpenses = localStorage.getItem('expenses')?JSON.parse(localStorage.getItem('expenses')) :[]

function App() { 
  //creating for all expenses, add expense
  const [expenses,setExpenses]=useState(initialExpenses);
  // console.log(expenses)
  //state for single expense
  const [charge,setCharge]=useState('');
// state for single amount
  const [amount,setAmount]=useState('');
//Alert
  const[alert,setAlert]=useState({show: false})
//edit
const[edit,setEdit]=useState(false)
//Id
const[id,setId]=useState(0)
////*****functionality*********/
useEffect(() => {
  console.log('we called useEffect');
  localStorage.setItem('expenses', JSON.stringify(expenses))
}, [expenses])
////*****functionality*********/
//handle charge alert

  function handlCharge(e){
    // console.log(`charge : ${e.target.value}`)
    setCharge(e.target.value)
  }
//handle amount alert

  function handleAmount(e){
    // console.log(`amount : ${e.target.value}`)
    setAmount(e.target.value)

  }

  function handleAlert({type,text}){
  setAlert({show:true, type, text})
  setTimeout(()=>{
    setAlert({show:false})
  },2000)
  }

  function handleSubmit(e){
    e.preventDefault()
    // console.log(charge,amount);
    if(charge !== "" /*not an empty string*/ && amount>0/*amount is non zero value*/){ 
      if(edit){
        let tempEdit = expenses.map(item=>{ //if we edit the array by using ternary operator by checking condition  
        return item.id===id?{...item,charge,amount} :item//we can override charge and amount rest is kept as it is by using spread operator
        });
        setExpenses(tempEdit)//pushing new editted values into setExpenses
        setEdit(false)//after editing changing button status changes to submit
        handleAlert({ type:"danger", text:"item is Edited"})

      } else{
        const singleExpense = {id:uuid(), charge, amount};//assinging new variable and pushing value from charge and amount
        setExpenses([...expenses,singleExpense]);//spread operator is used to keep previous data and add new data
        handleAlert({type:"success", text:"item added"});
      }
   
    setCharge('');//clearing input tab of charge and amount
    setAmount('');
    
    }else{
      handleAlert({type:'danger',text:`charge and amount can't be empty`})
    }
  };
// clear all items
function clearItems(){
  console.log("cleared all items")
  setExpenses([])//setting setExpenses equal to new null array.deleing entire list of arrays
  handleAlert({ type:"danger", text:"all items are deleted"})
};

//handle delete
function handleDelete(id){
const del = expenses.filter(item=>item.id !== id);// filter function used to create a new array deleting one array from it
setExpenses(del) //then making setExpenses equal to new array removing previous array 
handleAlert({ type:"danger", text:"item is deleted"})
};

//handle Edit
function handleEdit(id){
let expense=expenses.find(item=>item.id===id)//selectingor finding the object to edit
let {charge,amount} = expense;//destructuring the array
setCharge(charge);//calling back this function to edit
setAmount(amount);//calling back this function to edit
setEdit(true); //change submit button to edit button by making setedit true
setId(id);

}
  

  return (
  <div className="App">
{alert.show && <Alert type={alert.type} text={alert.text}/>}
<Alert/>
<h1 className="App" style={{color:"orange"}}> Budget Calculator</h1>
<main>
<ExpenseForm charge={charge} amount={amount} 
handleCharge={handlCharge} handleAmount={handleAmount}
handleSubmit={handleSubmit} edit={edit}/>

<ExpenseList expenses={expenses} clearItems={clearItems} handleDelete={handleDelete} handleEdit={handleEdit}/>
</main>

<h1 style={{color:"orange"}}>
  Total Spending : {''}
  <span className="total">
    ${expenses.reduce((acc,curr)=>{
return (acc += parseInt(curr.amount))   //as we use this to add all the expenses and show Final total amount
    },0)}
  </span>
</h1>




  
  </div>
);
}
 

export default App;
