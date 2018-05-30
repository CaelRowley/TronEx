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
                <ul className="infoAppUlHeader">
                    <li className="infoLiHeaderTextPadding">_FHFHFGSDRGAD</li>
                </ul>

                <div className="padding">
                    <Panel className="greyPanelHeader panelOpac">
                      <Panel.Heading>Representative</Panel.Heading>
                      <Panel.Body>
                              <ListGroup>
                                  <Row>
                                      <ListGroupItem className="textAlignLeft">Address: {this.state.witness.address}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">Latest Block Number: {this.state.witness.latestBlockNum}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">Latest Slot Number: {this.state.witness.latestsLotNum}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">Total Missed: {this.state.witness.totalMissed}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">Total Produced: {this.state.witness.totalProduced}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">URL: {this.state.witness.url}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">Vote Count: {this.state.witness.voteCount}</ListGroupItem>
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
