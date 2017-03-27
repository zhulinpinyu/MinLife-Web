import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Button,
  Footer,
  FooterText
} from 'react-weui';

//import styles
import 'weui';
import 'react-weui/lib/react-weui.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Button>hello wechat</Button>
        </p>
        <Footer>
          <FooterText>Copyright &copy; 2017 MinLife</FooterText>
        </Footer>
      </div>
    );
  }
}

export default App;
