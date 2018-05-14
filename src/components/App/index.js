import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

import Block from './../Block';
import Account from './../Account';
import IssuedAssets from './../IssuedAssets';
import Witness from './../Witness';
import Nodes from './../Nodes';

import Visualisation from './../Visualisation';
import BlockExplorer from './../BlockExplorer';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="tronText container">TronEx</h2>
        </div>
        
        <div className="App-nav container">
          <Router>
            <div>
            <table className="tableHover">
              <tbody>
                <tr>
                  <td><Link className="center" to="/visualisation">Visualisation</Link></td>
                  <td><Link className="center" to="/blockchainexplorer">BlockExplorer</Link></td>
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
      </div>
    );
  }
}
export default App;