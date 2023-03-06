import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState(1);
  const [need, setNeed] = useState(1);
  const [symbol, setSymbol] = useState(1);
  const onChange = (event) => {
    setCost(event.target.value);
    setNeed(1);
  };
  const handleInput = (event) => {
    setNeed(event.target.value);
  };
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div>
        <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
        {loading ? (
          <strong>loading...</strong>
        ) : (
          <select onChange={onChange}>
            <option>Select Coin!</option>
            {coins.map((coin, index) => (
              <option
                key={index}
                value={coin.quotes.USD.price}
                id={coin.symbol}
                symbol={coin.symbol}
              >
                {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
      <br />
      <div>
        <hr />
        <h3>Change USD to Coin</h3>
        <div>
          <label htmlFor="dollor">USD </label>
          <input
            value={need}
            placeholder="dollor"
            type="number"
            onChange={handleInput}
          />
        </div>
        <div>
          <h2>You can get {need / cost}</h2>
          <h2></h2>
        </div>
      </div>
    </div>
  );
}

export default App;
