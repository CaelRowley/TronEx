import React, { Component } from 'react';
import Service from './../../components/utils/service.js';

import './style.css';

class GraphWitnesses extends Component {
    constructor(props){
        super(props);

        this.state = {
        }


    }

    render(){
        console.log("here")
        return(

            <iframe className="witnessContainer" src="http://www.tronex.co.uk:5601/goto/4d769d43c932dbdf340f8ac8448713b0?embed=true" height="600" width="800"></iframe>

        )
    }
}

export default GraphWitnesses;
