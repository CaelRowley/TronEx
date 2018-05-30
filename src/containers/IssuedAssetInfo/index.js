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

                <div className="">
                  <Panel className="greyPanelHeader">
                    <Panel.Heading>Token</Panel.Heading>
                    <Panel.Body>
                            {/*<ListGroup>
                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Address</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft">{this.state.account.address}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Latest Block Number</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem  className="textAlignLeft">{this.state.balance}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Type</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft">{this.state.account.type}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">latestoprationtime</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft">{this.state.account.latestoprationtime}</ListGroupItem>
                                    </Col>
                                </Row>
                            </ListGroup>*/}
                    </Panel.Body>
                  </Panel>
                </div>
            </div>
        )
    }
}

export default IssuedAssetInfo;