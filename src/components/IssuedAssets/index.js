import React, { Component } from 'react';
import './style.css';
import $ from 'jquery'

import Service from './../utils/service.js';

class IssuedAssets extends Component {

    render() {
    	this.getIssuedAssets()
        return (
            <div className="IssuedAssets">
                <div id="searchCount"></div>
                {/*<iframe src="http://localhost:5601/app/kibana#/dashboard/aeb3b600-5165-11e8-9f68-8d3552208aeb?embed=true&_g=(refreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3A'2018-05-06T17%3A39%3A19.280Z'%2Cmode%3Aabsolute%2Cto%3A'2018-05-06T17%3A54%3A19.282Z'))" height="1500" width="1700"></iframe>*/}
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
            output += "<li>ownerAddress: " + response.hits.hits[i]._source.ownerAddress + '</li></br>';
            output += "<li>name: " + response.hits.hits[i]._source.name + '</li></br>';
            output += "<li>totalSupply: " + response.hits.hits[i]._source.totalSupply + '</li></br>';
            output += "<li>trxNum: " + response.hits.hits[i]._source.trxNum + '</li></br>';
            output += "<li>num: " + response.hits.hits[i]._source.num + '</li></br>';
            output += "<li>startTime: " + response.hits.hits[i]._source.startTime + '</li></br>';
            output += "<li>endTime: " + response.hits.hits[i]._source.endTime + '</li></br>';
            output += "<li>decayRatio: " + response.hits.hits[i]._source.decayRatio + '</li></br>';
            output += "<li>voteScore: " + response.hits.hits[i]._source.voteScore + '</li></br>';
            output += "<li>description: " + response.hits.hits[i]._source.description + '</li></br>';
            output += "<li>url: " + response.hits.hits[i]._source.url + '</li></br>';
            output += '</ul>';
            output += '</div>';
        }
        document.getElementById('searchCount').innerHTML = '<h3 class="rightAlignText">' + response.hits.hits.length + ' results</h3>';
        document.getElementById('searchResult').innerHTML = output;
    }
}



export default IssuedAssets;