import React, { Component } from 'react';
import './style.css';
import {DropdownButton, MenuItem} from 'react-bootstrap';

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

    handleDropDownChange(e){
        this.setState({
            dropdown: e
        });
    }

    handleSearchBarChange(event){
        this.setState({
            searchbar: event.target.value
        });
    }

    handleSearchEvent(event){
        console.log(this.state.searchbar);
        console.log(this.state.dropdown);
        this.getWitnesses("witnesses", this.state.searchbar, this.state.dropdown);
    }

    render() {
        return (
            <div className="Witness">
                <div className="padding">
                    <input 
                        type="input"
                        className="col-lg-6"
                        placeholder="Enter Search Term.... "
                        onChange={this.handleSearchBarChange}
                    />

                    <div className="col-lg-6">
                            <DropdownButton
                                    title={this.state.dropdown}
                                    key={"asd"}
                                    id={"type"}
                                    className="col"
                                    onChange={this.handleDropDownChange}>
                                <MenuItem eventKey="address" onSelect={this.handleDropDownChange}>Address</MenuItem>
                                <MenuItem eventKey="voteCount" onSelect={this.handleDropDownChange}>Vote Count</MenuItem>
                                <MenuItem eventKey="url" onSelect={this.handleDropDownChange}>Site Name</MenuItem>
                                <MenuItem eventKey="totalmissed" onSelect={this.handleDropDownChange}>Total Missed</MenuItem>
                                <MenuItem eventKey="latestBlockNum" onSelect={this.handleDropDownChange}>Latest Block Number</MenuItem>
                                <MenuItem eventKey="latestSlotNum" onSelect={this.handleDropDownChange}>Latest Slot Number</MenuItem>
                                {/*<MenuItem divider />
                                <MenuItem eventKey="4">Separated link</MenuItem>*/}
                            </DropdownButton>
                            <input 
                                type="submit"
                                className="col"
                                placeholder=""
                                onClick={this.handleSearchEvent}
                            />
                            <div class="col rightAlignText" id="searchResults">Results: {this.state.witnesses.length}</div>
                    </div> 
                </div>
                <WitnessTable witnesses={this.state.witnesses}/>

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

        //document.getElementById('searchCount').innerHTML = '<h3 class="rightAlignText">' + response.hits.hits.length + ' results</h3>';

    }
}

class WitnessTable extends React.Component {
    render(){
        return(
            <table id="witnessTable">
                <tbody>
                    <tr>
                        <td>Address</td>
                        <td>Vote Count</td>
                        <td>Site Name</td>
                        <td>Total Missed</td>
                        <td>Latest Block Number</td>
                        <td>Latest Slot Number</td>
                    </tr>
                    {
                        this.props.witnesses.map((witness) => { 
                            var output = 
                            <tr>
                                <td>{witness._source.address}</td>
                                <td>{witness._source.votecount}</td>
                                <td>{witness._source.url}</td>
                                <td>{witness._source.totalmissed}</td>
                                <td>{witness._source.latestblocknum}</td>
                                <td>{witness._source.latestslotnum}</td>
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