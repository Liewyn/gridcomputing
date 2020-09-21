import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Preguntas from './Preguntas/Preguntas'
import Login from './Login/login'



class App extends Component {

  

  componentDidMount(){
  }

  render(){
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
