import React from "react";
import "../style/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      username: "",
      password: "",
      profile: false,
      current: false
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
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

  checkLogin() {
    var username = encodeURIComponent(this.state.username);
    var password = encodeURIComponent(this.state.password);

    if (username !== "" && password !== "") {
      fetch("http://localhost:8081/checkLogin/"+username+"/"+password, {
        method: "POST",
      })
      .then(res => res.json()) 
      .then(data => {
        this.setState({
          school: data.school,
          course: data.class_string,
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
            username: data.user
          });
        } else {
          this.setState({
            profile:false,
            current:true,
            username: ""
          });
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.profile === true) {
      var username = encodeURIComponent(this.state.username);
      window.location = "/ProfilePage/"+username;
    } else if (this.state.current) {
      return (
        <div className="LoginPage">
          <div className="container people-container">
            <br></br>
            <div className="jumbotron less-headspace">
              <p style={{textAlign:"center", fontFamily:"Arial", fontSize:"50px"}}>Sign In</p>
              <center>
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
                  <button className="submitButton" onClick={this.checkLogin}>SUBMIT</button>
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