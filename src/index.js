import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Reset(props) {
  return (
    <div className="reset-circle" onClick={props.onClick}>
    </div>
  );
}

function Clear(props) {
  return (
    <div className="cancel-circle" onClick={props.onClick}>
    </div>
  );
}

function Confirm(props) {
  return (
    <div className="check-circle" onClick={props.onClick}>
    </div>
  );
}

function ClickSquare(props) {
  return (
    <div className="container-circle-picker">
      <div className={"circleClick" + (props.value === 1 ? ' blue' : props.value === 2 ? ' red' : props.value === 3 ? ' yellow' : props.value === 4 ? ' green' : props.value === 5 ? ' white' : props.value === 6 ? ' orange' : props.value === 7 ? ' purple' : props.value === 8 ? ' pink' : '' )} onClick={props.onClick}>
      </div>
    </div>
  );
}

function Square(props) {
  return (
    <div className="container-circle">
      <div className={"circle" + (props.value === 1 ? ' blue' : props.value === 2 ? ' red' : props.value === 3 ? ' yellow' : props.value === 4 ? ' green' : props.value === 5 ? ' white' : props.value === 6 ? ' orange' : props.value === 7 ? ' purple' : props.value === 8 ? ' pink' : '' )} onClick={props.onClick}>
      </div>
    </div>
  );
}

function Result(props) {
  return (
    <div className="container-circle-result">
      <div className={"circle-result" + (props.value === 2 ? ' black' : props.value === 1 ? ' white' : '')}>
      </div>
    </div>
  );
}

class Board extends React.Component {
  constructor(){
    super();
    this.state = {
      squares: Array(40).fill(0),
      results: Array(10).fill(Array(4).fill(0)),
      answer: [Math.floor(Math.random()*8+1),Math.floor(Math.random()*8+1),Math.floor(Math.random()*8+1),Math.floor(Math.random()*8+1)],
      cursor:0,
      endGame:0,
    };
  }

  handleClickPicker(i) {
   const squares = this.state.squares.slice();
   console.log('ey');
   console.log(this.state.cursor*4);
   console.log(this.state.cursor*4+3);
   for(var j = this.state.cursor*4; j <= this.state.cursor*4+3; j++){//Verification de la ligne à modifier
     console.log(squares[j]);
     if(squares[j] === 0){
       squares[j] = i;
       this.setState({
         squares: squares
       });
       return;
     }
   }

   console.log(this.state.squares);
 }

  handleClick(i) {
   const squares = this.state.squares.slice();
   if(i >= this.state.cursor*4 && i <= this.state.cursor*4+3){//Verification de la ligne à modifier
     squares[i] += 1;
     if(squares[i] > 8){
       squares[i] = 0;
     }
     this.setState({
       squares: squares
     });
   }else{
     return;
   }
 }

  checkLineFull(){
    var squares = this.state.squares.slice();
    for (var i = 0; i < 4; i++) {
      if(squares[this.state.cursor*4+i] === 0){
        return false;
      }
    }
    return true;
  }

  checkWin(result){
    for (var i = 0; i < 4; i++) {
      if (result[i] !== 2){
        return false;
      }
    }
    return true;
  }

  checkLose(){
    if (this.state.cursor >= 9){
      return true;
    }
    return false;
  }

  checkLine() {
    var squares = this.state.squares.slice();
    var line = [squares[this.state.cursor*4], squares[this.state.cursor*4+1], squares[this.state.cursor*4+2], squares[this.state.cursor*4+3]];
    var answer = this.state.answer.slice();
    var result = this.state.results[this.state.cursor].slice();
    for (var i = 0; i < 4; i++) {
      if (line[i] === answer[i]){
       result[i] = 2;
       answer[i] = "";
      }
    }
    var tempCursor = null;
    for (i = 0; i < 4; i++) {
     var isInsideAnswer = 0;
     for (var j = 0; j < 4; j++) {
       if (line[i] === answer[j]){
         isInsideAnswer = 1;
         tempCursor = j;
       }
     }
     if(result[i]!==2){
       if(isInsideAnswer){
           result[i] = 1;
           answer[tempCursor] = "";
       }else{
         result[i] = 0;
       }
     }
    }
    result.sort().reverse();
    this.state.results[this.state.cursor] = result;
    return this.checkWin(result);
  }

  clearLine() {
    var squares = this.state.squares.slice();
    for (var i = 0; i < 4; i++) {
      squares[this.state.cursor*4+i] = 0;
    }
    this.setState({
      squares: squares
    });
  }

  clearBoard() {
    this.setState({
      squares: Array(40).fill(0),
      results: Array(10).fill(Array(4).fill(0)),
      answer: [Math.floor(Math.random()*8+1),Math.floor(Math.random()*8+1),Math.floor(Math.random()*8+1),Math.floor(Math.random()*8+1)],
      cursor:0,
      endGame:0,
    });
  }

  confirmation() {
    if(!this.checkLineFull()){
      return;
    }
    if(this.checkLine()){
      this.setState({
        endGame:1,
      });
      return;
    }else{
      if(this.checkLose()){
          this.setState({
            endGame:2,
          });
          return;
      }
      this.setState({
        cursor: this.state.cursor+1
      });
    }
  }

