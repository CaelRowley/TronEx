import React, { Component } from 'react';
import './style.css';
import $ from 'jquery'

class Home extends Component {

    render() {
    	//console.log("this");
    	//this.test();	
        return (
            <div className="Home">
                <h2>Home page</h2>
            </div>

        );
    }

    test(){
    	console.log("Hope")
    }
}

export default Home;