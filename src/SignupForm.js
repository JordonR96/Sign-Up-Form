import React from 'react';
import validator from 'validator';
import DatePicker from 'react-date-picker';
import './index.css';
import './App.css';


function formatDate(date) {
      
    const d = new Date(date)
    let  day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    let year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}

function SignUpComplete(props) {
if (props.currentStep !==4) {
  return null;
}

return(
  <div>
    <p>Welcome {props.firstName} you have successfully signed up!</p>
    <p><a href="">Sign In</a></p>
  </div>
);

}

function ConfirmDetails(props) {

// If we aren't currently on step 1 of sign up, dont render anything
if (props.currentStep !== 3) {
  return null;
}

return(
  <div>
    
    <table className="user-details-table">
        <tbody>
          <tr>
            <td className="user-detail-name">First Name:</td>
            <td className="user-detail-value">{props.signUpState.firstName}</td>
          </tr>
          <tr>
            <td className="user-detail-name">Last Name:</td>
            <td className="user-detail-value">{props.signUpState.lastName}</td>
          </tr>
          <tr>
            <td className="user-detail-name">PhoneNumber:</td>
            <td className="user-detail-value">{props.signUpState.phoneNumber}</td>
          </tr>
          <tr>
            <td className="user-detail-name">Email:</td>
            <td className="user-detail-value">{props.signUpState.email}</td>
          </tr>
          <tr>
            <td className="user-detail-name">Date of Birth:</td>
            <td className="user-detail-value">{props.signUpState.dateOfBirth.toDateString().slice(4)}</td>
          </tr>
        </tbody>
      </table>

    <form onSubmit={props.handleSubmit}>
      <div className="field-container">
        <label>
        <span className="field-label">Confirm Details</span>
          <input name="confirmedDetails" type = "radio"  checked={props.signUpState.confirmedDetails} onChange={props.confirmDetails}/>
        </label>
      </div>

    </form>
  </div>

);

}