  renderClearBoard() {
   return (
     <Reset
     onClick={() => this.clearBoard()}
     />
   );
  }

  renderClearLine() {
   return (
     <Clear
     onClick={() => this.clearLine()}
     />
   );
  }

  renderConfirm() {
   return (
     <Confirm
     onClick={() => this.confirmation()}
     />
   );
  }

  renderAnswer(i) {
    return (
      <Square
        value={this.state.answer[i]}
      />
    );
  }

  renderClickSquare(i) {
    return (
      <ClickSquare
        value={i}
        onClick={() => this.handleClickPicker(i)}
      />
    );
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderResult(i) {
    return (
      <div className="container-square-helper">
        <div className="container-square-row">
          <Result value={this.state.results[i][0]}/>
          <Result value={this.state.results[i][1]}/>
        </div>
        <div className="container-square-row">
          <Result value={this.state.results[i][2]}/>
          <Result value={this.state.results[i][3]}/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-board">
        <div className={"container-endGame" + (this.state.endGame === 0 ? '' : ' active')}>
          <div className={"container-boxEndGame" + (this.state.endGame === 0 ? '' : ' active')}>
            <div className={"container-message" + (this.state.endGame === 1 ? ' win' : this.state.endGame === 2 ? ' lose' : '')}></div>
            <div className="container">
            {this.renderClearBoard()}
            </div>
          </div>
        </div>
        <div className="container-center">
          <div className="header">
            <div className="container-reset-circle">
            {this.renderClearBoard()}
            </div>
            <div className="title">
              <div className="title-logo">
                MasterMind
              </div>
            </div>
          </div>
          <div className="container-board">
            <div className={"container-column" + (this.state.cursor === 0 ? ' selection' : '')}>
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              {this.renderSquare(3)}
              {this.renderResult(0)}
            </div>
            <div className={"container-column" + (this.state.cursor === 1 ? ' selection' : '')}>
              {this.renderSquare(4)}
              {this.renderSquare(5)}
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderResult(1)}
            </div>
            <div className={"container-column" + (this.state.cursor === 2 ? ' selection' : '')}>
              {this.renderSquare(8)}
              {this.renderSquare(9)}
              {this.renderSquare(10)}
              {this.renderSquare(11)}
              {this.renderResult(2)}
            </div>
            <div className={"container-column" + (this.state.cursor === 3 ? ' selection' : '')}>
              {this.renderSquare(12)}
              {this.renderSquare(13)}
              {this.renderSquare(14)}
              {this.renderSquare(15)}
              {this.renderResult(3)}
            </div>
            <div className={"container-column" + (this.state.cursor === 4 ? ' selection' : '')}>
              {this.renderSquare(16)}
              {this.renderSquare(17)}
              {this.renderSquare(18)}
              {this.renderSquare(19)}
              {this.renderResult(4)}
            </div>
            <div className={"container-column" + (this.state.cursor === 5 ? ' selection' : '')}>
              {this.renderSquare(20)}
              {this.renderSquare(21)}
              {this.renderSquare(22)}
              {this.renderSquare(23)}
              {this.renderResult(5)}
            </div>
            <div className={"container-column" + (this.state.cursor === 6 ? ' selection' : '')}>
              {this.renderSquare(24)}
              {this.renderSquare(25)}
              {this.renderSquare(26)}
              {this.renderSquare(27)}
              {this.renderResult(6)}
            </div>
            <div className={"container-column" + (this.state.cursor === 7 ? ' selection' : '')}>
              {this.renderSquare(28)}
              {this.renderSquare(29)}
              {this.renderSquare(30)}
              {this.renderSquare(31)}
              {this.renderResult(7)}
            </div>
            <div className={"container-column" + (this.state.cursor === 8 ? ' selection' : '')}>
              {this.renderSquare(32)}
              {this.renderSquare(33)}
              {this.renderSquare(34)}
              {this.renderSquare(35)}
              {this.renderResult(8)}
            </div>
            <div className={"container-column" + (this.state.cursor === 9 ? ' selection' : '')}>
              {this.renderSquare(36)}
              {this.renderSquare(37)}
              {this.renderSquare(38)}
              {this.renderSquare(39)}
              {this.renderResult(9)}
            </div>
            <div className={"container-column" + (this.state.endGame === 0 ? ' solution' : '')}>
              {this.renderAnswer(0)}
              {this.renderAnswer(1)}
              {this.renderAnswer(2)}
              {this.renderAnswer(3)}
            </div>
          </div>
          <div className="footer">
            <div className="white-ribon">
              <div className="container-center">
                <div className="container-row">
                  <div className="container-circle-picker">
                    {this.renderClearLine()}
                  </div>
                  {this.renderClickSquare(1)}
                  {this.renderClickSquare(2)}
                  {this.renderClickSquare(3)}
                  {this.renderClickSquare(4)}
                  {this.renderClickSquare(5)}
                  {this.renderClickSquare(6)}
                  {this.renderClickSquare(7)}
                  {this.renderClickSquare(8)}
                  <div className="container-circle-picker">
                    {this.renderConfirm()}
                  </div>
                </div>
                <div className="logo-jeu-ribon">
                  <div className="logo-jeu-container">
                    <div className="logo-jeu">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <Board />
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
