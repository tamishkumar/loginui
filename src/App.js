import React, { Component } from 'react';
// import './App.css';
import ScrollToTop from "./utilities/scrollToTop";
import Routes from "./routes";

class App extends Component {
  render() {
    return (
      <ScrollToTop>
        <Routes  />
      </ScrollToTop>
    );
  }
}

export default App;
