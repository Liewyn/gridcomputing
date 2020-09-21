import React, {Component} from 'react'
import {connectSocket} from '../Socket/socket'

export default class Login extends Component{

  constructor(props){
    super(props)
    this.state = {
      name:''
    }
  }

  handleChange = (event)=>{

    this.setState({name:event.target.value})
  }

  handleClick = ()=>{
    connectSocket(this.state.name);
  }
  

  render(){
    return (
      <>
        <input onChange={this.handleChange}></input>
        <button onClick={this.handleClick}>Conectar</button>
      </>
    )
  }
}

