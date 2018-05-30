import React, { Component } from 'react';
import './style.css';
import '../css/style.css';

import {DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import Service from './../utils/service.js';

class Block extends Component {
	constructor(props){
		super(props);

		this.state = {
			blocks:[],
			username:"temp",
			dropdown:"number",
            searchbar:"",
			pageTop:Number.MAX_SAFE_INTEGER,
			pageBot:0,
			pageSize:30,
			pageNum: 1,
			numOfPages: 1
		}
		// Number.MAX_SAFE_INTEGER
		this.getFirstPage("blocks", "number");
		this.getNumOfPages();
		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.firstPage = this.firstPage.bind(this);
		this.lastPage = this.lastPage.bind(this);

		// this.getPage("blocks", "number", Number.MAX_SAFE_INTEGER);

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
        this.getBlocks("blocks", this.state.searchbar, this.state.dropdown);
    }

	getBlocks(type, filter, field){
		var that = this;

		var service = new Service();
		var dataPromise = service.getEntity(type, filter, field);
		dataPromise.done(function(dataFromPromise) {
			that._displaySearch(dataFromPromise);
		});
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
		var dataPromise = service.countEntity("blocks");
		dataPromise.done(function(dataFromPromise) {
			that.setState({
				numOfPages: parseInt((dataFromPromise.count/that.state.pageSize) + 1)
			});
		});
	}

    getBlocks(type, filter, field){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity(type, filter, field);
        dataPromise.done(function(dataFromPromise) {
            that._displaySearch(dataFromPromise);
        }).catch(function(err){
            console.log(err);
        });
    }

	firstPage() {
		var that = this;
		this.setState({
			pageNum: 1
		});
		var service = new Service();
		var dataPromise = service.getLatestEntity("blocks", "number", this.state.pageSize);
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
		var dataPromise = service.countEntity("blocks");
		var dataPromise = service.getLastEntity("blocks", "number", this.state.pageSize);
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
			var dataPromise = service.getAscList("blocks", "number", that.state.pageTop);
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
			var dataPromise = service.getDescList("blocks", "number", that.state.pageBot);
			dataPromise.done(function(dataFromPromise) {
			    that._displayResponse(dataFromPromise.hits.hits);
			});
		}
    }

    _displayResponse(response){
		this.setState({
			pageTop: response[0]._source.number
		});
		this.setState({
			pageBot: response[response.length-1]._source.number
		});
    	this.setState({
            blocks:response
        });
    }

	_displaySearch(response){
    	this.setState({
            blocks:response.hits.hits
        });
    }

	render() {

		return (
			<div className="Block">
				<Row className="padding boarder-bottom-tron componentTableHeader">
	                <Col xs={12} md={8} >
	                    <div className="leftAlign dropDown">
	                        <DropdownButton
									className="dropDown"
	                                title={this.state.dropdown}
	                                key={"asd"}
	                                id={"type"}
	                                bsStyle="default"
	                                onChange={this.handleDropDownChange}>
	                            <MenuItem className="dropDown" eventKey="number" onSelect={this.handleDropDownChange}>Number</MenuItem>
	                            <MenuItem className="dropDown" eventKey="hash" onSelect={this.handleDropDownChange}>Hash</MenuItem>
	                            <MenuItem className="dropDown" eventKey="parentHash" onSelect={this.handleDropDownChange}>Parent Hash</MenuItem>
	                            <MenuItem className="dropDown" eventKey="witnessAddress" onSelect={this.handleDropDownChange}>Witness Address</MenuItem>
	                            <MenuItem className="dropDown" eventKey="transactionsCount" onSelect={this.handleDropDownChange}>Transactions Count</MenuItem>
	                            <MenuItem className="dropDown" eventKey="transactionsTotal" onSelect={this.handleDropDownChange}>Total Transactions</MenuItem>

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


	                    <div className="btn resultsText">Results: {this.state.blocks.length}</div>

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
                    <BlockTable blocks={this.state.blocks}/>
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
}

class BlockTable extends React.Component {
    render(){
        return(
            <table id="blockTable" className="tableWidth">
                <tbody>
                    <tr>
                        <th className="tableTitle textAlignCenter">Height</th>
                        <th className="tableTitle textAlignCenter">Number of Trans.</th>
                        <th className="tableTitle textAlignCenter">Total Trans.</th>
                        {/*<th className="tableTitle textAlignCenter">Hash</th>
                        <th className="tableTitle textAlignCenter">Parent Hash</th>*/}
                        <th className="tableTitle textAlignCenter">Witness Address</th>
                        <th className="tableTitle textAlignCenter">Time</th>
                        
                    </tr>
                    {
                        this.props.blocks.map((blocks, index) => {
                            var timeCreated = new Date(blocks._source.time).toDateString();
                            var output =
                            <tr key={blocks._source.number}>
                                <td><Link className="tableLink" to={`/blockchainexplorer/block/${blocks._source.number}`}>{blocks._source.number}</Link></td>
                                <td>{blocks._source.transactionsCount}</td>
                                <td>{blocks._source.transactionsTotal}</td>
                                <td><Link className="tableLink" to={`/blockchainexplorer/witness/${blocks._source.witnessAddress}`}>{blocks._source.witnessAddress}</Link></td>
                                
                                <td>{timeCreated}</td>
                            </tr>
                            return output;
                        })
                    }
                </tbody>
            </table>
        )
    }
}
export default Block;
