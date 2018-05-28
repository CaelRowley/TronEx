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

                <iframe className="witnessContainer" src="http://www.tronex.co.uk:5601/app/kibana#/dashboard/3d739330-628f-11e8-a207-e7366f538d0d?embed=true&_g=()" height="600" width="800"></iframe>

        )
    }
}

export default GraphWitnesses;
