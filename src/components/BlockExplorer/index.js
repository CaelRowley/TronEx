import React, { Component } from 'react';
import './style.css';

import Block from './../Block';
import Account from './../Account';
import IssuedAssets from './../IssuedAssets';
import Witness from './../Witness';
import Nodes from './../Nodes';

import Info from './../../containers/Info'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class BlockExplorer extends Component {
  render() {
    return (
          <Router>
            <div>
              <div className="padding">
                <table className="tableLower">
                  <tbody>
                    <tr>
                      <td><Link className="center" to="/blockchainexplorer/block">Blocks</Link></td>
                      <td><Link className="center" to="/blockchainexplorer/account">Accounts</Link></td>
                      <td><Link className="center" to="/blockchainexplorer/witness">Witnesses</Link></td>
                      <td><Link className="center" to="/blockchainexplorer/issuedassets">Assets</Link></td>
                      <td><Link className="center" to="/blockchainexplorer/nodes">Nodes</Link></td>
                    </tr>
                  </tbody>
                </table>
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

              <Route exact path="/blockchainexplorer/witness/:witnessAddress" component={Info}/>
            </div>
          </Router>
    );
  }
}
export default BlockExplorer;