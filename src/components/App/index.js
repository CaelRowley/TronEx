import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

import Visualisation from './../Visualisation';
import BlockExplorer from './../BlockExplorer';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  getTronixPrice(){
    // add get tronix price => https://api.coinmarketcap.com/v1/ticker/tronix/
  }

  render() {
    return (
      <div className="App fullContainer">
        <div className="App-header">
          <h2 className="tronText container">TronEx</h2>
        </div>

        <div className="App-nav container">
          <Router>
            <div>
            <table className="tableHover">
              <tbody>
                <tr>
                  <td><Link className="navLink" to="/visualisation">Visualisation</Link></td>
                  <td><Link className="navLink" to="/blockchainexplorer">BlockExplorer</Link></td>
                </tr>
              </tbody>
            </table>

              <Route exact path="/visualisation" component={Visualisation}/>
              <Route exact path="/blockchainexplorer" component={BlockExplorer}/>

              {/*<Route exact path="/block" render={() => (
                <h3>Please select a blockHash.</h3>
              )}/>*/}

            {/*  <Route exact path="/witness" render={() => (
                <h3>Please select a blockHash.</h3>
              )}/>*/}

              {/*<Route path="/block/:blockHash" component={Block}/>*/}
            </div>
          </Router>
         {/* </div>*/}
        </div>
        <footer className="footer">
          <div className="App-header">
            <h2 className="tronText container">TronEx</h2>
          </div>
        </footer>
      </div>

    );
  }
}
export default App;