function Step2(props) {

  // If we aren't currently on step 2 of sign up, dont render anything
  if (props.currentStep !== 2) {
    return null;
  }

  return(
    <form onSubmit={props.handleSubmit}>
      <div className="field-container">
        <label>
          <div className="field-label">Email</div>
          <input 
            aria-label="Email"
            aria-required="true"
            name="email" 
            placeholder= "Type Here" 
            type = "email" 
            className="field" 
            value={props.email} 
            onChange={props.handleChange}
          />
          <div className="error">{props.errors.email}</div>
        </label>
      </div>

      <div className="field-container">
        <label>
        <div className="field-label">Date of Birth</div>
        <DatePicker
            calendarAriaLabel="Date of Birth"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            yearAriaLabel="Year"
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            name="dateOfBirth"
            value={props.dateOfBirth}
            onChange={props.handleDateOfBirthChange}
            className="date-picker-field"
            format="y-MM-dd"
            maxDate ={new Date()}
          
        />
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
  
  return(
    <form onSubmit={props.handleSubmit}>

      <div className="field-container">
        <label>
          <div className="field-label">First Name</div>
          <input 
            name="firstName"
            aria-label="First Name"
            aria-required={true}
            placeholder="Type Here"
            type = "text" 
            className="field" 
            value={props.firstName} 
            onChange={props.handleChange}/>
        </label>
      </div>

      <div className="field-container">
        <label>
          <div className="field-label">Last Name</div>
          <input 
            name="lastName"
            aria-label="Last Name"
            aria-required={true}
            placeholder="Type Here" 
            type = "text" 
            className="field" 
            value={props.lastName} 
            onChange={props.handleChange}
          />
        </label>
      </div>

      <div className="field-container">
        <label>
        <div className="field-label">Phone Number</div>
          <input 
            name="phoneNumber"
            aria-label="Phone Number" 
            aria-required={true}
            placeholder="Enter UK mobile number" 
            type = "tel" 
            pattern="[789][0-9]{9}" 
            className="field" 
            value={props.phoneNumber} 
            onChange={props.handleChange}
          />
          <div className="error">{props.errors.phoneNumber}</div>
        </label>
      </div>

    </form>

  );
  
}

function SignupFormButtons(props) {

let buttons = [];

if (props.currentStep < props.totalSteps - 1) {

  let nextDisabled = true;
  if (props.currentStep === 1) {
    nextDisabled = !props.step1Complete
  }

  if (props.currentStep === 2) {
    nextDisabled = !props.step2Complete
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

    if (props.currentStep !== 1 && props.currentStep < props.totalSteps) {

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

    if (props.currentStep === props.totalSteps - 1) {
    buttons.push(
        <button 
        key="submit" 
        className="btn btn-submit"
        disabled ={!props.confirmedDetails}
        onClick={props.signup}
        >
        Register
        </button>);
    }

    return (
    <div className = "button-container">
        {buttons}
    </div>
    );

    }


class SignupForm extends React.Component{

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
        formattedDateOfBirth: "",
        errors: {
        email: "",
        phoneNumber: "",
        dateOfBirth: ""
        },
        step1Complete: false,
        step2Complete: false,
        confirmedDetails: false,
        title: "Create your account"
    };

    // give handleChange and handleSubmit buttons access to this
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.nextStep = this.nextStep.bind(this);

    this.previousStep = this.previousStep.bind(this);

    this.validateStep = this.validateStep.bind(this);

    this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);

    this.confirmDetails = this.confirmDetails.bind(this);

    this.signUp = this.signUp.bind(this);
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
        if (
        this.state.email !== "" &&
        this.state.formattedDateOfBirth &&
        this.state.dateOfBirth &&
        errors.email === "" &&
        errors.dateOfBirth === ""
        ) {

        this.setState({step2Complete: true});

        } else {

        this.setState({step2Complete: false});

        }

    }
    }

    confirmDetails() {
        
    this.setState({confirmedDetails: true});
    }


    // need specific function for date selector field
    handleDateOfBirthChange(newDateOfBirth) {
    
    let formattedDateOfBirth = formatDate(newDateOfBirth);
    let errors = this.state.errors;

    errors.dateOfBirth = validator.isDate(formattedDateOfBirth) ? "" : "Please enter a valid date of birth.";
    // update state, always set confirmedDetails to false on change
    this.setState({ 
        dateOfBirth: newDateOfBirth, 
        formattedDateOfBirth: formattedDateOfBirth, 
        confirmedDetails: false,
        errors: errors
    }, this.validateStep);
    }

    // general field change handling
    handleChange(event) {

    const target = event.target;
    let value = target.value;
    const name = target.name;


    let errors = this.state.errors;

    if (name === "phoneNumber") {

        errors.phoneNumber = validator.isMobilePhone(value, 'en-GB') ? "" : "Please Enter A Valid UK Mobile Number.";

    } else if (name === "email") {

        errors.email = validator.isEmail(value) ? "" : "Please enter a valid email address."

    } else if (name === "dateOfBirth") {

        errors.dateOfBirth = validator.isDate(value) ? "" : "Please enter a valid date of birth."

    } 
    
    // update state, always set confirmedDetails to false on change
    this.setState({ [name]: value, errors: errors, confirmedDetails: false}, function() {
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

    const dataToSave = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        dateOfBirth: this.state.dateOfBirth

    }

    // Here we would format data as required call a function to save the data to backend
    // then call the below as a callback
    this.nextStep();
    this.setState({title:"Account Created"})

    }

    render() {

    return(
        <div className="page-container">
        <div className="form-container">
            <h1 className="page-title">{this.state.title}</h1>
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
            handleDateOfBirthChange={this.handleDateOfBirthChange}
            handleSubmit={this.handleSubmit} 
            errors = {this.state.errors}
            />

            <ConfirmDetails
            currentStep={this.state.currentStep}
            signUpState={this.state}
            confirmDetails = {this.confirmDetails}
            handleSubmit={this.handleSubmit}
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

            <SignUpComplete 
            currentStep={this.state.currentStep} 
            firstName={this.state.firstName}
            email={this.state.email}
            
            />

        </div>
        </div>
    );
    }

}

export default SignupForm;
