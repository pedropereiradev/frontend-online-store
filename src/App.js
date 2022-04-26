import React, { Component } from 'react';
import './App.css';
import Categories from './Components/Categories';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Categories />
      </div>
    );
  }
}

export default App;
