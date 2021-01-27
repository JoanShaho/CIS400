import React from "react";
import "../style/RecommendationsPage.css";
import Recommendation from './Recommendation';
import "bootstrap/dist/css/bootstrap.min.css";
import Reccomendation from "./Recommendation";

export default class RecommendationsPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      rec: [],
      username: "",
      currentMember: "",
      login: false,
      current: false,
      profile: false
    };
    this.profile = this.profile.bind(this);
    this.accept = this.accept.bind(this);
    this.getRecs = this.getRecs.bind(this);
  }

  profile() {
    this.setState({
      profile: true
    });
  }

  accept() {
    var member = encodeURIComponent(this.state.currentMember);
    fetch("http://localhost:8081/addToGroup/"+member, {
          method: "POST"
        })
        .then(res => res.json()) 
        .then(data => {
          this.getRecs();
        })
        .catch(err => console.log(err))
  }

  getRecs() {
    fetch("http://localhost:8081/getRecs", {
      method: "GET"
    })
    .then(res => res.json()) 
    .then(data => {
      console.log(data);
      //var recs = [];
      console.log(data.Reccomendation);
      var recs = data.Reccomendation.map((d, i) =>
				<Reccomendation key = {i} entry={d}></Reccomendation>
      );
      console.log(recs)
      this.setState({
        rec: recs
      });
    })
    .catch(err => console.log(err))
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
          login:false,
          current:true,
          username: data.user
        });
        this.getRecs();
      } else {
        this.setState({
          login:true,
          current:false,
          username: ""
        });
      }
      })
      .catch(err => console.log(err))	
  }

  render() {
    if (this.state.login) {
      window.location = "/LoginPage";
    } else if (this.state.profile) {
      var username = encodeURIComponent(this.state.username);
      window.location = "/ProfilePage/"+username;
    } else if (this.state.current) {
      return (
        <div className="RecommendationsPage">
          <div className="container people-container">
            <br></br>
            <p style={{textAlign:"center", fontFamily:"Open Sans", fontSize:"50px"}}><i><b>Find your next project partner(s)</b></i></p>
            {this.state.rec}
          </div>
          <center>
            {/* <button className="acceptButton" onClick={() => this.accept()}>Accept</button>
            <button className="rejectButton" onClick={() => this.getRecs()}>Reject</button><br></br><br></br> */}
            <button className="profileButton" onClick={() => this.profile()}>Profile Page</button><br></br><br></br>
          </center>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}