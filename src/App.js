import React from 'react';
import ReactDOM from 'react-dom';
// TODO uncomment import logo from './logo.svg';
import './App.css';
import './index.css';  

class SignupForm extends React.Component{

  constructor(props) {
    super(props)
  }

  render() {

    return(

      <h1>Testing the render</h1>

    );
  }

}

function App() {
  return (
    <div className="App">
      <header>
        {/*TODO uncomment <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <body>
        <SignupForm/>
      </body>
    </div>
  );
}

export default App;
