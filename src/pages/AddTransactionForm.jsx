import React from 'react'
const AddTransactionForm = ({description,amount,handleSubmit,setAmount,setDescription,closeForm}) => {

  return (
    <div className="modal">
        <form  onSubmit={handleSubmit}>
            <input type="text" name="description" placeholder="Description" value={description} onChange={(e) => setDescription( e.target.value)} required/>
            <input  name="text" placeholder="Amount" value={amount} onChange={(e) => setAmount( e.target.value)} required/>
            <div>
            <button  type= "submit">Add</button>
            </div>
            <div></div>
            <button  onClick={closeForm}> cancel</button>
        </form>
    </div>
  )
}

export default AddTransactionForm
