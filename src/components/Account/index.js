import React, { Component } from 'react';
import './style.css';

import Service from './../utils/service.js';

class Account extends Component {

    render() {
        this.getAccount();
        return (
            
            <div className="Account">
                <div id="searchCount"></div>
                <div id="searchResult"></div>

            </div>

        );
    }

    getAccount(){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("accounts", "", "");
        dataPromise.done(function(dataFromPromise) {
            that._displayResponse(dataFromPromise);
        });
    }

    _displayResponse(response){
        var output = "";
        for (var i = 0; i < response.hits.hits.length; i++) {
            output += '<div class="jumbotron panel-default">'
            output += '<h2>' + "ACCOUNT: " + response.hits.hits[i]._id + '</h2>';
            output += '<ul>'
            output += "<li>accountname: " + response.hits.hits[i]._source.accountname + '</li></br>';
            output += "<li>type: " + response.hits.hits[i]._source.type + '</li></br>';
            output += "<li>address: " + response.hits.hits[i]._source.address + '</li></br>';
            output += "<li>balance: " + response.hits.hits[i]._source.balance + '</li></br>';
            output += "<li>latestoprationtime: " + response.hits.hits[i]._source.latestoprationtime + '</li></br>';
            output += '</ul>';
            output += '</div>';

            if(response.hits.hits[i]._source.voteslist){
                output += "voteslist: " + '</br>';
                for(var j in response.hits.hits[i]._source.voteslist){
                    output += "___voteslist " + j + "___" + '</br>';
                    output += " - voteaddress: " + response.hits.hits[i]._source.voteslist[j].voteaddress + '</br>';
                    output += " - votecount: " + response.hits.hits[i]._source.voteslist[j].votecount + '</br>';
                }
            }

            if(response.hits.hits[i]._source.assetmap){
                output += "assetmap: " + '</br>';
                for(var j in response.hits.hits[i]._source.assetmap){
                    output += "___assetmap " + j + "___" + '</br>';
                    output += " - name: " + j + '</br>';
                    output += " - ammount: " + response.hits.hits[i]._source.assetmap[j] + '</br>';
                }
            }
        }
        document.getElementById('searchCount').innerHTML = '<h3 class="rightAlignText">' + response.hits.hits.length + ' results</h3>';
        document.getElementById('searchResult').innerHTML = output;
    }
}

export default Account;