import React from "react";
import "../style/RecommendationsPage.css";
import Member from './Member';
import "bootstrap/dist/css/bootstrap.min.css";

export default class RecommendationsPage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      members: [],
      username: "",
      login: false,
      current: false,
      profile: false
    };
    this.profile = this.profile.bind(this);
    this.getMembers = this.getMembers.bind(this);
  }

  profile() {
    this.setState({
      profile: true
    });
  }

  getMembers() {
    fetch("http://localhost:8081/getMembers", {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        // var peopleList = data.map((person, i) =>
        //     <Recommendation key = {i} entry = {person}></Recommendation>
        // );
        var john = {
            name: "John",
            school: "SEAS",
            course: "CIS380"
        };
        // var bob = {
        //     name: "Bob",
        //     school: "SAS",
        //     course: "LING104"
        // };
        // var peopleList = [<Recommendation key = {0} entry = {john}></Recommendation>, <Recommendation key = {1} entry = {bob}></Recommendation>]
        var peopleList = [<Member key = {0} entry = {john}></Member>]
        this.setState({
            // TODO: update state appropriately
            members: peopleList
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
        this.getMembers();
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
            <p style={{textAlign:"center", fontFamily:"Open Sans", fontSize:"50px"}}><i><b>Your Team</b></i></p>
            {this.state.members}
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}