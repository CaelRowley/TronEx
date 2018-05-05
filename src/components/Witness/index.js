import React, { Component } from 'react';
import './style.css';
import $ from 'jquery'

import Service from './../Service/service.js';

class Witness extends Component {

    render() {
    	this.getWitnesses();
        return (
            <div className="Witness">
                <h2>Witness page</h2>
                <div id="searchResult"></div>
            </div>

        );
    }

    getWitnesses(){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("witnesses", "", "");
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        var output = "";
        for (var i = 0; i < response.hits.hits.length; i++) {
            output += '<div class="jumbotron panel-default">'
            output += '<h2>' + "WITNESS: " + response.hits.hits[i]._id + '</h2>';
            output += '<ul>'
            output += "<li>address: " + response.hits.hits[i]._source.address + '</li></br>';
            output += "<li>voteCount: " + response.hits.hits[i]._source.votecount + '</li></br>';
            output += "<li>pubKey: " + response.hits.hits[i]._source.pubkey + '</li></br>';
            output += "<li>url: " + response.hits.hits[i]._source.url + '</li></br>';
            output += "<li>totalMissed: " + response.hits.hits[i]._source.totalmissed + '</li></br>';
            output += "<li>latestBlockNum: " + response.hits.hits[i]._source.latestblocknum + '</li></br>';
            output += "<li>latestSlotNum: " + response.hits.hits[i]._source.latestslotnum + '</li></br>';
            output += "<li>isJobs: " + response.hits.hits[i]._source.isjobs + '</li></br>';
            output += '</ul>';
            output += '</div>';
        }
        //document.getElementById('searchCount').innerHTML = '<h2>Showing ' + response.hits.hits.length + ' results</h2>';
        document.getElementById('searchResult').innerHTML = output;
    }
}

export default Witness;