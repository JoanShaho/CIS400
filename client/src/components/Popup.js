import React from 'react';  
import '../style/popupstyle.css';
import Likert from 'react-likert-scale';

class Popup extends React.Component {  
  constructor(props) {
    super(props);

    // The state maintained by this React Component.
    // This component maintains the list of people.
    this.state = {
      input:"",
      value:0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
      this.setState({
          input: e.target.value
      });
  }

  render() {
        return (
        <div className='popup'>  
            <div className='popup_inner'>
                <h1>{this.props.title}</h1>
                <input type="text" placeholder="skill" onChange={this.handleInputChange}></input>
                <br></br>
                <Likert {...{
                    question: this.props.question,
                    responses: [
                      { value: 1, text: this.props.lowLevel },
                      { value: 2, text: "" },
                      { value: 3, text: "" },
                      { value: 4, text: "" },
                      { value: 5, text: this.props.highLevel }
                    ],
                    picked: val => {
                      this.setState({
                        value:val
                      })
                    }
                  }} />
                <div>
                    <button onClick={() => this.props.callbackFromParent(this.state.value, this.state.input)}>ADD</button>
                    <button onClick={this.props.closePopup}>Cancel</button>
                </div>
            </div>
        </div>  
        );  
    }  
}  

export default Popup;