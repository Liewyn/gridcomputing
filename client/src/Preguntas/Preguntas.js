import React, {Component} from 'react'


export default class Preguntas extends Component{

  constructor(props){
    super(props)
    this.state = {
      numPregunta:-1,
      selected: [],
      preguntas: [],
      puntuacion:0
    }
  }

  componentDidMount(){
    let preguntas = [
      {
        "pregunta": "¿En qué año nació simon bolivar?",
        "respuestas":["1492","1342","1800"]
      },
      {
        "pregunta": "¿En qué año nació simon trinidad?",
        "respuestas":["1500", "1700" , "1555"] 
      },
      {
        "pregunta": "¿En qué año nació bad bunny?",
        "respuestas":["1992","1342","1800"]
      }
    ]
    this.setState({numPregunta:0,preguntas,selected: preguntas.map(pta=>-1)});
  }

  _handleSubmit = (event)=>{
    event.preventDefault()
    console.log({respuestas:this.state.selected})
    fetch('http://localhost:8080/confirmar',{method:'POST',body:JSON.stringify({respuestas:this.state.selected})}).then((response) => {
      return response.json();
    }).then((jsonobj)=>{
      
    })
  }

  _handleClickRadio = (i,j)=>{
    console.log({i,j})
    this.setState((state,props)=>{
      let selected = [...state.selected]
      selected[i] = j
      return {selected}
    })
  }

  render(){
    if (this.state.numPregunta != -1){
    return (
      <form onSubmit={this._handleSubmit}>
        {this.state.preguntas.map((pta,i)=>(
          <>
            <span>{pta.pregunta}</span>
            {pta.respuestas.map((rpta,j)=>(
              <>
                <input type="radio"name={`${i}`} onClick={()=>{this._handleClickRadio(i,j)}}/> {rpta}
              </>    
            ))}
          </>
        ))} 
            <button type="submit">Enviar</button>     
      </form>
    )
    }else{
      return (<>{"Cargando"}</>)
    }
  }

}