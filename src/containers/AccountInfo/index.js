import React, { Component } from 'react';
import Service from './../../components/utils/service.js';

import './style.css';

import {Panel, ListGroupItem, ListGroup, Row, Col} from 'react-bootstrap';

class AccountInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            account: props
        }

        this.getAccountByAddress(props.match.params.accountAddress);

    }

    getAccountByAddress(address){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("accounts", address, "address");
        dataPromise.done(function(dataFromPromise) {
            that._setAccountState(dataFromPromise);
        });

    }

    _setAccountState(accountEntity){
        this.setState({
            account:accountEntity.hits.hits[0]._source
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
                    <Panel.Heading>Account</Panel.Heading>
                    <Panel.Body>
                            <ListGroup>
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
                            </ListGroup>
                    </Panel.Body>
                  </Panel>
                </div>
            </div>
        )
    }
}

export default AccountInfo;