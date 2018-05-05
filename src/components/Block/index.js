import React, { Component } from 'react';
import './style.css';

import Service from './../Service/service.js';

class Block extends Component {
	render() {
		this.getBlocks();
		return (
			<div className="Block">
				<h2>Block Info</h2>
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
			output += '<h2>' + "BLOCK: " + response.hits.hits[i]._id + '</h2>';
			output += "parentHash: " + response.hits.hits[i]._source.parentHash + '</br>';
			output += "witnessAddress: " + response.hits.hits[i]._source.witnessAddress + '</br>';
			output += "transactionsCount: " + response.hits.hits[i]._source.transactionsCount + '</br>';

			output += "contractType: " + '</br>';
			output += " - accountcreatecontract: " + response.hits.hits[i]._source.contractType.contracttypes.accountcreatecontract + '</br>';
			output += " - transfercontract: " + response.hits.hits[i]._source.contractType.contracttypes.transfercontract + '</br>';
			output += " - transferassetcontract: " + response.hits.hits[i]._source.contractType.contracttypes.transferassetcontract + '</br>';
			output += " - voteassetcontract: " + response.hits.hits[i]._source.contractType.contracttypes.voteassetcontract + '</br>';
			output += " - votewitnesscontract: " + response.hits.hits[i]._source.contractType.contracttypes.votewitnesscontract + '</br>';
			output += " - witnesscreatecontract: " + response.hits.hits[i]._source.contractType.contracttypes.witnesscreatecontract + '</br>';

			if(response.hits.hits[i]._source.transactions){
				output += "transactions: " + '</br>';
				for(var j in response.hits.hits[i]._source.transactions){
					output += "___transaction " + j + "___" + '</br>';
					output += " - fromAddress: " + response.hits.hits[i]._source.transactions[j].fromaddress + '</br>';
					output += " - toAddress: " + response.hits.hits[i]._source.transactions[j].toaddress + '</br>';
					output += " - amount: " + response.hits.hits[i]._source.transactions[j].amount + '</br>';
				}
			}
        }
        //document.getElementById('searchCount').innerHTML = '<h2>Showing ' + response.hits.hits.length + ' results</h2>';
        document.getElementById('searchResult').innerHTML = output;
    }
}
export default Block;