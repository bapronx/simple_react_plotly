import logo from './logo.svg';
import './App.css';

import React from 'react';
// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";
import {Range, sin, pi, multiply, exp, dotMultiply} from "mathjs";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freq: "10",
      damping: 1000
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (target.type === 'checkbox') {
      console.log(event)
    }
    this.setState({
      [name]: value
    });
  }


  render() {
    var mydata = getData(this.state.freq, this.state.damping)
    var data = [{
      x: mydata.x,
      y: mydata.y,
      type: 'scatter',
//      mode: 'lines+markers',
      mode: 'lines',
      marker: {color: 'red'}
    }]
    var layout={width: 1000, height: 500, title: 'A Fancy Plot'}
    return (<div>
      <Param state={this.state} onChange = {this.handleInputChange} />
    
      <Plot
        data={data}
        layout={layout}
      />
      </div>
    );
  }
}

function getData(freq, damping) {
  const f = Number(freq)
  const d = Number(damping)/1000.0
  var x = new Range(0, 1, 0.2e-2)
  x = x.toArray()
  var y = formula(x, f, d)
  var data = {
    x: x,
    y: y
  }
  return data
}

function Param(props) {
  return (<div>
    <form>
      <label>
        Frequency : {props.state.freq} Hz<br/>
        <input
          name="freq"
          type="range"
          min="1"
          max="20"

          value={props.state.freq}
          onChange={props.onChange} />
      </label> <br/>
      <label>
        Damping : {props.state.damping/1000.0}<br/>

        <input
            name="damping"
            type="range"
            min="0"
            max="4000"
  
            value={props.state.damping}
            onChange={props.onChange} />
      </label>
      <br />
    </form>
    </div>
  );

}

function formula(x,f,d) {
  var y = sin(multiply(x, 2*pi*f))
  var dd = exp(multiply(x,-1*d))
  y = dotMultiply(y, dd)
  //y = multiply(y, )
  //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
  //console.log(multiply(y,dd))
  return y
}


export default App;
