import React from "react";
import "../style/LoginPage.css";
import "../style/SignUpPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';

// const responseFacebook = (response) => {
// 	console.log(response);
// }

// const componentClicked = (response) => {
// 	console.log(response);
// }

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
	  first: "",
      last: "",
      username: "",
	  password: "",
	  profile: false,
	  current: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
	this.handlePasswordChange = this.handlePasswordChange.bind(this);
	this.handleFirstChange = this.handleFirstChange.bind(this);
	this.handleLastChange = this.handleLastChange.bind(this);
	this.responseGoogle = this.responseGoogle.bind(this);
	this.signUp = this.signUp.bind(this);
  }

  handleFirstChange(e) {
	this.setState({
		first: e.target.value
	});
  }

  handleLastChange(e) {
	this.setState({
		last: e.target.value
	});
  }

  handleUsernameChange(e) {
		this.setState({
			username: e.target.value
		});
  }
  
  handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		});
	}
  
  responseGoogle = (response) => {
	  console.log(response);
  }

  signUp() {
		var username = encodeURIComponent(this.state.username);
		var password = encodeURIComponent(this.state.password);
		var first = encodeURIComponent(this.state.first);
		var last = encodeURIComponent(this.state.last);
		if (username !== "" && password !== "" && first !== "" && last !== "") {
			fetch("http://localhost:8081/signUp/"+username+"/"+password+"/"+first+"/"+last, {
				method: "POST"
			})
			.then(res => res.json()) 
			.then(data => {
				
				this.setState({
					// TODO: set values appropriately
					profile: true
				});
			})
			.catch(err => console.log(err))
		}
	}

	componentDidMount() {
		fetch("http://localhost:8081/getSession", {
			method: "GET"
		  })
		  .then(res => res.json())
		  .then(data => {
			console.log(data);
			if (data.user != "") {
			  this.setState({
				profile:true,
				current:false,
				username:data.user
			  });
			} else {
			  this.setState({
				profile:false,
				current:true,
				username:""
			  });
			}
		  })
		  .catch(err => console.log(err))
	  }

  render() {
	if (this.state.profile === true) {
		var username = encodeURIComponent(this.state.username);
		window.location="/ProfilePage/"+username;
	} else if (this.state.current) {
		return (
			<div className="SignUpPage">
				<div className="container people-container">
				<br></br>
				<div className="jumbotron less-headspace">
					<p style={{textAlign:"center", fontFamily:"Arial", fontSize:"50px"}}>Join The Best Matching Platform</p>
					<center>
						<div className="labelInput">
						First Name
						<br></br>
						<input className = "inputBox" type="text" id="first" name="first" onChange={this.handleFirstChange}></input><br></br><br></br>
						</div>
						<div className="labelInput">
						Last Name
						<br></br>
						<input className = "inputBox" type="text" id="last" name="last" onChange={this.handleLastChange}></input><br></br><br></br>
						</div>
						<div className="labelInput">
						Username
						<br></br>
						<input className = "inputBox" type="text" id="username" name="username" onChange={this.handleUsernameChange}></input><br></br><br></br>
						</div>
						<div className="labelInput">
						Password
						<br></br>
						<input className = "inputBox" type="text" id="password" name="password" onChange={this.handlePasswordChange}></input><br></br><br></br>
						</div>
						<button className="submitButton" onClick={this.signUp}>SUBMIT</button>
					<br></br>
					{/* <GoogleLogin
						clientId="433081526844-f36mr156u5p5216dtk4h0r7fn9vpsgfq.apps.googleusercontent.com"
						buttonText="Sign In with Google"
						onSuccess={this.responseGoogle}
						onFailure={this.responseGoogle}
						cookiePolicy={'single_host_origin'}

					/>
					<FacebookLogin
						appId="1088597931155576"
						autoLoad={true}
						fields="name,email,picture"
						onClick={componentClicked}
						callback={responseFacebook}
					/> */}
					</center>
				</div>
				</div>
			</div>
		);
	} else {
		return (<div></div>);
	}
  }
}