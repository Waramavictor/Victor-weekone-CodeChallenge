import React, { useState, useEffect } from 'react';
import './TransactionContainer.css';

const TransactionContainer = () => {
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  const [searchTrans, setSearchTrans] = useState('');
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (newTransaction.date && newTransaction.description && newTransaction.category && newTransaction.amount) {
      setTransactions([...transactions, newTransaction]);
      setNewTransaction({
        date: "",
        description: "",
        category: "",
        amount: "",
      });
    };
  };

  const filteredTransactions = searchTrans ? transactions.filter((transaction) => transaction.description.toLowerCase().includes(searchTrans.toLowerCase())) : transactions;

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  return (
    <div>
      <div>
      <input
        type="text"
        className='searchcontainer'
        placeholder='Search transactions'
        value= {searchTrans}
        onChange = {(e) => setSearchTrans(e.target.value)}
      />
      </div>


      <div className='form'>
        <form onSubmit={addTransaction}>
          <input
            type="date"
            name='date'
            placeholder='Enter date'
            className='input'
            value={newTransaction.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name='description'
            placeholder='Enter description'
            className='input'
            value={newTransaction.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name='category'
            placeholder='Enter category'
            className='input'
            value={newTransaction.category}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name='amount'
            placeholder='Enter amount'
            className='input'
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
          <div>
          <button type="submit" >Add Transaction</button>
          </div>
        </form>
      </div>


      <div className='transactionitems'>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>ksh. {transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionContainer;