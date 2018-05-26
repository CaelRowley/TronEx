import React, { Component } from 'react';
import './style.css';
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
            searchbar:""
        }

        this.getIssuedAssets("issuedassets","","");

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

    render() {
    	
        return (
            <div className="IssuedAssets">
                
                {/*<iframe src="http://localhost:5601/app/kibana#/dashboard/aeb3b600-5165-11e8-9f68-8d3552208aeb?embed=true&_g=(refreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3A'2018-05-06T17%3A39%3A19.280Z'%2Cmode%3Aabsolute%2Cto%3A'2018-05-06T17%3A54%3A19.282Z'))" height="1500" width="1700"></iframe>*/}
                <Row className="padding boarder-bottom-tron">
                    <Col xs={12} md={8} >
                        <div className="leftAlign">
                            <DropdownButton
                                    title={this.state.dropdown}
                                    key={"asd"}
                                    id={"type"}
                                    bsStyle="default"
                                    onChange={this.handleDropDownChange}>
                                <MenuItem eventKey="name" onSelect={this.handleDropDownChange}>name</MenuItem>
                                <MenuItem eventKey="ownerAddress" onSelect={this.handleDropDownChange}>ownerAddress</MenuItem>
                                <MenuItem eventKey="totalSupply" onSelect={this.handleDropDownChange}>totalSupply</MenuItem>
                                <MenuItem eventKey="startTime" onSelect={this.handleDropDownChange}>startTime</MenuItem>
                                <MenuItem eventKey="endTime" onSelect={this.handleDropDownChange}>endTime</MenuItem>
                                <MenuItem eventKey="url" onSelect={this.handleDropDownChange}>url</MenuItem>
                                
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


                        <div className="btn">Results: {this.state.issuedassets.length}</div>

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
                    <IssuedAssetsTable issuedassets={this.state.issuedassets}/>
                </div>
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

        this.setState({
            issuedassets:response.hits.hits
        });

        console.log(this.state.issuedassets);
    }
}
class IssuedAssetsTable extends React.Component {
    render(){
        return(
            <table id="issuedAssetsTable padding">
                <tbody>
                    <tr>
                        <th className="tableTitle textAlignCenter">#</th>
                        <th className="tableTitle textAlignCenter">ownerAddress</th>
                        <th className="tableTitle textAlignCenter">name</th>
                        <th className="tableTitle textAlignCenter">totalSupply</th>
                        <th className="tableTitle textAlignCenter">startTime</th>
                        <th className="tableTitle textAlignCenter">endTime</th>
                        <th className="tableTitle textAlignCenter">Site Name</th>
                    </tr>
                    {
                        this.props.issuedassets.map((issuedassets, index) => {
                            var output =
                            <tr key={issuedassets._source.number}>
                                <td className="tableRowHeight">{index +1}</td>
                                <td><Link className="tableLink" to={`/blockchainexplorer/issuedassets/${issuedassets._source.ownerAddress}`}>{issuedassets._source.ownerAddress}</Link></td>
                                <td>{issuedassets._source.name}</td>
                                <td>{issuedassets._source.totalSupply}</td>
                                <td>{issuedassets._source.startTime}</td>
                                <td>{issuedassets._source.endTime}</td>
                                <td>{issuedassets._source.url}</td>
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