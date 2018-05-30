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
        return(
            <div>
            <Row className="padding boarder-bottom-tron">
                <Col xs={12} md={8}>
                {/*<div></div>*/}
                </Col>
                <Col xs={6} md={4}>
                    <input 
                            type="submit"
                            value="Search"
                            className="btn btn-light rightAlign"
                            placeholder=""
                        />
                 </Col>
            </Row>

                
                  <Panel className="greyPanelHeader">
                    <Panel.Heading>Token</Panel.Heading>
                    <Panel.Body>
                         <ListGroup>
                                <Row>
                                    <ListGroupItem className="textAlignLeft">Name     {this.state.issuedasset.name}</ListGroupItem>
                                </Row> 
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">description      {this.state.issuedasset.description}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">ownerAddress      {this.state.issuedasset.ownerAddress}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Total Supply     {this.state.issuedasset.totalSupply}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">TRX Num      {this.state.issuedasset.trxNum}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">URL      {this.state.issuedasset.url}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">startTime      {this.state.issuedasset.startTime}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">endTime      {this.state.issuedasset.endTime}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Vote Score      {this.state.issuedasset.voteScore}</ListGroupItem>
                                </Row>

                            </ListGroup>
                    </Panel.Body>
                  </Panel>
                
            </div>
        )
    }
}

export default IssuedAssetInfo;