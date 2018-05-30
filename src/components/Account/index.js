import React, { Component } from 'react';
import './style.css';
import '../css/style.css';

import {DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import Service from './../utils/service.js';

class Account extends Component {

     constructor(props){
        super(props);

        this.state = {
            accounts:[],
            dropdown:"Select An Item",
            searchbar:""
        }

        this.getAccounts("accounts","","");

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
        this.getAccounts("accounts", this.state.searchbar, this.state.dropdown);
    }

    render() {
        return (
            <div className="Account">
                    <Row className="padding boarder-bottom-tron componentTableHeader">
                            <Col xs={12} md={8} >
                                <div className="leftAlign dropDown">
                                    <DropdownButton
                                            classname="dropDown"
                                            title={this.state.dropdown}
                                            key={"asd"}
                                            id={"type"}
                                            bsStyle="default"
                                            onChange={this.handleDropDownChange}>
                                        <MenuItem eventKey="address" onSelect={this.handleDropDownChange}>Address</MenuItem>
                                        <MenuItem eventKey="balance" onSelect={this.handleDropDownChange}>Balance</MenuItem>
                                        <MenuItem eventKey="type" onSelect={this.handleDropDownChange}>Type</MenuItem>
                                        <MenuItem eventKey="latestoprationtime" onSelect={this.handleDropDownChange}>Latest Operation Time</MenuItem>
                                        {/*<MenuItem eventKey="totalMissed" onSelect={this.handleDropDownChange}>Total Missed</MenuItem>
                                        <MenuItem eventKey="latestBlockNum" onSelect={this.handleDropDownChange}>Latest Block Number</MenuItem>
                                        <MenuItem eventKey="latestsLotNum" onSelect={this.handleDropDownChange}>Latest Slot Number</MenuItem>*/}
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

                            <div className="btn btn-light  accountRightAlignPadding resultsText">Results: {this.state.accounts.length}</div>

                            <input
                                type="submit"
                                value="Search"
                                className="btn btn-light accountRightAlignPadding rightAlign"
                                placeholder=""
                                onClick={this.handleSearchEvent}
                            />

                             </Col>


                    </Row>
                    <div>
    					<ul className="blockTableButtonsUl">
   						<li className="blockTableButtonLi">
   							<button	className="blockTableButton"  onClick={this.firstPage}>|&#8592; </button>
   						</li>
    						<li className="blockTableButtonLi">
    							<button	className="blockTableButton"  onClick={this.previousPage}>&#8592;</button>
    						</li>
    						<li className="blockTableButtonLi blockPageNumAlign">{this.state.pageNum}/{this.state.numOfPages}</li>
    						<li className="blockTableButtonLi">
    							<button	className="blockTableButton" onClick={this.nextPage}>&#8594;</button>
    						</li>
   						<li className="blockTableButtonLi">
   							<button	className="blockTableButton" onClick={this.lastPage}> &#8594;|</button>
   						</li>
    					</ul>
    				</div>
                    <div className="blockTablePos">
                        <AccountTable accounts={this.state.accounts}/>
                    </div>
                    <div>
    					<ul className="blockTableButtonsUl">
   						<li className="blockTableButtonLi">
   							<button	className="blockTableButton"  onClick={this.firstPage}>|&#8592; </button>
   						</li>
    						<li className="blockTableButtonLi">
    							<button	className="blockTableButton"  onClick={this.previousPage}>&#8592;</button>
    						</li>
    						<li className="blockTableButtonLi blockPageNumAlign">{this.state.pageNum}/{this.state.numOfPages}</li>
    						<li className="blockTableButtonLi">
    							<button	className="blockTableButton" onClick={this.nextPage}>&#8594;</button>
    						</li>
   						<li className="blockTableButtonLi">
   							<button	className="blockTableButton" onClick={this.lastPage}> &#8594;|</button>
   						</li>
    					</ul>
    				</div>
                </div>
            );
    }

    getAccounts(type, filter, field){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity(type, filter, field);
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        this.setState({
            accounts:response.hits.hits
        });
    }
}

class AccountTable extends React.Component {
    render(){
        return(
            <table id="accountTable" className="tableWidth">
                <tbody>
                    <tr>
                        <th className="tableTitle textAlignCenter">#</th>
                        <th className="tableTitle textAlignCenter">Address</th>
                        <th className="tableTitle textAlignCenter">Balance</th>
                        {/*<th>accountname</th>*/}
                        <th className="tableTitle textAlignCenter">Type</th>
                        <th className="tableTitle textAlignCenter">Latest Operation Time</th>
                        {/*<th>voteslist</th>
                        <th>assetmap</th>*/}
                    </tr>
                    {
                        this.props.accounts.map((account, index) => {
                            var output =
                            <tr key={account._source.address}>
                                <td className="tableRowHeight">{index +1}</td>
                                <td><Link className="tableLink" to={`/blockchainexplorer/account/${account._source.address}`}>{account._source.address}</Link></td>

                                <td>{account._source.balance}</td>

                                <td>{account._source.type}</td>
                                <td>{account._source.latestOprationTime}</td>
                            </tr>
                            return output;
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default Account;
