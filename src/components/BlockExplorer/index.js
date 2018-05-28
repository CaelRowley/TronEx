import React, { Component } from 'react';
import './style.css';
import '../css/style.css';

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
            blocksSelected: false,
            accountsSelected: false,
            witnessesSelected: false,
            assetsSelected: false,
            nodesSelected: false
        };

        this.toggleBlocksClass= this.toggleBlocksClass.bind(this);
        this.toggleAccountsClass= this.toggleAccountsClass.bind(this);
        this.toggleWitnessesClass= this.toggleWitnessesClass.bind(this);
        this.toggleAssetsClass= this.toggleAssetsClass.bind(this);
        this.toggleNodesClass= this.toggleNodesClass.bind(this);
        this.toggleAllClassStatesToFalse= this.toggleAllClassStatesToFalse.bind(this);
    }

    toggleBlocksClass() {
        this.toggleAllClassStatesToFalse();
        this.setState({ blocksSelected: true});
    };

    toggleAccountsClass() {
        this.toggleAllClassStatesToFalse();
        this.setState({ accountsSelected: true });
    };

    toggleWitnessesClass() {
        this.toggleAllClassStatesToFalse();
        this.setState({ witnessesSelected: true });
    };

    toggleAssetsClass() {
        this.toggleAllClassStatesToFalse();
        this.setState({ assetsSelected: true });
    };

    toggleNodesClass() {
        this.toggleAllClassStatesToFalse();
        this.setState({ nodesSelected: true });
    };

    toggleAllClassStatesToFalse() {
        this.setState({ blocksSelected: false });
        this.setState({ accountsSelected: false });
        this.setState({ witnessesSelected: false });
        this.setState({ assetsSelected: false });
        this.setState({ nodesSelected: false });
    };

    findLiBlocksState() {
        const blocksSelected = this.state.blocksSelected;
        const accountsSelected = this.state.accountsSelected;
        const witnessesSelected = this.state.witnessesSelected;
        const assetsSelected = this.state.assetsSelected;
        const nodesSelected = this.state.nodesSelected;
        if(blocksSelected)
            return 'blockExplorerLiSelected';
        else if(accountsSelected || witnessesSelected || assetsSelected || nodesSelected)
            return 'blockExplorerLiOtherSelected';
        else
            return 'blockExplorerLi'
    };

    findLiAccountsState() {
        const blocksSelected = this.state.blocksSelected;
        const accountsSelected = this.state.accountsSelected;
        const witnessesSelected = this.state.witnessesSelected;
        const assetsSelected = this.state.assetsSelected;
        const nodesSelected = this.state.nodesSelected;
        if(accountsSelected)
            return 'blockExplorerLiSelected';
        else if(blocksSelected || witnessesSelected || assetsSelected || nodesSelected)
            return 'blockExplorerLiOtherSelected';
        else
            return 'blockExplorerLi'
    };

    findLiWitnesessState() {
        const blocksSelected = this.state.blocksSelected;
        const accountsSelected = this.state.accountsSelected;
        const witnessesSelected = this.state.witnessesSelected;
        const assetsSelected = this.state.assetsSelected;
        const nodesSelected = this.state.nodesSelected;
        if(witnessesSelected)
            return 'blockExplorerLiSelected';
        else if(accountsSelected || blocksSelected || assetsSelected || nodesSelected)
            return 'blockExplorerLiOtherSelected';
        else
            return 'blockExplorerLi'
    };

    findLiAssetsState() {
        const blocksSelected = this.state.blocksSelected;
        const accountsSelected = this.state.accountsSelected;
        const witnessesSelected = this.state.witnessesSelected;
        const assetsSelected = this.state.assetsSelected;
        const nodesSelected = this.state.nodesSelected;
        if(assetsSelected)
            return 'blockExplorerLiSelected';
        else if(accountsSelected || witnessesSelected || blocksSelected || nodesSelected)
            return 'blockExplorerLiOtherSelected';
        else
            return 'blockExplorerLi'
    };

    findLiNodesState() {
        const blocksSelected = this.state.blocksSelected;
        const accountsSelected = this.state.accountsSelected;
        const witnessesSelected = this.state.witnessesSelected;
        const assetsSelected = this.state.assetsSelected;
        const nodesSelected = this.state.nodesSelected;
        if(nodesSelected)
            return 'blockExplorerLiSelected';
        else if(accountsSelected || witnessesSelected || assetsSelected || blocksSelected)
            return 'blockExplorerLiOtherSelected';
        else
            return 'blockExplorerLi'
    };


  render() {
    return (
          <Router>
            <div>
              <div className="Othercontainer">

                  <ul className="blockExplorerUl">
                      <li className={this.findLiBlocksState()}><Link onClick={this.toggleBlocksClass} className={this.state.blocksSelected ? 'blockExplorerNavLinkSelected': 'blockExplorerNavLink'} to="/blockchainexplorer/block">Blocks</Link></li>
                      <li className={this.findLiAccountsState()}><Link onClick={this.toggleAccountsClass} className={this.state.accountsSelected ? 'blockExplorerNavLinkSelected': 'blockExplorerNavLink'} to="/blockchainexplorer/account">Accounts</Link></li>
                      <li className={this.findLiWitnesessState()}><Link onClick={this.toggleWitnessesClass} className={this.state.witnessesSelected ? 'blockExplorerNavLinkSelected': 'blockExplorerNavLink'} to="/blockchainexplorer/witness">Witnesses</Link></li>
                      <li className={this.findLiAssetsState()}><Link onClick={this.toggleAssetsClass} className={this.state.assetsSelected ? 'blockExplorerNavLinkSelected': 'blockExplorerNavLink'} to="/blockchainexplorer/issuedassets">Assets</Link></li>
                      <li className={this.findLiNodesState()}><Link onClick={this.toggleNodesClass} className={this.state.nodesSelected ? 'blockExplorerNavLinkSelected': 'blockExplorerNavLink'} to="/blockchainexplorer/nodes">Nodes</Link></li>
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
