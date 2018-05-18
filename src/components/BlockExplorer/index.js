import React, { Component } from 'react';
import './style.css';

import Block from './../Block';
import Account from './../Account';
import IssuedAssets from './../IssuedAssets';
import Witness from './../Witness';
import Nodes from './../Nodes';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class BlockExplorer extends Component {
  render() {
    return (
          <Router>
            <div>
              <div className="container">

                  <ul>
                      <li><Link className="navLink" to="/blockchainexplorer/block">Blocks</Link></li>
                      <li><Link className="navLink" to="/blockchainexplorer/account">Accounts</Link></li>
                      <li><Link className="navLink" to="/blockchainexplorer/witness">Witnesses</Link></li>
                      <li><Link className="navLink" to="/blockchainexplorer/issuedassets">Assets</Link></li>
                      <li><Link className="navLink" to="/blockchainexplorer/nodes">Nodes</Link></li>
                  </ul>


              </div>
              <Route exact path="/blockchainexplorer/account" component={Account}/>
              <Route exact path="/blockchainexplorer/witness" component={Witness}/>
              <Route exact path="/blockchainexplorer/issuedassets" component={IssuedAssets}/>
              <Route exact path="/blockchainexplorer/block" component={Block}/>
              <Route exact path="/blockchainexplorer/nodes" component={Nodes}/>



              {/*<Route exact path="/block" render={() => (
                <h3>Please select a blockHash.</h3>
              )}/>*/}

            {/*  <Route exact path="/witness" render={() => (
                <h3>Please select a blockHash.</h3>
              )}/>*/}

              {/*<Route path="/block/:blockHash" component={Block}/>*/}
            </div>
          </Router>
    );
  }
}

export default BlockExplorer;
