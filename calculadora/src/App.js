//import logo from './logo.svg';
import './App.css';
import React from 'react';

class Operation 
{
  static ops = {
    "+": (op1, op2)=> op1+op2,
    "-": (op1, op2)=> op1-op2,
    "*": (op1, op2)=> op1*op2,
    "/": (op1, op2)=> op1/op2,
  };

  constructor (operator='+', operand=0)
  {
    this.operator = operator;
    this.operand = operand;
  }

  operate (previous)
  {
    //console.log(previous);
    return Operation.ops[this.operator](previous, this.operand);
  }

  toString ()
  {
    return ` ${this.operator} ${this.operand}`;
  }
}

function App() 
{
  class Calculator extends React.Component
  {
    constructor (props)
    {
      super(props);
      this.state = { operations:[new Operation()] };
      //this.showResult = this.showResult.bind(this);
      this.addOperator = this.addOperator.bind(this);
      this.addOperand = this.addOperand.bind(this);
      this.clearOperations = this.clearOperations.bind(this);
    }

    showResult ()
    {
      let resultS = '';
      const final = this.state.operations.reduce((previous, operation) => 
      {
        resultS += operation.toString();
        return operation.operate(previous);
      }, 0);
      return this.state.operations.length > 1 ? `${resultS.slice(3)} = ${final}` : `${final}`;
    }

    addOperator (operator)
    {
      console.log("Clicou no operador ", operator);
      const operation = new Operation(operator);
      this.state.operations.push(operation);
    }

    addOperand (operand)
    {
      console.log("Clicou no operando ", operand);
      const ops = this.state.operations;
      const op = ops[this.state.operations.length-1];
      op.operand = parseInt(`${op.operand}${operand}`);
      this.setState({ operations:ops });
    }

    clearOperations ()
    {
      console.log("Clicou em zerar");
      this.setState({ operations:[new Operation()] });
    }

    render ()
    {
      const operatorList = Object.keys(Operation.ops).map((op) => <li key={op} onClick={() => {this.addOperator(op)}}>{op}</li>);
      const operandList = Array.from(Array(10).keys()).map((op) => <li key={op} onClick={() => {this.addOperand(op)}}>{op}</li>);
      return (
        <main>
          <header className="App-header">
          <h1>{this.showResult()}</h1>
          </header>
          <nav>
            <ul><li key="C" onClick={()=>{this.clearOperations()}}>C</li>{operatorList}</ul>
            <ol>{operandList}</ol>
          </nav>
        </main>
      );
    }
  }

  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
