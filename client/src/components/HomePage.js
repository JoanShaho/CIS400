import React from "react";
import "../style/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      redirectToSignIn:false,
      redirectToSignUp:false
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect(logIn) {
    console.log(logIn);
    if (logIn === true) {
      this.setState({
        redirectToSignIn: true
      });
    } else {
      this.setState({
        redirectToSignUp: true
      });
    }
  }

  render() {
    if (this.state.redirectToSignIn === true) {
      window.location = "/LoginPage";
    }
    if (this.state.redirectToSignUp === true) {
      window.location = "/SignUpPage";
    }
    return (
      <div className="HomePage">
        <div className="container people-container">
          <br></br>
          <div className="jumbotron less-headspace">
              <center>
                  <h1>
                      Welcome!
                  </h1>
                  <button className="loginButton" onClick={() => this.redirect(true)}>Sign in!</button>
                  <br></br>
                  <br></br>
                  <button className="signUpButton" onClick={() => this.redirect(false)}>Sign up!</button>
              </center>
          </div>
        </div>
      </div>
    );
  }
}