import React, { Component } from 'react';
import './style.css';

import Service from './../utils/service.js';

class Nodes extends Component {

    render() {
    	this.getNodes();
        return (
            <div className="Nodes">
                <div id="searchCount"></div>
                <div id="searchResult"></div>
            </div>
        );
    }

    getNodes(){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("nodes", "", "");
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        var output = "";
        for (var i = 0; i < response.hits.hits.length; i++) {
            output += '<div class="jumbotron panel-default">'
            output += '<h2>' + "Nodes: " + response.hits.hits[i]._id + '</h2>';
            output += '<ul>'
            output += "<li>city: " + response.hits.hits[i]._source.city + '</li></br>';
            output += "<li>continentcode: " + response.hits.hits[i]._source.continentcode + '</li></br>';
            output += "<li>country: " + response.hits.hits[i]._source.country + '</li></br>';
            output += "<li>countryname: " + response.hits.hits[i]._source.countryname + '</li></br>';
            output += "<li>currency: " + response.hits.hits[i]._source.currency + '</li></br>';
            output += "<li>host: " + response.hits.hits[i]._source.host + '</li></br>';
            output += "<li>latitude: " + response.hits.hits[i]._source.latitude + '</li></br>';
            output += "<li>longitude: " + response.hits.hits[i]._source.longitude + '</li></br>';
            output += "<li>org: " + response.hits.hits[i]._source.org + '</li></br>';
            output += "<li>port: " + response.hits.hits[i]._source.port + '</li></br>';
            output += "<li>region: " + response.hits.hits[i]._source.region + '</li></br>';
            output += "<li>regioncode: " + response.hits.hits[i]._source.regioncode + '</li></br>';
            output += '</ul>';
            output += '</div>';
        }
        document.getElementById('searchCount').innerHTML = '<h3 class="rightAlignText">' + response.hits.hits.length + ' results</h3>';
        document.getElementById('searchResult').innerHTML = output;
    }
}

export default Nodes;