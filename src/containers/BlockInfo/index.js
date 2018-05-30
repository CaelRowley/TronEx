import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import Service from './../../components/utils/service.js';

import './style.css';
import './../../components/css/style.css';

import {Panel, ListGroupItem, ListGroup, Row, Col} from 'react-bootstrap';

class BlockInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            block: {
                transactions:[]
            },
            blockLeft: false,
            blockRight: false
        }

        this.getBlockByNumber(props.match.params.blockNum);

        this.handleClickLeft = this.handleClickLeft.bind(this);
        this.handleClickRight = this.handleClickRight.bind(this);
    }

    getBlockByNumber(number){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("blocks", number, "number");
        dataPromise.done(function(dataFromPromise) {
            that._setBlockState(dataFromPromise);
        });
    }

    checkNextBlockByNumber(number, flag){
        var that = this;

        var service = new Service();
        var dataPromise = service.getEntity("blocks", number, "number");
        dataPromise.done(function(dataFromPromise) {
            if(dataFromPromise.hits.hits[0] != undefined){
                if(flag){
                    that.state.blockLeft = true;
                } else {
                    that.state.blockRight = true;
                }
            }
        });
    }

    handleClickLeft(){
        if(this.state.blockLeft){
            this.getBlockByNumber(this.state.block.number+1);
        }
    }

    handleClickRight(){
        if(this.state.blockRight){
            this.getBlockByNumber(this.state.block.number-1);
        }
    }

    //docker run -p 50051:50051 -it tronnode /bin/bash -c 'cd build/libs; java -jar java-tron.jar'

    _setBlockState(blockEntity){
        this.setState({
            block: blockEntity.hits.hits[0]._source
        }); 

        this.state.blockLeft = false;
        this.state.blockRight = false;


        this.checkNextBlockByNumber(this.state.block.number+1, true)
        this.checkNextBlockByNumber(this.state.block.number-1, false)
    }

    render(){
        return(
            <div>
             <Row className="padding boarder-bottom-tron componentTableHeader">

                        <div>
                            <input
                                type="submit"
                                value="<<"
                                className="btn leftAlign"
                                placeholder=""
                                onClick={this.handleClickLeft}
                            />
                        </div>
                        <div>
                            <input
                                type="submit"
                                value=">>"
                                className="btn rightAlign"
                                placeholder=""
                                onClick={this.handleClickRight}
                            />
                        </div>
                 </Row>

                <div className="">
                  <Panel className="greyPanelHeader">
                    <Panel.Heading>Block</Panel.Heading>
                    <Panel.Body>
                            <ListGroup>
                                <Row>
                                    <ListGroupItem className="textAlignLeft">Number     {this.state.block.number}</ListGroupItem>
                                </Row> 
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Hash      {this.state.block.hash}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Parent Hash      {this.state.block.parentHash}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Witness Address      {this.state.block.witnessAddress}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Transactions Count      {this.state.block.transactionsCount}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Transactions Total      {this.state.block.transactionsTotal}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Size      {this.state.block.size}</ListGroupItem>
                                </Row>
                                <Row>
                                    <ListGroupItem  className="textAlignLeft">Creation Time      {this.state.block.time}</ListGroupItem>
                                </Row>

                            </ListGroup>

                    </Panel.Body>
                </Panel>

                   <TransactionsPanel transactions={this.state.block.transactions}/>

                </div>
            </div>
        )
    }
}

class TransactionsPanel extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            transactions:[]
        }
    }

    _transformData(){
        this.state.transactions = Object.assign([],this.props.transactions);
    }

    render(){
        this._transformData();
        return(

            <Panel className="greyPanelHeader">
                <Panel.Heading>Transactions</Panel.Heading>
                <table id="TransactionTable" className="tableWidth">
                    <tbody>
                        <tr>
                            <th className="tableTitle textAlignCenter">#</th>
                            <th className="tableTitle textAlignCenter">To Address</th>
                            <th className="tableTitle textAlignCenter">From Address</th>
                            <th className="tableTitle textAlignCenter">Amount</th>
                        </tr>
                        {
                            this.state.transactions.map((transaction, index) => {
                                var output =
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{transaction.toaddress}</td>
                                    <td>{transaction.fromaddress}</td>
                                    <td>{transaction.amount}</td>
                                </tr>
                                return output;
                            })
                        }
                    </tbody>
                </table>
            </Panel>
        )
    }
}

export default BlockInfo;