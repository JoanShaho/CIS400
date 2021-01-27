import React from "react";
import "../style/ProfilePage.css";
import Popup from "./Popup.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Likert from 'react-likert-scale';

// prob put these into a separate file
const generalResponses = [
  { value: 1, text: "Not interested at all" },
  { value: 2, text: "" },
  { value: 3, text: "" },
  { value: 4, text: "" },
  { value: 5, text: "Main goal" }
];
export default class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      edit: true,
      username: "",
      login: false,
      current: false,

      // popups
      knownSkillsShowPopup: false,
      improveSkillsShowPopup: false,
      teachSkillsShowPopup: false,
      currentPopup:-1,

      // popup info
      popupTitle: "",
      popupQuestion: "",
      popupLowLevel: "",
      popupHighLevel: "",
      popupToggle: null,

      // skills info
      knownSkillNames:{},
      knownSkills:[],
      areasOfImprovementNames:{},
      areasOfImprovement:[],
      skillsToTeachNames:{},
      skillsToTeach:[],

      // personal goals
      grade:-1,
      learningSkills:-1,
      makeImpact:-1,
      meetingPeople:-1,
      makeProduct:-1,
      
      // personal traits
      quiteness:-1,
      contribution:-1,
      leaderPosition:-1,
      communicationFrequency:-1,
      proactivityLevel:-1
    };
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.knownSkillsTogglePopup = this.knownSkillsTogglePopup.bind(this);
    this.improveSkillsTogglePopup = this.improveSkillsTogglePopup.bind(this);
    this.teachSkillsTogglePopup = this.teachSkillsTogglePopup.bind(this);
    this.done = this.done.bind(this);
  }

  knownSkillsTogglePopup() {
    this.setState({
      knownSkillsShowPopup: !this.state.knownSkillsShowPopup,
      currentPopup:0
    });
    if (!this.state.knownSkillsShowPopup) {
      this.setState({
        popupTitle: "Add a new skill",
        popupQuestion: "Proficiency Level",
        popupLowLevel: "Beginner",
        popupHighLevel: "Expert",
        popupToggle:this.knownSkillsTogglePopup
      });
    } else {
      this.setState({
        popupTitle: "",
        popupQuestion: "",
        popupLowLevel: "",
        popupHighLevel: "",
        popupToggle: null
      }); 
    }
  }

  improveSkillsTogglePopup() {  
    this.setState({
      improveSkillsShowPopup: !this.state.improveSkillsShowPopup,
      currentPopup:1
    });
    if (!this.state.improveSkillsShowPopup) {
      this.setState({
        popupTitle: "Add a new skill",
        popupQuestion: "Level of improvement",
        popupLowLevel: "Minimal",
        popupHighLevel: "A lot",
        popupToggle: this.improveSkillsTogglePopup
      });
    } else {
      this.setState({
        popupTitle: "",
        popupQuestion: "",
        popupLowLevel: "",
        popupHighLevel: "",
        popupToggle: null
      }); 
    }
  }

  teachSkillsTogglePopup() {  
    this.setState({
      teachSkillsShowPopup: !this.state.teachSkillsShowPopup,
      currentPopup:2
    });
    if (!this.state.teachSkillsShowPopup) {
      this.setState({
        popupTitle: "Add a new skill",
        popupQuestion: "Willingness to teach",
        popupLowLevel: "A few ideas",
        popupHighLevel: "Any concepts asked",
        popupToggle: this.teachSkillsTogglePopup
      });
    } else {
      this.setState({
        popupTitle: "",
        popupQuestion: "",
        popupLowLevel: "",
        popupHighLevel: "",
        popupToggle: null
      }); 
    }
  }

  done() {
      var userInfo = {
        // skills info
        skillsInfo : {
          knownSkillNames:this.state.knownSkillNames,
          knownSkills: this.state.knownSkills,
          areasOfImprovementNames:this.state.areasOfImprovementNames,
          areasOfImprovement:this.state.areasOfImprovement,
          skillsToTeachNames:this.state.skillsToTeachNames,
          skillsToTeach:this.state.skillsToTeach
        },

        // personal goals
        personalGoals : {
          grade:this.state.grade,
          learningSkills:this.state.learningSkills,
          makeImpact:this.state.makeImpact,
          meetingPeople:this.state.meetingPeople,
          makeProduct:this.state.makeProduct
        },
        
        // personal traits
        personalTraits : {
          quiteness:this.state.quiteness,
          contribution:this.state.contribution,
          leaderPosition:this.state.leaderPosition,
          communicationFrequency:this.state.communicationFrequency,
          proactivityLevel:this.state.proactivityLevel
        }
      }
      console.log(userInfo);
      this.setState({
          edit:false
      });
      fetch("http://localhost:8081/updateUserInfo/"+encodeURIComponent(this.state.username), {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
   
          },
          body: JSON.stringify(userInfo)
      })
      .then(res => res.json()) 
      	.then(data => {
      		this.setState({
              // TODO: set state appropriately
              edit:false
      		});
      	})
      .catch(err => console.log(err))
  }

  handleSchoolChange(e) {
      this.setState({
          school: e.target.value
      });
  }

  handleCourseChange(e) {
    this.setState({
        course: e.target.value
    });
  }

  myCallback = (val, input) => {
    if (input != "") {
      var namesCopy = null;
      if (this.state.currentPopup == 0) {
        namesCopy = this.state.knownSkillNames;
        namesCopy[input] = Object.keys(namesCopy).length;
        this.setState({
          knownSkills: this.state.knownSkills.concat(val),
          knownSkillNames: namesCopy,
          knownSkillsShowPopup: !this.state.knownSkillsShowPopup
        });
      } else if (this.state.currentPopup == 1) {
        namesCopy = this.state.areasOfImprovementNames;
        namesCopy[input] = Object.keys(namesCopy).length;
        this.setState({
          areasOfImprovement: this.state.areasOfImprovement.concat(val),
          areasOfImprovementNames: namesCopy,
          improveSkillsShowPopup: !this.state.improveSkillsShowPopup
        });
      } else {
        namesCopy = this.state.skillsToTeachNames;
        namesCopy[input] = Object.keys(namesCopy).length;
        this.setState({
          skillsToTeach: this.state.skillsToTeach.concat(val),
          skillsToTeachNames: namesCopy,
          teachSkillsShowPopup: !this.state.teachSkillsShowPopup
        });
      }
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
        login:false,
        current:true,
        username: data.user
      });
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
    if (this.state.edit === false) {
        var username = encodeURIComponent(this.state.username);
        window.location = "/ProfilePage/"+username;
    } else if (this.state.login) {
      window.location = "/LoginPage"
    } else if (this.state.current) {
      return (
        <div className="EditProfilePage">
          <div className="container people-container">
            <br></br>
            {(this.state.knownSkillsShowPopup || this.state.improveSkillsShowPopup || this.state.teachSkillsShowPopup) ?  
                <Popup
                    title={this.state.popupTitle}
                    question={this.state.popupQuestion}
                    lowLevel={this.state.popupLowLevel}
                    highLevel={this.state.popupHighLevel}
                    closePopup={this.state.popupToggle.bind(this)}
                    callbackFromParent={this.myCallback}
                />  
                : 
                <div className="jumbotron less-headspace">
                  <p style={{textAlign:"center", fontFamily:"Open Sans", fontSize:"50px"}}><i><b>Please fill the entries below</b></i></p>
                  <center>
                        <div className="labelInput">
                              <center>
                                  Add known skills: <button onClick={() => this.knownSkillsTogglePopup()}>Add Skill</button>
                              </center>
                        </div>
                        <br></br>
                        <div className="labelInput">
                              <center>
                                  Add skills to improve: <button onClick={() => this.improveSkillsTogglePopup()}>Add Skill</button>
                              </center>
                        </div>
                        <br></br>
                        <div className="labelInput">
                              <center>
                                  Add skills comfortable teaching: <button onClick={() => this.teachSkillsTogglePopup()}>Add Skill</button>
                              </center>
                        </div>
                        <br></br><br></br>
                        <div className="labelInput">
                            Personal Goals:
                            <center>
                                <Likert {...{
                                    question: "Getting a good grade",
                                    responses: [
                                      { value: 0, text: "N/A" },
                                      { value: 1, text: "Not interested at all" },
                                      { value: 2, text: "" },
                                      { value: 3, text: "" },
                                      { value: 4, text: "" },
                                      { value: 5, text: "Main goal" }
                                    ],
                                    picked: val => {
                                        this.setState({
                                          grade:val
                                        });

                                        console.log(this.state.knownSkillNames);
                                      }
                                  }} />
                                <Likert {...{
                                    question: "Learning new skills",
                                    responses : generalResponses,
                                    picked: val => {
                                      this.setState({
                                        learningSkills:val
                                      });
                                    }
                                  }} />
                                <Likert {...{
                                    question: "Making an impact",
                                    responses : generalResponses,
                                    picked: val => {
                                      this.setState({
                                        makeImpact:val
                                      });
                                    }
                                  }} />
                                <Likert {...{
                                    question: "Meeting more people",
                                    responses : generalResponses,
                                    picked: val => {
                                      this.setState({
                                        meetingPeople:val
                                      });
                                    }
                                  }} />
                                <Likert {...{
                                    question: "Making an actual product",
                                    responses : generalResponses,
                                    picked: val => {
                                      this.setState({
                                        makeProduct:val
                                      });
                                    }
                                  }} />
                            </center>
                            <br></br><br></br>
                        </div>
                        <div className="labelInput">
                            Personality Traits:
                            <center>
                                <Likert {...{
                                    question: "What type of environment do you work the best in?",
                                    responses : [
                                      { value: 1, text: "Completely quiet" },
                                      { value: 2, text: "" },
                                      { value: 3, text: "" },
                                      { value: 4, text: "" },
                                      { value: 5, text: "Lots of music" }
                                    ],
                                    picked: val => {
                                      this.setState({
                                        quiteness:val
                                      });
                                    }
                                  }} />
                                <Likert {...{
                                    question: "How much do you want to contribute on a project?",
                                    responses : [
                                      { value: 1, text: "10%" },
                                      { value: 2, text: "" },
                                      { value: 3, text: "" },
                                      { value: 4, text: "" },
                                      { value: 5, text: "100%" }
                                    ],
                                    picked: val => {
                                      this.setState({
                                        contribution:val
                                      });
                                    }
                                  }} />
                                <Likert {...{
                                    question: "How much do you want to be a leader in a project?",
                                    responses : [
                                      { value: 1, text: "Not at all" },
                                      { value: 2, text: "" },
                                      { value: 3, text: "" },
                                      { value: 4, text: "" },
                                      { value: 5, text: "Main leader" }
                                    ],
                                    picked: val => {
                                      this.setState({
                                        leaderPosition:val
                                      });
                                    }
                                  }} />
                                <Likert {...{
                                    question: "How frequently do you want to communicate in a project?",
                                    responses : [
                                      { value: 1, text: "Once a week" },
                                      { value: 2, text: "" },
                                      { value: 3, text: "" },
                                      { value: 4, text: "" },
                                      { value: 5, text: "Every day" }
                                    ],
                                    picked: val => {
                                      this.setState({
                                        communicationFrequency:val
                                      });
                                    }
                                  }} />
                                <Likert {...{
                                    question: "How early do you want to start working on a project?",
                                    responses : [
                                      { value: 1, text: "A couple of days before the deadline" },
                                      { value: 2, text: "" },
                                      { value: 3, text: "" },
                                      { value: 4, text: "" },
                                      { value: 5, text: "A couple of weeks before the deadline" }
                                    ],
                                    picked: val => {
                                      this.setState({
                                        proactivityLevel:val
                                      });
                                    }
                                  }} />
                            </center>
                            <br></br><br></br>
                        </div>
                        <button className="editButton" onClick={() => this.done()}>SUBMIT</button>
                  </center>
                </div>
            }
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}