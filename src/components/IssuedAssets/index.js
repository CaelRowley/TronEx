import React, { Component } from 'react';
import './style.css';
import '../css/style.css';

import $ from 'jquery'

import {DropdownButton, MenuItem, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import Service from './../utils/service.js';

class IssuedAssets extends Component {

    constructor(props){
        super(props);

        this.state = {
            issuedassets:[],
            dropdown:"Select An Item",
            searchbar:"",
			pageTop:Number.MAX_SAFE_INTEGER,
			pageBot:0,
			pageSize:30,
			pageNum: 1,
			numOfPages: 1
        }

        this.getFirstPage("issuedassets", "startTime");
        this.getNumOfPages();
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);

        // this.getIssuedAssets("issuedassets","","");

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
        this.getIssuedAssets("issuedassets", this.state.searchbar, this.state.dropdown);
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
        var dataPromise = service.countEntity("issuedassets");
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
        var dataPromise = service.getLatestEntity("issuedassets", "startTime", this.state.pageSize);
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
        var dataPromise = service.countEntity("issuedassets");
        var dataPromise = service.getLastEntity("issuedassets", "startTime", this.state.pageSize);
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
            var dataPromise = service.getAscList("issuedassets", "startTime", that.state.pageTop);
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
            var dataPromise = service.getDescList("issuedassets", "startTime", that.state.pageBot);
            dataPromise.done(function(dataFromPromise) {
                that._displayResponse(dataFromPromise.hits.hits);
            });
        }
    }

    render() {

        return (
            <div className="IssuedAssets">

                {/*<iframe src="http://localhost:5601/app/kibana#/dashboard/aeb3b600-5165-11e8-9f68-8d3552208aeb?embed=true&_g=(refreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3A'2018-05-06T17%3A39%3A19.280Z'%2Cmode%3Aabsolute%2Cto%3A'2018-05-06T17%3A54%3A19.282Z'))" height="1500" width="1700"></iframe>*/}
                <Row className="padding boarder-bottom-tron componentTableHeader">
                    <Col xs={12} md={8} >
                        <div className="leftAlign dropDown">
                            <DropdownButton
                                    title={this.state.dropdown}
                                    key={"asd"}
                                    id={"type"}
                                    bsStyle="default"
                                    onChange={this.handleDropDownChange}>
                                <MenuItem eventKey="name" onSelect={this.handleDropDownChange}>Name</MenuItem>
                                <MenuItem eventKey="startTime" onSelect={this.handleDropDownChange}>Owner Address</MenuItem>
                                <MenuItem eventKey="totalSupply" onSelect={this.handleDropDownChange}>Total Supply</MenuItem>
                                <MenuItem eventKey="startTime" onSelect={this.handleDropDownChange}>Start Time</MenuItem>
                                <MenuItem eventKey="endTime" onSelect={this.handleDropDownChange}>End Time</MenuItem>
                                <MenuItem eventKey="url" onSelect={this.handleDropDownChange}>Site Name</MenuItem>

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


                        <div className="btn resultsText">Results: {this.state.issuedassets.length}</div>

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
                    <IssuedAssetsTable issuedassets={this.state.issuedassets}/>
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

    getIssuedAssets(){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("issuedassets", "", "");
        dataPromise.done(function(dataFromPromise) {
            that._displaySearch(dataFromPromise);
        });
    }

    _displayResponse(response){
		this.setState({
			pageTop: response[0]._source.startTime
		});
		this.setState({
			pageBot: response[response.length-1]._source.startTime
		});
    	this.setState({
            issuedassets:response
        });
    }

	_displaySearch(response){
    	this.setState({
            issuedassets:response.hits.hits
        });
    }
}
class IssuedAssetsTable extends React.Component {
    render(){
        return(
            <table id="issuedAssetsTable" className="tableWidth">
                <tbody>
                    <tr>
                        <th className="tableTitle textAlignCenter">#</th>
                        <th className="tableTitle textAlignCenter">Owner Address</th>
                        <th className="tableTitle textAlignCenter">Name</th>
                        <th className="tableTitle textAlignCenter">Total Supply</th>
                        <th className="tableTitle textAlignCenter">Start Time</th>
                        <th className="tableTitle textAlignCenter">End Time</th>
                        <th className="tableTitle textAlignCenter">Site Name</th>
                    </tr>
                    {
                        this.props.issuedassets.map((issuedassets, index) => {
                            var startTime = new Date(issuedassets._source.startTime).toDateString();
                            var endTime = new Date(issuedassets._source.endTime).toDateString();
                            var output =
                            <tr key={issuedassets._source.number}>
                                <td className="tableRowHeight">{index +1}</td>
                                <td>{issuedassets._source.ownerAddress}</td>
                                <td><Link className="tableLink" to={`/blockchainexplorer/issuedassets/${issuedassets._source.name}`}>{issuedassets._source.name}</Link></td>
                                <td>{issuedassets._source.totalSupply}</td>
                                <td>{startTime}</td>
                                <td>{endTime}</td>
                                <td><Link target="_blank" className="tableUrl" to={issuedassets._source.url}>{issuedassets._source.url}</Link></td>
                            </tr>
                            return output;
                        })
                    }
                </tbody>
            </table>
        )
    }
}



export default IssuedAssets;
