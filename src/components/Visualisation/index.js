import React, { Component } from 'react';
import './style.css';
import '../css/style.css';

import Service from './../utils/service.js';
import graphTemp from './tempGraph.gif';
import graphBlocks from './GraphBlocks.png';
import graphWitnesses from './GraphWitnesses.png';

import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import GraphBlocks from './../../containers/GraphBlocks';
import GraphWitnesses from './../../containers/GraphWitnesses';



class Visualisation extends Component {
    constructor(props) {
        super(props);

        this.state = {
			toGraphNum: 0,
		}

        this.toggle1= this.toggle1.bind(this);
        this.toggle2= this.toggle2.bind(this);
        this.toggle3= this.toggle3.bind(this);
        this.toggle4= this.toggle4.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    };

    toggle1() {
        this.setState({ toGraphNum: 1});
    };

    toggle2() {
        this.setState({ toGraphNum: 2});
    };

    toggle3() {
        this.setState({ toGraphNum: 3});
    };

    toggle4() {
        this.setState({ toGraphNum: 4});
    };

    renderRedirect(){
        if (this.state.toGraphNum === 1) {
            // this.setState({ toGraphNum: 0});
            return <Redirect to="/visualisation/GraphBlocks"/>
        } else if (this.state.toGraphNum === 2) {
            // this.setState({ toGraphNum: 0});
            return <Redirect to="/visualisation/GraphWitnesses"/>
        } else if (this.state.toGraphNum === 3) {
            // this.setState({ toGraphNum: 0});
            return <Redirect to="/visualisation/3"/>
        } else if (this.state.toGraphNum === 4) {
            // this.setState({ toGraphNum: 0});
            return <Redirect to="/visualisation/4"/>
        }
    }


    render() {
        return (
            <Router>

            <div className="Graphs">
                {this.renderRedirect()}
{/*<iframe src="http://localhost:5601/app/kibana#/dashboard/848aeb00-516a-11e8-9f68-8d3552208aeb?embed=true&_g=(refreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3A'2018-05-06T18%3A54%3A19.295Z'%2Cmode%3Aabsolute%2Cto%3A'2018-05-06T19%3A09%3A19.297Z'))" height="1500" width="1700"></iframe>*/}
            <Route exact path="/visualisation/GraphBlocks" component={GraphBlocks}/>
            <Route exact path="/visualisation/GraphWitnesses" component={GraphWitnesses}/>
            <Route exact path="/visualisation/3" component={GraphBlocks}/>
            <Route exact path="/visualisation/4" component={GraphBlocks}/>

                <div>
                    <table className="visualisationGraphTable">
                        <tbody>
                            <tr className="visualisationGraphTr">
                                <td className="visualisationGraphTd" onClick={this.toggle1}><img src={graphBlocks} alt="Blocks Dashboard" className="centerAlign visSizeImage"/><br/>Blocks Dashboard</td>
                                <td className="visualisationGraphTd" onClick={this.toggle2}><img src={graphWitnesses} alt="Witnesses Dashboard" className="centerAlign visSizeImage"/><br/>Witnesses Dashboard</td>
                            </tr>
                            <tr className="visualisationGraphTr">
                                <td className="visualisationGraphTd"><br/>TBD</td>
                                <td className="visualisationGraphTd"><br/>TBD</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
            </Router>

        );
    }
}

export default Visualisation;
