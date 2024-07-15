import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './output.css'
import Home from './Home/Home'
import axios from 'axios'


function App() {
  // const [count, setCount] = useState(0)
  // const [data, setData] = useState({ customers: [], transactions: [] });

  // useEffect(() => {
  //   async function getCustomer() {
  //     try {
  //       const response = await axios.get('http://localhost:5000/customers');
  //       setData((prevData) => ({ ...prevData, customers: response.data }));
  //     } catch (error) {
  //       console.error('Error fetching customers:', error);
  //     }
  //   }
    
  //   async function getTransactions() {
  //     try {
  //       const response = await axios.get('http://localhost:5000/transactions');
  //       setData((prevData) => ({ ...prevData, transactions: response.data }));
  //     } catch (error) {
  //       console.error('Error fetching transactions:', error);
  //     }
  //   }

  //   getCustomer();
  //   getTransactions();
  // }, []);

  return (
    <>
      <Home/>
    </>
  )
}

export default App
