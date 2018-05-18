import React, { Component } from 'react';

class Info extends Component {
    constructor(props){
        super(props);

        this.state = {
            witness: props.location.state.witness._source
        }

        console.log(this.state.witness)

    }

    render(){
        return(
            <div>

                <div>Address:{this.state.witness.address}</div>

                <div>latestBlockNum:{this.state.witness.latestBlockNum}</div>
                <div>latestsLotNum:{this.state.witness.latestsLotNum}</div> 
                <div>totalMissed:{this.state.witness.totalMissed}</div>
                <div>totalProduced:{this.state.witness.totalProduced}</div>
                <div>url:{this.state.witness.url}</div>
                <div>voteCount:{this.state.witness.voteCount}</div>
            </div>
        )
    }
}

export default Info;