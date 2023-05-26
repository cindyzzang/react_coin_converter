// import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from 'react';

/* 20달러로 코인 몇 개 살 수 있는지 챌린지 만들기 !!*/
function App() {
  const [loading,setLoading] =useState(true);
  const [coins,setCoins] = useState([]);
  const [calc, setCalc] = useState(1);

  const onChange = (event) => {
    setCalc(event.target.value)
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    })
  },[])
  return (
    <div>
      <h1>The Coins! { loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : 
      <select 
      onChange={onChange}
      >
      {coins.map((coin) => (
      <option key = {coin.id} value={coin.quotes.USD.price}>
        {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD 
      </option>
      ))}
    </select>
    }
      <hr/>
      <div>
        <input type="text" placeholder='$ 20 USD'/>
        can buy 
        <input type="text" value={calc/20}/> coins
        
      </div>
    </div>
  );
}

export default App;
