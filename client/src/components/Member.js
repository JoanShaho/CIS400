import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Member extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
            <div>
                <div style={{height:"30px", background:"#bfd2db"}}>
                    <div style={{display: "table-cell", width:"50%"}}>{this.props.entry.name}</div>
                    <div style={{display: "table-cell", width:"50%"}}>{this.props.entry.school}</div>
                    <div style={{display: "table-cell", width:"50%"}}>{this.props.entry.course}</div>
                </div>
                <div style={{height:"30px", background:"white"}}>
                </div>
            </div>
		);
	}
}