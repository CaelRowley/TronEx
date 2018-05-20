import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import '../css/style.css';

import Visualisation from './../Visualisation';
import BlockExplorer from './../BlockExplorer';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  getTronixPrice(){
    // add get tronix price => https://api.coinmarketcap.com/v1/ticker/tronix/
  }

  constructor(props) {
        super(props);
        this.state = {
            visualisationSelected: false,
            blockExplorerSelected: false,
            tabIsSelected: false,
        };

        this.clickVisualisation= this.clickVisualisation.bind(this);
        this.clickBlockExplorer= this.clickBlockExplorer.bind(this);
        this.findLiVisualisationState= this.findLiVisualisationState.bind(this);
        this.findLiBlockExplorerState= this.findLiBlockExplorerState.bind(this);
    }

    clickVisualisation() {
        const currentState = this.state.visualisationSelected;
        const tabState = this.state.tabIsSelected;
        this.setState({ visualisationSelected: true });
        this.setState({ blockExplorerSelected: false });
        this.setState({ tabIsSelected: !tabState });
    };

    clickBlockExplorer() {
        const currentState = this.state.blockExplorerSelected;
        const tabState = this.state.tabIsSelected;
        this.setState({ blockExplorerSelected: true });
        this.setState({ visualisationSelected: false });
        this.setState({ tabIsSelected: !tabState });
    };

    findLiVisualisationState() {
        const blockExplorerState = this.state.blockExplorerSelected;
        const visualisationState = this.state.visualisationSelected;
        const selectedState = this.state.selectedState;

        if(visualisationState)
            return 'appLiSelected';

        else if(blockExplorerState)
            return 'appLiOtherSelected';

        else
            return 'appLi'
    };

    findLiBlockExplorerState() {
        const blockExplorerState = this.state.blockExplorerSelected;
        const visualisationState = this.state.visualisationSelected;
        const selectedState = this.state.selectedState;

        if(blockExplorerState)
            return 'appLiSelected';

        else if(visualisationState)
            return 'appLiOtherSelected';

        else
            return 'appLi'
    };


  render() {
    return (
      <div className="textAlignCenter fullContainer">
        <div className="bcGrey555 colorWhite">
          <h2 className="textAlignLeft paddingLeft container">TronEx</h2>
        </div>

        <div className="container">
          <Router>
            <div>

            <ul className="appUl">
                <li className={this.findLiVisualisationState()}><Link onClick={this.clickVisualisation} className={this.state.visualisationSelected ? 'appNavLinkSelected': 'appNavLink'} to="/visualisation">Visualisation</Link></li>
                <li className={this.findLiBlockExplorerState()}><Link onClick={this.clickBlockExplorer} className={this.state.blockExplorerSelected ? 'appNavLinkSelected': 'appNavLink'} to="/blockchainexplorer">BlockExplorer</Link></li>
            </ul>

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
