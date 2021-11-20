import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [productList, setsProductList] = useState([]);
  const apiItems = "http://127.0.0.1:5000/api/GoodPricer?item=beef";
  const fetchData = async () => {
    const response = await axios.get(apiItems);
    setsProductList(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  let itemsToRender;
  if (productList) {
    itemsToRender = productList.map((product) => {
      return (
        <div>
          {product.Product} {product.Price}
        </div>
      );
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <ul>{itemsToRender}</ul>
      </header>
    </div>
  );
}

export default App;
