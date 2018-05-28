import React, { Component } from 'react';
import './style.css';
import '../css/style.css';

import {DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import Service from './../utils/service.js';

class Nodes extends Component {
    constructor(props){
        super(props);

        this.state = {
            nodes:[],
            dropdown:"Select An Item",
            searchbar:""
        }

        this.getNodes("nodes","","");

        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleSearchEvent = this.handleSearchEvent.bind(this);
    }

    handleDropDownChange(event){
        this.setState({
            dropdown: event
        });
    }

    handleSearchBarChange(event){
        this.setState({
            searchbar: event.target.value
    });
    }

    handleSearchEvent(event){
        this.getNodes("nodes", this.state.searchbar, this.state.dropdown);
    }

    getNodes(type, filter, field){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity(type, filter, field);
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        this.setState({
            nodes:response.hits.hits
        });
    }

    render() {
        return (
            <div className="Nodes dropDown">
                <Row className="padding boarder-bottom-tron componentTableHeader">
                        <Col xs={12} md={8} >
                            <div className="leftAlign">
                                <DropdownButton
                                        title={this.state.dropdown}
                                        key={"asd"}
                                        id={"type"}
                                        bsStyle="default"
                                        onChange={this.handleDropDownChange}>
                                    <MenuItem eventKey="host" onSelect={this.handleDropDownChange}>host</MenuItem>
                                    <MenuItem eventKey="country" onSelect={this.handleDropDownChange}>country</MenuItem>
                                    <MenuItem eventKey="city" onSelect={this.handleDropDownChange}>city</MenuItem>
                                    <MenuItem eventKey="countryname" onSelect={this.handleDropDownChange}>countryname</MenuItem>
                                    <MenuItem eventKey="region" onSelect={this.handleDropDownChange}>region</MenuItem>
                                    {/*<MenuItem divider />
                                    <MenuItem eventKey="4">Separated link</MenuItem>*/}
                                </DropdownButton>
                            </div>

                            <div className="paddingLeft">
                                <input
                                    type="input"
                                    className="witnessSearchBar"
                                    placeholder="Enter Search Term.... "
                                    onChange={this.handleSearchBarChange}
                                />
                            </div>
                        </Col>

                        <Col xs={6} md={4}>


                            <div className="btn resultsText">Results: {this.state.nodes.length}</div>

                            <input
                                type="submit"
                                value="Search"
                                className="btn btn-light rightAlign witnessRightAlignPadding"
                                placeholder=""
                                onClick={this.handleSearchEvent}
                            />
                         </Col>


                </Row>
                <div className="">
                    <WitnessTable nodes={this.state.nodes}/>
                </div>
            </div>
        );
    }
}

class WitnessTable extends React.Component {
    render(){
        return(
            <table id="nodesTable padding">
                <tbody>
                    <tr>
                        <th className="tableTitle textAlignCenter">#</th>
                        <th className="tableTitle textAlignCenter">host</th>
                        <th className="tableTitle textAlignCenter">country</th>
                        <th className="tableTitle textAlignCenter">city</th>
                        <th className="tableTitle textAlignCenter">countryname</th>
                        <th className="tableTitle textAlignCenter">region</th>
                    </tr>
                    {
                        this.props.nodes.map((nodes, index) => {
                            var output =
                            <tr key={nodes._source.host}>
                                <td className="tableRowHeight">{index +1}</td>
                                <td><Link className="tableLink" to={`/blockchainexplorer/nodes/${nodes._source.host}`}>{nodes._source.host}</Link></td>
                                <td>{nodes._source.country}</td>
                                <td>{nodes._source.city}</td>
                                <td>{nodes._source.countryname}</td>
                                <td>{nodes._source.region}</td>
                            </tr>
                            return output;
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default Nodes;
