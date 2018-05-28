import React, { Component } from 'react';
import Service from './../../components/utils/service.js';

import './style.css';

class GraphBlocks extends Component {
    constructor(props){
        super(props);

        this.state = {
        }


    }

    render(){
        console.log("here")
        return(

                <iframe className="graphContainer" src="http://www.tronex.co.uk:5601/app/kibana#/dashboard/5d6cc090-6289-11e8-a207-e7366f538d0d?embed=true&_g=(refreshInterval%3A(display%3A'10%20seconds'%2Cpause%3A!t%2Csection%3A1%2Cvalue%3A10000)%2Ctime%3A(from%3A'2018-05-28T07%3A56%3A21.281Z'%2Cmode%3Aabsolute%2Cto%3A'2018-05-28T08%3A11%3A21.281Z'))" height="600" width="800"></iframe>

        )
    }
}

export default GraphBlocks;
