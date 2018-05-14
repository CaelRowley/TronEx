import React, { Component } from 'react';
import './style.css';

import Service from './../utils/service.js';

class Block extends Component {
	constructor(props){
		super(props);

		this.state = {
			username:"temp"
		}

		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(e){
		this.setState({
			username: e.target.value
		})
	}


	render() {
		this.getBlocks();
		return (
			<div className="Block">
				<div id="searchCount"></div>
				<div id="searchResult"></div>
			</div>
		);
	}

	getBlocks(){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("blocks", "", "");
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        var output = "";
        for (var i = 0; i < response.hits.hits.length; i++) {
        	output += '<div class="jumbotron panel-default">'
			output += '<h2>' + "BLOCK: " + response.hits.hits[i]._id + '</h2>';
			output += "parentHash: " + response.hits.hits[i]._source.parentHash + '</br>';
			output += "witnessAddress: " + response.hits.hits[i]._source.witnessAddress + '</br>';
			output += "transactionsCount: " + response.hits.hits[i]._source.transactionsCount + '</br>';

			output += "contractType: " + '</br>';
			output += " - accountcreatecontract: " + response.hits.hits[i]._source.contractType.types.accountcreatecontract + '</br>';
			output += " - transfercontract: " + response.hits.hits[i]._source.contractType.types.transfercontract + '</br>';
			output += " - transferassetcontract: " + response.hits.hits[i]._source.contractType.types.transferassetcontract + '</br>';
			output += " - voteassetcontract: " + response.hits.hits[i]._source.contractType.types.voteassetcontract + '</br>';
			output += " - votewitnesscontract: " + response.hits.hits[i]._source.contractType.types.votewitnesscontract + '</br>';
			output += " - witnesscreatecontract: " + response.hits.hits[i]._source.contractType.types.witnesscreatecontract + '</br>';

			if(response.hits.hits[i]._source.transactions){
				output += "transactions: " + '</br>';
				for(var j in response.hits.hits[i]._source.transactions){
					output += "___transaction " + j + "___" + '</br>';
					output += " - fromAddress: " + response.hits.hits[i]._source.transactions[j].fromaddress + '</br>';
					output += " - toAddress: " + response.hits.hits[i]._source.transactions[j].toaddress + '</br>';
					output += " - amount: " + response.hits.hits[i]._source.transactions[j].amount + '</br>';
				}
			}
			output += "</div>"
        }
        document.getElementById('searchCount').innerHTML = '<h3 class="rightAlignText">' + response.hits.hits.length + ' results</h3>';
        document.getElementById('searchResult').innerHTML = output;
    }
}
export default Block;