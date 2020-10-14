import React from 'react';
import './App.css';

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ['/', '*', '+', '-'];
const ids = {
  7: 'seven', 
  8: 'eight', 
  9: 'nine', 
  4: 'four', 
  5: 'five', 
  6: 'six', 
  1: 'one', 
  2: 'two', 
  3: 'three', 
  0: 'one',
  '/': 'divide', 
  '*': 'multiply', 
  '+': 'add', 
  '-': 'subtract'
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lastNum : undefined,
      currentNum: '0',
      calc: undefined,
      operation: undefined,
      lastPressed: undefined
    }
  }
  handleClick = (e) => {
    const { calc, currentNum, lastPressed} = this.state;
    const { innerText } = e.target;

    this.setState({
      currentNum: currentNum + innerText
    })
   
    switch(innerText){
      case 'AC': {
        this.setState({
          currentNum: '0',
          calc: '0'
        });
        break;
      } 
      case '=': {
        if(ops.includes(lastPressed)){
          this.setState({
            currentNum: currentNum.slice(0, -1)
          });
        } else {
          const evaluated = eval(currentNum);
          this.setState({
            currentNum: evaluated
          });
        } 
        break;
      }
      case '.': {
        const splitted = calc.split(/[\=\-\8\/]/),
              last = splitted.slice(-1)[0]
        if(!last.includes('.')){
          this.setState({
            calc: calc + '.'
          })
        }
        
        break;     
      }
      default: {
        let e = undefined;
        if(ops.includes(innerText)){
          if(ops.includes(lastPressed) && innerText !== '-') {
            const lastNumberIdx = calc.split('').reverse()
                  .findIndex(char => char !== ' ' && nums.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `
          } else {
            e = `${calc} ${innerText}`
          }
        } else {
          e = currentNum === '0' ? innerText : currentNum + innerText;
          
        }
        this.setState({
          calc: e,
          currentNum: e,
          lastPressed: innerText
        })
      }
    }
  }
  
  render(){
    
    return (
      <div className="App">
        <div className="panel">
          <div className="display">
            <small>{this.state.calc} {this.state.operation}</small><br/>
            {this.state.currentNum}
          </div>
          <div className="buttons">
            <div className="nums-container" >
              <button className="grey bg-width ac" id="clear" onClick={this.handleClick}>AC</button>
              <button className="grey" id="power" >0/1</button>
              {nums.map((item) => {
                return <button onClick={this.handleClick} key={item} id={ids[item]} className={`${item === 0 && 'bg-width'}`}>{item}</button>
              })}
              <button className=""  onClick={this.handleClick}>.</button>
            </div>

            <div className="ops-container" >
              {ops.map((item) => {
                return <button onClick={this.handleClick} id={ids[item]} key={item} className
                ={`tomato ${item === '=' && ' grey'}`}>{item}</button>
              })}
              <button className="tomato" id="equals" onClick={this.handleClick}>=</button>
            </div>
            
          </div>
          <h5>By aeskay</h5>
        </div>

      </div>
    );
  }
}

export default App;
