import React, { Component } from 'react';
import './App.css';

import Board from './components/Board';
import GameOver from './components/GameOver';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    width: 0,
    height: 0,
    grid: [],
    gridSize: 10,
    difficulty: .9,
    gameOver: false
  };
}
  componentDidMount() {
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);

  const {difficulty, gridSize} = this.state;
  const {updateBombsNear} = this;
  let newGrid = this.state.grid;
  for(let x = 0; x<gridSize; x++) {
    newGrid.push([]);
    for(let y = 0; y<gridSize; y++) {
      newGrid[x].push(
        {
          x:x,
          y:y,
          isBomb:Math.random()>difficulty,
          bombsNear:0,
          hidden: true,
          flagged: false
        }
      )
    }
  }

  for(let x=0; x<gridSize; x++) {
    for(let y=0;y<gridSize; y++) {
      updateBombsNear(x,y,newGrid);
    }
  }

  this.setState({grid: newGrid})
}

updateBombsNear = (x,y,newGrid) => {
  const checkAndUpdate = (a,b) => {
    if(newGrid[a] &&
       newGrid[a][b]) {
         newGrid[a][b].bombsNear++;
       }
  }
  if(newGrid[x][y].isBomb) {
    checkAndUpdate(x-1,y-1);
    checkAndUpdate(x-1,y);
    checkAndUpdate(x-1,y+1);
    checkAndUpdate(x, y-1);
    checkAndUpdate(x, y+1);
    checkAndUpdate(x+1, y-1);
    checkAndUpdate(x+1, y);
    checkAndUpdate(x+1, y+1);
  }
}

handleRightClick = (e,x,y) => {
  e.preventDefault();
  let newGrid = this.state.grid;
  newGrid[x][y].flagged = !newGrid[x][y].flagged;
  this.setState({grid: newGrid})
}

handleClick = (e,x,y) => {
  e.preventDefault();
    let newGrid = this.state.grid;
    if(newGrid[x][y].isBomb) {
      this.invertGameOver();
    }
    else if(newGrid[x][y].bombsNear > 0) {
      newGrid[x][y].hidden = false;
    }
    else {
      console.log('zeros');
      let zeroBlocks = [{x:x,y:y}];
      //show the current square.
      const _showSquare = (a,b) => {
        if(newGrid[a] &&
           newGrid[a][b]) {
             newGrid[a][b].hidden = false;
           }
      }

      const _showAllNeighbors = (a,b) => {
        _showSquare(a-1,b-1)
        _showSquare(a-1,b)
        _showSquare(a-1,b+1)
        _showSquare(a,b-1)
        _showSquare(a,b+1)
        _showSquare(a+1,b-1)
        _showSquare(a+1,b)
        _showSquare(a+1,b+1)
      }
      _showSquare(zeroBlocks[0].x,zeroBlocks[0].y)
      while (zeroBlocks.length >0) {
        _showAllNeighbors(zeroBlocks[0].x,zeroBlocks[0].y)
        zeroBlocks.shift();
      }


      }


    this.setState({grid: newGrid});
  }

invertGameOver = () => {
  this.setState({gameOver: true});
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions = () => {
  this.setState({ width: window.innerWidth, height: window.innerHeight });
}

  render() {
    const {width,height,grid,gridSize,gameOver} = this.state;
    const {handleClick, invertGameOver, handleRightClick} = this;
    return (
          <div className="App">
            <h1>{!gameOver? "Minesweeper.dot2": "YOU LOSE"}</h1>
            <h2>width/height={`${width}/${height}`}</h2>
            <Board
              rows={grid}
              gridSize={gridSize}
              handleClick={handleClick}
              invertGameOver={invertGameOver}
              handleRightClick={handleRightClick}/>
            {gameOver? <GameOver/>:null}
          </div>
    );
  }
}

export default App;
