import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './index.css';

class Step1 extends React.Component {

  // TODO I think make a base step class then extend that
  // TODO make it so we can decide what fields to show, should pass in state and update fields
  
  constructor(props) {
    super(props);
  }


  render() {

    // If we aren't currently on step 1 of sign up, dont render anything
    if (this.props.currentStep !== 1) {
      return null;
    }

    return(
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Name: 
          <input id="name-field" className="sign-up-field" type = "text" value={this.props.name} onChange={this.props.handleChange}/>
        </label>

        <label>
          Phone Number: 
          <input id="phone-number-field" className="sign-up-field" type = "text" value={this.props.phoneNumber} onChange={this.props.handleChange}/>
        </label>
      </form>

    );
    
  }
}

class SignupForm extends React.Component{

  // TODO move this to separate file and export to here

  constructor(props) {
    super(props);

    this.state = {
      currentStep : 1,
      name: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: ""
    };

    // give handleChange and handleSubmit buttons access to this
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // TODO pass a get state to steps

  handleChange(event) {
    // TODO when a field is changed set the state
    // TODO only update and validate when finished typing
    console.log(event.target.value);
    console.log(event.target.id);



    // handle saing data
    if (!event.target.id) {
      // todo throw an error
    }

    // go here https://reactjs.org/docs/forms.html and to handling multople inputs

    // save the users name
    if (event.target.id === "name-field") {
      
      this.setState({name: event.target.value});
    }

    if (event.target.id === "name-field") {
      
      this.setState({phoneNumber: event.target.value});
    }


  }

  handleSubmit(event) {
    // TODO make sure data is complete and can easily be passed to backend
    event.preventDefault();
  }

  signUp() {
    //TODO finish the process

  }

  render() {

    return(
      <div id="sign-up-form">
        <h1>Sign Up</h1>
        <Step1 currentStep={this.state.currentStep} name={this.state.name} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    );
  }

}


function App(props) {
  return(
    <div className="App">
      <header>
      </header>
      <body>
        <SignupForm/>
      </body>
    </div>
  );
}

export default App;
