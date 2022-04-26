import React from 'react';
import * as api from './services/api';
import './App.css';

function App() {
  return (
    <div className="App">
      {
        // api.getCategories().then(categories => {console.log(categories)})
        api.getProductsFromCategoryAndQuery('MLB1055', 'motorola').then(categories => {console.log(categories)})
      }
    </div>
  );
}

export default App;
