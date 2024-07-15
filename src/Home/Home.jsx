import React, { useEffect, useState } from 'react';
import CustomerChart from '../CustomerChart/CustomerChart';
// import '../output.css'
import axios from 'axios';

export default function Home() {
  function sortByCustomerId(array) {
    return array.sort((a, b) => a.customer_id - b.customer_id);
  };


  const [customerData, setCustomerData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [filter, setFilter] = useState('');


  // get customer data

  async function getCustomer() {
    try {
      let response = await axios.get(`http://localhost:5000/customers`);
      setCustomerData(response?.data)
      // console.log(response?.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // transaction data

  async function getTransaction() {
    try {
      let response = await axios.get(`http://localhost:5000/transactions`);
      setTransactionData(response?.data)
      // console.log(response?.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    getCustomer();
    getTransaction();
  }, []);


  // const sortedTransactions = sortByCustomerId(transactionData);

  //show chart  

  const handleCustomerChange = (customerId) => {
    setSelectedCustomerId(customerId);

  };
  const customerTransactions = transactionData.filter(
    transaction => transaction.customer_id === selectedCustomerId
  );

  // get customer name

  const getCustomerName = (id) => {
    const customer = customerData.find(customer => customer.id == id);
    return customer ? customer.name : 'Unknown';
  };

  //  get value from search input

  const handleUserSearch = (e) => {
    setFilter(e.target.value);
    // document.getElementsByClassName('customerChart').classList.add('hidden')
    // console.log(e.target.value);

  };

  // filter table by customer name or transaction amount

  const filteredTable = transactionData.filter(
    transaction => {
      const filterCustomerName = getCustomerName(transaction.customer_id).toString().toLowerCase();
      const transactionAmount = transaction.amount.toString();
      return filterCustomerName.includes(filter.toLowerCase()) || transactionAmount.includes(filter);

    }
  );


  return (

    <div className="relative overflow-x-auto my-10">
      <h1 className='text-center text-2xl mb-3 text-blue-600'>Customer Data Transaction</h1>
      <div className="mb-6">
        <input onChange={handleUserSearch} type="text" placeholder='Search by customer name or transaction amount' id="searchInput" className="bg-gray-50 mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>

      <table className="w-[80%] mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Customer name
            </th>
            {/* <th scope="col" className="px-6 py-3">
                    Customer id
                </th> */}
            <th scope="col" className="px-6 py-3">
              Transaction date
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction amount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>

          {filteredTable.map((transaction) => <tr key={transaction.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {getCustomerName(transaction.customer_id)}
            </td>
            {/* <td  className="px-6 py-4">
                {transaction.customer_id}

                </td> */}
            <td className="px-6 py-4">
              {transaction.date}
            </td>
            <td className="px-6 py-4">
              {transaction.amount}
            </td>
            <td className="px-6 py-4">
              <button onClick={() => handleCustomerChange(transaction.customer_id)} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">View chart</button>
            </td>
          </tr>)}

        </tbody>
      </table>
      <div className={`mt-10 ${selectedCustomerId ? 'block' : 'hidden'} customerChart`}>
        <CustomerChart transactions={customerTransactions} />
      </div>
    </div>
  )
};
