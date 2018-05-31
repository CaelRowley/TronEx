import React, { Component } from 'react';
import Service from './../../components/utils/service.js';

import './style.css';
import './../../components/css/style.css';

import {Panel, ListGroupItem, ListGroup, Row, Col} from 'react-bootstrap';

class NodeInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            node: props
        }

        this.getNodeByAddress(props.match.params.nodeip);
    }

    getNodeByAddress(address){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("nodes", address, "host");
        dataPromise.done(function(dataFromPromise) {
            that._setNodeState(dataFromPromise);
            console.log(dataFromPromise)
        });

    }

    _setNodeState(nodeEntity){
        this.setState({
            node:nodeEntity.hits.hits[0]._source
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
                      <Panel.Heading>Node</Panel.Heading>
                      <Panel.Body>
                              <ListGroup>
                                  <Row>
                                      <ListGroupItem className="textAlignLeft">Address: {this.state.node.host}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">Port: {this.state.node.port}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">City: {this.state.node.city}</ListGroupItem>
                                  </Row>
                                  <Row>
                                      <ListGroupItem  className="textAlignLeft">Country: {this.state.node.countryname} ({this.state.node.country})</ListGroupItem>
                                  </Row>
                              </ListGroup>

                      </Panel.Body>
                  </Panel>
                </div>
            </div>
        )
    }
}

export default NodeInfo;
