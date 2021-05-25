import React from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import DatePicker from "react-datepicker";
import './App.css';
import './index.css';

function Step2(props) {

    // If we aren't currently on step 2 of sign up, dont render anything
    if (props.currentStep !== 2) {
      return null;
    }

    return(
      <form onSubmit={props.handleSubmit}>
        <div className="field-container">
          <label>
            <input name="email" placeHolder= "Email" type = "email" className="sign-up-field" value={props.email} onChange={props.handleChange}/>
            <div className="error">{props.errors.email}</div>
          </label>
        </div>

        <div className="field-container">
          <label>
            <input name="dateOfBirth" placeHolder= "Date Of Birth" type = "text" className="sign-up-field" value={props.dateOfBirth} onChange={props.handleChange}/>
            <div className="error">{props.errors.dateOfBirth}</div>
          </label>
        </div>
      </form>

    );
    
}

function Step1(props) {

    // If we aren't currently on step 1 of sign up, dont render anything
    if (props.currentStep !== 1) {
      return null;
    }
    //todo first name and lastname
    return(
      <form onSubmit={props.handleSubmit}>

        <div className="field-container">
          <label>
            <input name="firstName" placeholder="First Name" type = "text" className="sign-up-field" value={props.firstName} onChange={props.handleChange}/>
          </label>
        </div>

        <div className="field-container">
          <label>
            <input name="lastName" placeholder="Last Name" type = "text" className="sign-up-field" value={props.lastName} onChange={props.handleChange}/>
          </label>
        </div>

        <div className="field-container">
          <label>
            <input name="phoneNumber" placeholder="Phone Number" type = "tel" pattern="[789][0-9]{9}" className="sign-up-field" value={props.phoneNumber} onChange={props.handleChange}/>
            <div className="error">{props.errors.phoneNumber}</div>
          </label>
        </div>

      </form>

    );
    
}

function SignupFormButtons(props) {

  let buttons = [];

  if (props.currentStep < props.totalSteps) {

    let nextDisabled = true;
    if (props.currentStep === 1) {
      nextDisabled = !props.step1Complete
    }

    if (props.currentStep === 2) {
      nextDisabled = !props.step2Complete
    }

    if (props.currentStep === 3) {
      nextDisabled = !props.confirmedDetails
    }

    buttons.push(
      <button 
        key="next" 
        className="btn" 
        disabled={nextDisabled} 
        onClick={props.nextStep}
      >
        Next
      </button>
    );

  }

  if (props.currentStep !== 1) {

    buttons.push(
      <button 
        key="previous" 
        className="btn" 
        onClick={props.previousStep}
      >
        Previous
      </button>
    );

  }

  if (props.currentStep === props.totalSteps) {
    buttons.push(<button key="submit" className="btn btn-submit" onClick={props.onSubmit}>Register</button>);
  }

  return (
    <div className = "button-container">
      {buttons}
    </div>
  );

}


class SignupForm extends React.Component{

  // TODO move this to separate file and export to here

  constructor(props) {
    super(props);

    this.state = {
      currentStep : 1,
      totalSteps: 4,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      errors: {
        email: "",
        phoneNumber: "",
        dateOfBirth: ""
      },
      step1Complete: false,
      step2Complete: false,
      confirmedDetails: false
    };

    // give handleChange and handleSubmit buttons access to this
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.nextStep = this.nextStep.bind(this);

    this.previousStep = this.previousStep.bind(this);

    this.validateStep = this.validateStep.bind(this);
  }

  validateStep() {
    const currentStep = this.state.currentStep;
    const errors = this.state.errors;
    // only need validation funtion for steps 1 and 2 
    if (currentStep === 1) {
      // check step 1 is complete
      if (
        this.state.firstName !== "" && 
        this.state.lastName !== "" &&
        this.state.phoneNumber !== "" &&
        errors.phoneNumber === ""
      ) {

        this.setState({step1Complete: true});

      } else {
        
        this.setState({step1Complete: false});

      }
    }

    if (currentStep === 2) {
      // Check Step 2 is complete

    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let errors = this.state.errors;

    if (name === "phoneNumber") {

      errors.phoneNumber = validator.isMobilePhone(value, 'en-GB') ? "" : "Please Enter A Valid Uk Mobile Number.";

    } else if (name === "email") {

      errors.email = validator.isEmail(value) ? "" : "Please enter a valid email address."

    } else if (name === "dateOfBirth") {

      errors.dateOfBirth = validator.isEmail(value) ? "" : "Please enter a valid date of birth."

    }

    this.setState({ [name]: value, errors: errors}, function() {
      this.validateStep();
    });

  }

  handleSubmit(event) {
    // prevent the user from actually submitting a form
    event.preventDefault();
    
  }

  nextStep() {

    // only add step if we aren't on the last step
    if (this.state.currentStep < this.state.totalSteps) {
      this.setState({currentStep: this.state.currentStep + 1})
    }

  }

  previousStep() {
    // only cant previous step if on first step
    if (this.state.currentStep !== 1) {
      this.setState({currentStep: this.state.currentStep - 1})
    }
  }

  
  signUp() {
    //TODO finish the process

  }

  render() {

    return(
      <div id="sign-up-form">
        <h1>Sign Up</h1>
        <Step1 
          currentStep={this.state.currentStep} 
          firstName={this.state.firstName} 
          lastName={this.state.lastName} 
          phoneNumber ={this.state.phoneNumber} 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          errors = {this.state.errors}
        />

        <Step2 
          currentStep={this.state.currentStep} 
          email={this.state.email} 
          dateOfBirth={this.state.dateOfBirth}
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit} 
          errors = {this.state.errors}
        />

        
        
        <SignupFormButtons 
          currentStep={this.state.currentStep} 
          totalSteps = {this.state.totalSteps}
          step1Complete = {this.state.step1Complete}
          step2Complete = {this.state.step2Complete}
          confirmedDetails = {this.state.confirmedDetails}
          nextStep={this.nextStep} 
          previousStep={this.previousStep} 
          signup={this.signUp}
        />
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
