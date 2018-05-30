import React, { Component } from 'react';
import Service from './../../components/utils/service.js';

import './style.css';

import {Panel, ListGroupItem, ListGroup, Row, Col} from 'react-bootstrap';

class IssuedAssetInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            issuedasset: props
        }

        this.getIssuedAssetByName(props.match.params.name);

    }

    getIssuedAssetByName(name){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("issuedassets", name, "name");
        dataPromise.done(function(dataFromPromise) {
            that._setBlockState(dataFromPromise);
        });

    }
    //docker run -p 50051:50051 -it tronnode /bin/bash -c 'cd build/libs; java -jar java-tron.jar'

    _setBlockState(issuedassetEntity){
        this.setState({
            issuedasset:issuedassetEntity.hits.hits[0]._source
        });
        console.log(this.state.issuedasset);
    }

    render(){
        var startTime = new Date(this.state.issuedasset.startTime).toDateString();
        var endTime = new Date(this.state.issuedasset.endTime).toDateString();

        return(
            <div>
            <ul className="infoAppUlHeader">
                <li className="infoLiHeaderTextPadding">_FHFHFGSDRGAD</li>
            </ul>


                  <Panel className="greyPanelHeader panelOpac">
                    <Panel.Heading>Token</Panel.Heading>
                    <Panel.Body>
                         <ListGroup>
                                <Row>
                                    <ListGroupItem className="textAlignLeft">Name:     {this.state.issuedasset.name}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Description:      {this.state.issuedasset.description}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Owner Address:      {this.state.issuedasset.ownerAddress}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Total Supply:     {this.state.issuedasset.totalSupply}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">TRX Value:      {this.state.issuedasset.trxNum}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">URL:      {this.state.issuedasset.url}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Start Time:      {startTime}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">End Time:     {endTime}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Vote Score:      {this.state.issuedasset.voteScore}</ListGroupItem>
                                </Row>

                            </ListGroup>
                    </Panel.Body>
                  </Panel>

            </div>
        )
    }
}

export default IssuedAssetInfo;
