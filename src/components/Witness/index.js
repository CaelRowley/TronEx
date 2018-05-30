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
            searchbar:"",
			pageTop:Number.MAX_SAFE_INTEGER,
			pageBot:0,
			pageSize:30,
			pageNum: 1,
			numOfPages: 1
        }

        this.getFirstPage("witnesses", "voteCount");
        this.getNumOfPages();
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);

        // this.getWitnesses("witnesses","","");

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

                  // GET /_search
        // {
        //     "query": {
        //         "range" : {
        //             "transactionsCount": {
        //                 "gte": "2"
        //             }
        //         }
        //     }
        // }

        // {"size":500,"query":{"bool":{"must":[{"multi_match":{"query":"2","fields":["transactionsCount"]}},{"multi_match":{"query":"27TuHmwzNFmCVAXyLh28Ly1keFmCPbzLhcd","fields":["transactions.0.toaddress"]}}]}}}

    }

    handleSearchEvent(event){
        this.getWitnesses("witnesses", this.state.searchbar, this.state.dropdown);
    }

    getFirstPage(entity, filter){
        var that = this;
        this.setState({
            pageNum: 1
        });
        var service = new Service();
        var dataPromise = service.getLatestEntity(entity, filter, this.state.pageSize);
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise.hits.hits);
        });
    }

    getNumOfPages() {
        var that = this;

        var service = new Service();
        var dataPromise = service.countEntity("witnesses");
        dataPromise.done(function(dataFromPromise) {
            that.setState({
                numOfPages: parseInt((dataFromPromise.count/that.state.pageSize) + 1)
            });
        });
    }

    firstPage() {
        var that = this;
        this.setState({
            pageNum: 1
        });
        var service = new Service();
        var dataPromise = service.getLatestEntity("witnesses", "voteCount", this.state.pageSize);
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise.hits.hits);
        });
    }

    lastPage() {
        var that = this;

        that.setState({
            pageNum: this.state.numOfPages
        });

        var service = new Service();
        var dataPromise = service.countEntity("witnesses");
        var dataPromise = service.getLastEntity("witnesses", "voteCount", this.state.pageSize);
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise.hits.hits.reverse());
        });
    }

    previousPage(){
        var that = this;
        if(this.state.pageNum > 1){
            this.setState({
                pageNum: this.state.pageNum-1
            });
            var service = new Service();
            var dataPromise = service.getAscList("witnesses", "voteCount", that.state.pageTop);
            dataPromise.done(function(dataFromPromise) {
                that._displayResponse(dataFromPromise.hits.hits.reverse());
            });
        }
    }

    nextPage(){
        var that = this;
        if(this.state.pageNum < this.state.numOfPages){
            this.setState({
                pageNum: this.state.pageNum+1
            });
            var service = new Service();
            var dataPromise = service.getDescList("witnesses", "voteCount", that.state.pageBot);
            dataPromise.done(function(dataFromPromise) {
                that._displayResponse(dataFromPromise.hits.hits);
            });
        }
    }

    render() {
        return (
            <div className="Witness">
                <Row className="padding boarder-bottom-tron componentTableHeader">
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


                            <div className="btn resultsText">Results: {this.state.witnesses.length}</div>

                            <input
                                type="submit"
                                value="Search"
                                className="btn btn-light rightAlign witnessRightAlignPadding"
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
                    <WitnessTable witnesses={this.state.witnesses}/>
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

    getWitnesses(type, filter, field){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity(type, filter, field);
        dataPromise.done(function(dataFromPromise) {
            that._displaySearch(dataFromPromise);
        });
    }

    _displayResponse(response){
		this.setState({
			pageTop: response[0]._source.voteCount
		});
		this.setState({
			pageBot: response[response.length-1]._source.voteCount
		});
    	this.setState({
            witnesses:response
        });
    }

	_displaySearch(response){
    	this.setState({
            witnesses:response.hits.hits
        });
    }
}

class WitnessTable extends React.Component {
    render(){
        return(
            <table id="witnessTable" className="tableWidth">
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
                                <td><Link target="_blank" className="tableUrl" to={witness._source.url}>{witness._source.url}</Link></td>
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
