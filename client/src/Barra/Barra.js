import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import {getUsers, getLevelBar} from '../Socket/socket'

// const rand = (min, max, num) => {
//   var rtn = [];

//   while (rtn.length < num) {
//     rtn.push((Math.random() * (max - min)) + min);
//   }

//   return rtn;
// }


var MAX_LIMIT = 3000  

export default class Barra extends Component {
    constructor(props) {
      super(props);
      this.state = {
        barLevel:0,
      }
      // Chart.defaults.global.responsive = true;
    }

    componentDidMount(){
      setInterval(()=>{
        let values = Object.values(getUsers())
        let numUsers = values.length;
        console.log(`${numUsers} users`)
        this.setState({
          barLevel: getLevelBar(),
        })
      },300)
    }

    render() {
      let data = {
        1: {
          labels: ["Numero de claves descifradas"],
          datasets: [
            {
              // label: "My First dataset",
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [this.state.barLevel],
            },
            
          ]
        },
      }
      //const { data } = this.props;
      
      return (
        <>
        <div>
        {this.state.barLevel >= MAX_LIMIT?(<h1>Proceso completado</h1>):<h1>Procesos consumidos: {this.state.barLevel}</h1>}
          {/* <h1>Procesos consumidos</h1> */}

          {/* Bar chart example */}
          <div className='row' style={{width: '60%',
  margin: '0 auto',
  clear: 'both'}}>
            <Bar data={data[1]} options= {
              {scales: {
                yAxes: [{
                  ticks: {
                    autoSkip: false,
                    min: 0,
                    max: MAX_LIMIT,
                  },
                }]
              },legend:{display:false}}}/>
          </div>
        </div>
        <ul>
          {Object.values(getUsers()).map((username)=>(<li>{username}</li>))}
        </ul>
        </>
      );
    }
  }
  



