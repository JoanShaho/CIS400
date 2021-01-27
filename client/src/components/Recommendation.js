import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Reccomendation extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
            <div>
                <center>
                    <div style={{height:"30px", width: "50%", background:"#bfd2db"}}>
                        <div>{this.props.entry}</div>
                    </div>
                </center>
                <div style={{height:"30px", background:"white"}}>
                </div>
            </div>
		);
	}
}