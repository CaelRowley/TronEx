import React, { Component } from 'react';
import Service from './../../components/utils/service.js';

import './style.css';

class GraphNodes extends Component {
    constructor(props){
        super(props);

        this.state = {
        }


    }

    render(){
        console.log("here")
        return(

            <iframe className="graphContainer" src="http://www.tronex.co.uk:5601/app/kibana#/dashboard/f60f7d30-6458-11e8-a207-e7366f538d0d?embed=true&_g=(refreshInterval%3A(display%3A'10%20seconds'%2Cpause%3A!f%2Csection%3A1%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-1M%2Cmode%3Arelative%2Cto%3Anow-11m))" height="600" width="800"></iframe>
        )
    }
}

export default GraphNodes;
