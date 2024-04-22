import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate,setExchangeRate]=useState(null)

  useEffect(() => {
    const getExchange = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        console.log(response.data);
        setExchangeRate(response.data.rates[toCurrency  ])
      } catch (error) {
        console.log("Error fetching exchange rate:", error);
      }
    };
    getExchange();
  }, [fromCurrency,toCurrency]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleToChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleFromChange = (e) => {
    setFromCurrency(e.target.value);
  };

  return (
    <div className="currency-converter">
      <div className="box"></div>
      <div className="data">
        <h2>Currency Converter</h2>
        <div className="input-container">
          <label htmlFor="amt">Amount : </label>
          <input
            type="number"
            id="amt"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="fromCurrency">From Currency:</label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={handleFromChange}
          >
            {/* options */}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="toCurrency">To Currency:</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={handleToChange}
          >
            {/* options */}
          </select>
        </div>
        <div className="result">
          <p>
            {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
