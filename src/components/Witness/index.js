import React, { Component } from 'react';
import './style.css';
import '../css/style.css';

import {DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import Service from './../utils/service.js';

class Witness extends Component {
    constructor(props){
        super(props);

        this.state = {
            witnesses:[],
            dropdown:"Select An Item",
            searchbar:""
        }

        this.getWitnesses("witnesses","","");

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
        this.getWitnesses("witnesses", this.state.searchbar, this.state.dropdown);
    }

    render() {
        return (
            <div className="Witness">
                <Row className="padding boarder-bottom-tron">
                        <Col xs={12} md={8} >
                            <div className="leftAlign">
                                <DropdownButton
                                        title={this.state.dropdown}
                                        key={"asd"}
                                        id={"type"}
                                        bsStyle="btn-light"
                                        onChange={this.handleDropDownChange}>
                                    <MenuItem eventKey="address" onSelect={this.handleDropDownChange}>Address</MenuItem>
                                    <MenuItem eventKey="voteCount" onSelect={this.handleDropDownChange}>Vote Count</MenuItem>
                                    <MenuItem eventKey="url" onSelect={this.handleDropDownChange}>Site Name</MenuItem>
                                    <MenuItem eventKey="totalProduced" onSelect={this.handleDropDownChange}>Total Produced</MenuItem>
                                    <MenuItem eventKey="totalMissed" onSelect={this.handleDropDownChange}>Total Missed</MenuItem>
                                    <MenuItem eventKey="latestBlockNum" onSelect={this.handleDropDownChange}>Latest Block Number</MenuItem>
                                    <MenuItem eventKey="latestsLotNum" onSelect={this.handleDropDownChange}>Latest Slot Number</MenuItem>
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


                            <div className="btn">Results: {this.state.witnesses.length}</div>

                            <input
                                type="submit"
                                value="Search"
                                className="btn btn-light rightAlign witnessRightAlignPadding"
                                placeholder=""
                                onClick={this.handleSearchEvent}
                            />
                         </Col>


                </Row>
                <div className="padding">
                    <WitnessTable witnesses={this.state.witnesses}/>
                </div>
            </div>

        );
    }

    getWitnesses(type, filter, field){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity(type, filter, field);
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        this.setState({
            witnesses:response.hits.hits
        });

        /*output += "<td>pubKey: " + witness._source.pubkey + '</td>';*/
        /*output += "<td>isJobs: " + witness._source.isjobs + '</td>';*/
    }
}

class WitnessTable extends React.Component {
    render(){
        return(
            <table id="witnessTable padding">
                <tbody>
                    <tr>
                        <th className="tableTitle textAlignCenter">#</th>
                        <th className="tableTitle textAlignCenter">Address</th>
                        <th className="tableTitle textAlignCenter">Vote Count</th>
                        <th className="tableTitle textAlignCenter">Site Name</th>
                        <th className="tableTitle textAlignCenter">Total Produced</th>
                        <th className="tableTitle textAlignCenter">Total Missed</th>
                        <th className="tableTitle textAlignCenter">Latest Block</th>
                        <th className="tableTitle textAlignCenter">Latest Slot</th>
                    </tr>
                    {
                        this.props.witnesses.map((witness, index) => {
                            var output =
                            <tr key={witness._source.address}>
                                <td className="tableRowHeight">{index +1}</td>
                                <td><Link className="tableLink" to={`/blockchainexplorer/witness/${witness._source.address}`}>{witness._source.address}</Link></td>
                                <td>{witness._source.voteCount}</td>
                                <td><Link className="tableUrl" to="{witness._source.url}">{witness._source.url}</Link></td>
                                <td>{witness._source.totalProduced}</td>
                                <td>{witness._source.totalMissed}</td>
                                <td>{witness._source.latestBlockNum}</td>
                                <td>{witness._source.latestsLotNum}</td>
                            </tr>
                            return output;
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default Witness;
