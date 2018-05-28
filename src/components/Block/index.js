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
			dropdown:"Select An Item",
            searchbar:""
		}

		this.getBlocks("blocks", "", "");

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
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
    	this.setState({
            blocks:response.hits.hits
        });

        console.log(this.state.blocks);
    }

	render() {

		return (
			<div className="Block">
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
	                            <MenuItem classname="dropDown" eventKey="number" onSelect={this.handleDropDownChange}>number</MenuItem>
	                            <MenuItem classname="dropDown" eventKey="hash" onSelect={this.handleDropDownChange}>hash</MenuItem>
	                            <MenuItem classname="dropDown" eventKey="parentHash" onSelect={this.handleDropDownChange}>parentHash</MenuItem>
	                            <MenuItem classname="dropDown" eventKey="witnessAddress" onSelect={this.handleDropDownChange}>witnessAddress</MenuItem>
	                            <MenuItem classname="dropDown" eventKey="transactionsCount" onSelect={this.handleDropDownChange}>Total Missed</MenuItem>
	                            <MenuItem classname="dropDown" eventKey="transactionsTotal" onSelect={this.handleDropDownChange}>Latest Block Number</MenuItem>

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
				<div className="">
                    <BlockTable blocks={this.state.blocks}/>
                </div>
			</div>
		);
	}
}

class BlockTable extends React.Component {
    render(){
        return(
            <table id="blockTable padding">
                <tbody>
                    <tr>
                        <th className="tableTitle textAlignCenter">number</th>
                        <th className="tableTitle textAlignCenter">hash</th>
                        <th className="tableTitle textAlignCenter">parentHash</th>
                        <th className="tableTitle textAlignCenter">witnessAddress</th>
                        <th className="tableTitle textAlignCenter">transactionsCount</th>
                        <th className="tableTitle textAlignCenter">transactionsTotal</th>
                    </tr>
                    {
                        this.props.blocks.map((blocks, index) => {
                            var output =
                            <tr key={blocks._source.number}>
                                <td><Link className="tableLink" to={`/blockchainexplorer/block/${blocks._source.number}`}>{blocks._source.number}</Link></td>
                                <td>{blocks._source.hash}</td>
                                <td>{blocks._source.parentHash}</td>
                                <td>{blocks._source.witnessAddress}</td>
                                <td>{blocks._source.transactionsCount}</td>
                                <td>{blocks._source.transactionsTotal}</td>
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
