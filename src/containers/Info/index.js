import React, { Component } from 'react';
import Service from './../../components/utils/service.js';

import './style.css';
import './../../components/css/style.css';

import {Panel, ListGroupItem, ListGroup, Row, Col} from 'react-bootstrap';

class Info extends Component {
    constructor(props){
        super(props);

        this.state = {
            witness: props
        }

        this.getWitnessByAddress(props.match.params.witnessAddress);
    }

    getWitnessByAddress(address){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("witnesses", address, "address");
        dataPromise.done(function(dataFromPromise) {
            that._setWitnessState(dataFromPromise);
        });

    }

    _setWitnessState(witnessEntity){
        this.setState({
            witness:witnessEntity.hits.hits[0]._source
        });
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

                <div className="padding">
                  <Panel className="greyPanelHeader">
                    <Panel.Heading>Witness</Panel.Heading>
                    <Panel.Body>
                            <ListGroup>
                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Address</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft">{this.state.witness.address}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Latest Block Number</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem  className="textAlignLeft">{this.state.witness.latestBlockNum}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Latest Slot Number</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft">{this.state.witness.latestsLotNum}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Total Missed</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft">{this.state.witness.totalMissed}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Total Produced</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft">{this.state.witness.totalProduced}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">URL</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft"> {this.state.witness.url}</ListGroupItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                         <ListGroupItem className="textAlignRight">Vote Count</ListGroupItem>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroupItem className="textAlignLeft">{this.state.witness.voteCount}</ListGroupItem>
                                    </Col>
                                </Row>
                            </ListGroup>
                    </Panel.Body>
                  </Panel>
                </div>
            </div>
        )
    }
}

export default Info;