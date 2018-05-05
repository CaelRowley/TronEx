import React, { Component } from 'react';
import './style.css';
import $ from 'jquery'

import Service from './../Service/service.js';

class IssuedAssets extends Component {

    render() {
    	this.getIssuedAssets()
        return (
            <div className="IssuedAssets">
                <h2>IssuedAssets page</h2>
                <div id="searchResult"></div>
            </div>
        );
    }

    getIssuedAssets(){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("issuedassets", "", "");
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        var output = '';
        for (var i = 0; i < response.hits.hits.length; i++) {
            output += '<div class="jumbotron panel-default">'
            output += '<h2>' + "Issued Assets: " + response.hits.hits[i]._source.name + '</h2>';
            output += '<ul>'
            output += "<li>ownerAddress: " + response.hits.hits[i]._source.owneraddress + '</li></br>';
            output += "<li>name: " + response.hits.hits[i]._source.name + '</li></br>';
            output += "<li>totalSupply: " + response.hits.hits[i]._source.totalsupply + '</li></br>';
            output += "<li>trxNum: " + response.hits.hits[i]._source.trxnum + '</li></br>';
            output += "<li>num: " + response.hits.hits[i]._source.num + '</li></br>';
            output += "<li>startTime: " + response.hits.hits[i]._source.starttime + '</li></br>';
            output += "<li>endTime: " + response.hits.hits[i]._source.endtime + '</li></br>';
            output += "<li>decayRatio: " + response.hits.hits[i]._source.decayratio + '</li></br>';
            output += "<li>voteScore: " + response.hits.hits[i]._source.votescore + '</li></br>';
            output += "<li>description: " + response.hits.hits[i]._source.description + '</li></br>';
            output += "<li>url: " + response.hits.hits[i]._source.url + '</li></br>';
            output += '</ul>';
            output += '</div>';
        }
        //document.getElementById('searchCount').innerHTML = '<h2>Showing ' + response.hits.hits.length + ' results</h2>';
        document.getElementById('searchResult').innerHTML = output;
    }
}



export default IssuedAssets;