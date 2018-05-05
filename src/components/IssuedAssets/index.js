import React, { Component } from 'react';
import './style.css';
import $ from 'jquery'

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
    	console.log("Asset");
    	var elasticsearchHost = 'http://localhost:9200/_search';

    	var type = "issuedassets";
    	var filter = "";
    	var field = "";

        var body = {
           'size': 100
        };

        var query = {
           'bool': {}
        };

        if (type.length > 0) {
           query.bool.must = [
              {'multi_match': {
                 'query': type,
                 'fields': [ '_index' ]
              }}
           ]
        }

        if(filter.length > 0 && field.length>0){
           var filterAndField = { 'multi_match' : {'query' : filter, 'fields' : [ field ]}}
           query.bool.must.push(filterAndField);
        }

        body.query = query;

    	$.ajax({
           url: elasticsearchHost,
           headers: {
              'Content-Type':'application/json;charset=UTF-8',
           },
           method: 'POST',
           dataType: 'json',
           data: JSON.stringify(body),
           success: function(response){
              console.log('success: '+ response);
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
        });
    }
}

export default IssuedAssets;