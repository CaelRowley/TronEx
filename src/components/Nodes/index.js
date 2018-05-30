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
            searchbar:"",
			pageTop:Number.MAX_SAFE_INTEGER,
			pageBot:0,
			pageSize:30,
			pageNum: 1,
			numOfPages: 1
        }

        this.getFirstPage("nodes", "num");
        this.getNumOfPages();
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
        // this.getNodes("nodes","","");

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
        var dataPromise = service.countEntity("nodes");
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
        var dataPromise = service.getLatestEntity("nodes", "num", this.state.pageSize);
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
        var dataPromise = service.countEntity("nodes");
        var dataPromise = service.getLastEntity("nodes", "num", this.state.pageSize);
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
            var dataPromise = service.getAscList("nodes", "num", that.state.pageTop);
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
            var dataPromise = service.getDescList("nodes", "num", that.state.pageBot);
            dataPromise.done(function(dataFromPromise) {
                that._displayResponse(dataFromPromise.hits.hits);
            });
        }
    }

    _displayResponse(response){
		this.setState({
			pageTop: response[0]._source.num
		});
		this.setState({
			pageBot: response[response.length-1]._source.num
		});
    	this.setState({
            nodes:response
        });
    }

	_displaySearch(response){
    	this.setState({
            nodes:response.hits.hits
        });
    }

    render() {
        return (
            <div className="Nodes">
                <Row className="padding boarder-bottom-tron componentTableHeader">
                        <Col xs={12} md={8} >
                            <div className="leftAlign">
                                <DropdownButton
                                        title={this.state.dropdown}
                                        key={"asd"}
                                        id={"type"}
                                        bsStyle="default"
                                        onChange={this.handleDropDownChange}>
                                    <MenuItem eventKey="num" onSelect={this.handleDropDownChange}>num</MenuItem>
                                    <MenuItem eventKey="country" onSelect={this.handleDropDownChange}>Country</MenuItem>
                                    <MenuItem eventKey="city" onSelect={this.handleDropDownChange}>City</MenuItem>
                                    <MenuItem eventKey="countryname" onSelect={this.handleDropDownChange}>Country Name</MenuItem>
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
                    <WitnessTable nodes={this.state.nodes}/>
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

class WitnessTable extends React.Component {
    render(){
        return(
            <table id="nodesTable" className="tableWidth">
                <tbody>
                    <tr>
                        <th className="tableTitle textAlignCenter">#</th>
                        <th className="tableTitle textAlignCenter">num</th>
                        <th className="tableTitle textAlignCenter">Country</th>
                        <th className="tableTitle textAlignCenter">City</th>
                        <th className="tableTitle textAlignCenter">Country Name</th>
                    </tr>
                    {
                        this.props.nodes.map((nodes, index) => {
                            var output =
                            <tr key={nodes._source.num}>
                                <td className="tableRowHeight">{index +1}</td>
                                <td><Link className="tableLink" to={`/blockchainexplorer/nodes/${nodes._source.num}`}>{nodes._source.num}</Link></td>
                                <td>{nodes._source.country}</td>
                                <td>{nodes._source.city}</td>
                                <td>{nodes._source.countryname}</td>
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
