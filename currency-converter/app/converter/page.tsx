"use client";

import React, { useState } from 'react';
import axios from 'axios';
import countryList from '../component/codes';

const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PKR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9.]/g, ''); // Allow only numbers and a dot
    setAmount(value);
  };

  const getExchangeRate = async () => {
    if (fromCurrency && toCurrency && amount) {
      try {
        const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        if (rate) {
          setConvertedAmount(parseFloat(amount) * rate);
        } else {
          alert(`Conversion rate from ${fromCurrency} to ${toCurrency} is not available.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again later.');
      }
    }
  };

  return (
    <div className="converter-container">
      <div className="converter-box">
        <u><i><h2>Currency Converter</h2></i></u>
        <form className="converter-form">
          <div className="amount">
            <u><p>Enter Amount</p></u>
            <input
              type="text"
              className="input"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="dropdown">
            <div className="from">
              <u><p>From</p></u>
              <div className="select-container">
                <img
                  src={`https://flagsapi.com/${countryList[fromCurrency]}/flat/64.png`}
                  alt={`${fromCurrency} Flag`}
                />
                <select name="from" className="select" onChange={handleFromChange} value={fromCurrency}>
                  {Object.keys(countryList).map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
            <div className="to">
              <u><p>To</p></u>
              <div className="select-container">
                <img
                  src={`https://flagsapi.com/${countryList[toCurrency]}/flat/64.png`}
                  alt={`${toCurrency} Flag`}
                />
                <select name="to" className="select" onChange={handleToChange} value={toCurrency}>
                  {Object.keys(countryList).map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="msg">
            {convertedAmount !== null ? `Converted Amount: ${convertedAmount.toFixed(2)}` : ''}
          </div>
          <button className="button" type="button" onClick={getExchangeRate}>
            Get Exchange Rate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Converter;
