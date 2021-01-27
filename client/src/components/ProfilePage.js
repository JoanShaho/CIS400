import React from "react";
import "../style/ProfilePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      edit: false,
      username: "",
      rec: false,
      login: false,
      current: false
    };
    this.setEdit = this.setEdit.bind(this);
    this.setRec = this.setRec.bind(this);
  }

  setEdit() {
    this.setState({
      edit: true
    });
  }

  setRec() {
    this.setState({
      rec: true
    });
  }

  logout() {
    fetch("http://localhost:8081/logout", {
        method: "POST"
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          login: true,
          current: false
        });
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.setState({
      username: this.props.match.params.username
    });

    fetch("http://localhost:8081/getSession", {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => {
    if (data.user != "") {
      this.setState({
        login:false,
        current:true
      });
    } else {
      this.setState({
        login:true,
        current:false
      });
    }
    })
    .catch(err => console.log(err))	
  }

  render() {
    if (this.state.edit === true) {
      return window.location="/EditProfilePage";
    } else if (this.state.rec === true) {
      return window.location="/RecommendationsPage";
    } else if (this.state.login === true) {
      window.location = "/LoginPage";
    } else if (this.state.current) {
      return (
        <div className="ProfilePage">
          <div className="container people-container">
            <br></br>
            <div className="jumbotron less-headspace">
              <p style={{textAlign:"center", fontFamily:"Open Sans", fontSize:"80px"}}><i><b>Hello {this.state.username}</b></i></p>
              <center>
                <button className="editButton" onClick={() => this.setEdit()}>Edit</button><br></br><br></br>
                <button className="recButton" onClick={() => this.setRec()}>See recommendations</button><br></br><br></br>
                <button className="LogoutButton" onClick={() => this.logout()}>Logout</button>
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