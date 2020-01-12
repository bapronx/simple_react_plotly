import logo from './logo.svg';
import './App.css';

import React from 'react';
// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";
import {Range, sin, pi, multiply} from "mathjs";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freq: "10"
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
    var mydata = getData(this.state.freq)
    var data = [{
      x: mydata.x,
      y: mydata.y,
      type: 'scatter',
      mode: 'lines+markers',
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

function getData(freq) {
  const f = Number(freq)
  var x = new Range(0, 1, 1e-2)
  x = x.toArray()
  var y = formula(x, f)
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
        Frequency : <br/>
        <input
          name="freq"
          type="range"
          min="1"
          max="20"

          value={props.state.freq}
          onChange={props.onChange} />
      </label>
      <br />
    </form>
    <p> {props.state.freq} Hz</p>
    </div>
  );

}

function formula(x,f) {
  const y = sin(multiply(x, 2*3.1416*f))
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
  console.log(y)
  return y
}


export default App;
