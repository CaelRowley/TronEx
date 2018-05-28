import React, { Component } from 'react';
import './style.css';
import '../css/style.css';
import tronExTitle from './TronExTitle.png';
import tronExWallPaper from './TronExWallPaper.jpg';


import Visualisation from './../Visualisation';
import BlockExplorer from './../BlockExplorer';

import CurrencyFormat from 'react-currency-format';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

let CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();

class App extends Component {
  getTronixPrice(){
    // add get tronix price => https://api.coinmarketcap.com/v1/ticker/tronix/
  }

  constructor(props) {


        super(props);
        this.getCryptoData("tron");

        this.state = {
            visualisationSelected: false,
            blockExplorerSelected: false,
            // backgroundImage: "url('https://www.colorhexa.com/333333.png')",
            backgroundImage: "url('http://i.imgur.com/aDNTwZR.jpg')",
            crypto: {
                "market_cap_usd": "",
                "price_usd": "",
                "24h_volume_usd": "",
                "rank": "",
                "percent_change_1h": ""
            },
        };

        this.clickVisualisation= this.clickVisualisation.bind(this);
        this.clickBlockExplorer= this.clickBlockExplorer.bind(this);
        this.findLiVisualisationState= this.findLiVisualisationState.bind(this);
        this.findLiBlockExplorerState= this.findLiBlockExplorerState.bind(this);
    }

    getCryptoData(cryptoName) {
        coinmarketcap.get(cryptoName, coin => {
            // let jsonCoin = {
            //     "market_cap_usd": "$" + coin.market_cap_usd.toFixed(2),
            //     "price_usd": coin.price_usd,
            //     "24h_volume_usd": coin["24h_volume_usd"],
            //     "rank": coin.rank,
            //     "percent_change_1h": coin.percent_change_1h
            // };
            this.setState({crypto: coin});
        });
    };

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
          <div className="textAlignCenter fullContainer backGround">
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
                      <li className="appSpacerPadding">_</li>

                      <ul className="coinDataUl">
                          <li className="coinDataLi">Market Cap<br/><CurrencyFormat value={this.state.crypto.market_cap_usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                          <li className="coinDataLi">Price per TRX<br/><CurrencyFormat value={this.state.crypto.price_usd} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                          <li className="coinDataLi">24 hour volume<br/><CurrencyFormat value={this.state.crypto["24h_volume_usd"]} displayType={'text'} thousandSeparator={true} prefix={'$'} /></li>
                          <li className="coinDataLi">RANK<br/>{this.state.crypto.rank}</li>
                          <li className="coinDataLi">1h change<br/>{this.state.crypto.percent_change_1h}</li>
                      </ul>
                      <li className="appSpacer2Padding">_</li>

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
