import React, { Component } from 'react';
import './style.css';
import '../css/style.css';
import tronExTitle from './TronExTitle.png';

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
            // backgroundImage: "url('https://www.colorhexa.com/333333.png')",
            backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5D4FnPsyagcVIw4XTFBryD7wnv7fsFZsAf_M2G2-c-2IpnX5b')",            
        };

        this.clickVisualisation= this.clickVisualisation.bind(this);
        this.clickBlockExplorer= this.clickBlockExplorer.bind(this);
        this.findLiVisualisationState= this.findLiVisualisationState.bind(this);
        this.findLiBlockExplorerState= this.findLiBlockExplorerState.bind(this);
    }

    clickVisualisation() {
        this.setState({ visualisationSelected: true });
        this.setState({ blockExplorerSelected: false });
    };

    clickBlockExplorer() {
        this.setState({ blockExplorerSelected: true });
        this.setState({ visualisationSelected: false });
    };

    findLiVisualisationState() {
        const blockExplorerState = this.state.blockExplorerSelected;
        const visualisationState = this.state.visualisationSelected;
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
        if(blockExplorerState)
            return 'appLiSelected';
        else if(visualisationState)
            return 'appLiOtherSelected';
        else
            return 'appLi'
    };


  render() {
    return (
          <div className="textAlignCenter fullContainer" style={{backgroundImage: this.state.backgroundImage}}>
            <div className="bcGrey777 colorWhite">
              {// <h2 className="textAlignLeft paddingLeft container appHeader">TronEx</h2>
          }
              <ul className="appUlHeader">
                  <li className="liHeaderTextPadding">_</li>

              </ul>
            </div>


                <div className="container">

                  <Router>
                    <div>

                    <ul className="appUl">
                        <li className="tronTitle"><img src={tronExTitle} alt="TronEx" /></li>
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
