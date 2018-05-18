import React, { Component } from 'react';
import './style.css';

import Block from './../Block';
import Account from './../Account';
import IssuedAssets from './../IssuedAssets';
import Witness from './../Witness';
import Nodes from './../Nodes';

import Info from './../../containers/Info'
import AccountInfo from './../../containers/AccountInfo'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class BlockExplorer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocksSelected: true,
            accountsSelected: true,
            witnessesSelected: true,
            assetsSelected: true,
            nodesSelected: true
        };

        this.toggleBlocksClass= this.toggleBlocksClass.bind(this);
        this.toggleAccountsClass= this.toggleAccountsClass.bind(this);
        this.toggleWitnessesClass= this.toggleWitnessesClass.bind(this);
        this.toggleAssetsClass= this.toggleAssetsClass.bind(this);
        this.toggleNodesClass= this.toggleNodesClass.bind(this);
        this.toggleAllClassStatesToFalse= this.toggleAllClassStatesToFalse.bind(this);
    }

    toggleBlocksClass() {
        const currentState = this.state.blocksSelected;
        this.toggleAllClassStatesToFalse();
        this.setState({ blocksSelected: !currentState });
    };

    toggleAccountsClass() {
        const currentState = this.state.accountsSelected;
        this.toggleAllClassStatesToFalse();
        this.setState({ accountsSelected: !currentState });
    };

    toggleWitnessesClass() {
        const currentState = this.state.witnessesSelected;
        this.toggleAllClassStatesToFalse();
        this.setState({ witnessesSelected: !currentState });
    };

    toggleAssetsClass() {
        const currentState = this.state.assetsSelected;
        this.toggleAllClassStatesToFalse();
        this.setState({ assetsSelected: !currentState });
    };

    toggleNodesClass() {
        const currentState = this.state.nodesSelected;
        this.toggleAllClassStatesToFalse();
        this.setState({ nodesSelected: !currentState });
    };

    toggleAllClassStatesToFalse() {
        this.setState({ blocksSelected: true });
        this.setState({ accountsSelected: true });
        this.setState({ witnessesSelected: true });
        this.setState({ assetsSelected: true });
        this.setState({ nodesSelected: true });
    };

  render() {
    return (
          <Router>
            <div>
              <div className="Othercontainer">

                  <ul>
                      <li><Link onClick={this.toggleBlocksClass} className={this.state.blocksSelected ? 'navLink': 'navLinkSelected'} to="/blockchainexplorer/block">Blocks</Link></li>
                      <li><Link onClick={this.toggleAccountsClass} className={this.state.accountsSelected ? 'navLink': 'navLinkSelected'} to="/blockchainexplorer/account">Accounts</Link></li>
                      <li><Link onClick={this.toggleWitnessesClass} className={this.state.witnessesSelected ? 'navLink': 'navLinkSelected'} to="/blockchainexplorer/witness">Witnesses</Link></li>
                      <li><Link onClick={this.toggleAssetsClass} className={this.state.assetsSelected ? 'navLink': 'navLinkSelected'} to="/blockchainexplorer/issuedassets">Assets</Link></li>
                      <li><Link onClick={this.toggleNodesClass} className={this.state.nodesSelected ? 'navLink': 'navLinkSelected'} to="/blockchainexplorer/nodes">Nodes</Link></li>
                  </ul>


              </div>
              <Route exact path="/blockchainexplorer/account" component={Account}/>
              <Route exact path="/blockchainexplorer/witness" component={Witness}/>
              <Route exact path="/blockchainexplorer/issuedassets" component={IssuedAssets}/>
              <Route exact path="/blockchainexplorer/block" component={Block}/>
              <Route exact path="/blockchainexplorer/nodes" component={Nodes}/>


              <Route exact path="/blockchainexplorer/witness/:witnessAddress" component={Info}/>
              <Route exact path="/blockchainexplorer/account/:accountAddress" component={AccountInfo}/>
            </div>
          </Router>
    );
  }
}

export default BlockExplorer;
