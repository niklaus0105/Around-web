import React, { Component } from 'react';
import { Header } from './Header';
import './App.css';
import { Register } from './Register';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
          <Register/>
      </div>
    );
  }
}

export default App;
