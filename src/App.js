import Rules from "./Rules";
import {useEffect,useRef,useState} from "react";
function App() {
  let newrow=null;
  let newcol=null;
  const ref=useRef(null);
  const Winner=document.querySelector(".Result");
  const Player1Btn=document.querySelector(".Player-1-btn");
  const Player2Btn=document.querySelector(".Player-2-btn");
  const indexArray=document.querySelectorAll(".index");
  const RulesOverlay=document.querySelector(".RulesOverlay");
  
  const [count,setCount]=useState(0);
  const [turn,setTurn]=useState(-1);
  const [index,setIndex]=useState(null);
  const findcol=function(val){
    if(val===3)
      return 1;
    if(val===6)
      return 2;
    return 0;
  }
  const close=function(){
      RulesOverlay.classList.add("hidden");
  }
  const verify=function(ind,r,c){
    const leftDiagonalElements=[0,4,8];
    const rightDigonalElements=[2,4,6];
    console.log(ind,r,c);
    let i=null,j=null,k=null,m=null,n=null;
    for(i=0;i<9;i+=3)
      if(indexArray[i+c].textContent!==indexArray[ind].textContent)
        break;
    for(j=r*3;j<(r*3)+3;j++){
      if(indexArray[j].textContent!==indexArray[ind].textContent)
        break;
    }
    if(leftDiagonalElements.includes(ind))
      for(k=0,m=0;m<3;k+=3,m++)
        if(indexArray[m+k].textContent!==indexArray[ind].textContent)
          break;
    if(rightDigonalElements.includes(ind))
      for(k=0,n=2;n>=0;n--,k+=3)
        if(indexArray[n+k].textContent!==indexArray[ind].textContent)
          break;
    console.log(i,j,k,n);
    if(i===9||j===(r*3)+3||m===3||n===-1)
      return true;
    return false;
  }
  const displayRules=function(){
    RulesOverlay.classList.remove("hidden");
  }
  const setnewGame=function(){
    setCount(0);
    setTurn(0);
    indexArray.forEach(function(index){
      index.textContent="";
    })
    Winner.textContent="";
  }
  useEffect(()=>{
    setCount(0);
    setTurn(0);
    indexArray.forEach(function(index){
      index.textContent="";
    })
    const handleClick=e=>{
      setIndex(Number(e.target.classList[2]));
    };
    const element=ref.current;
    element.addEventListener("click",handleClick);
    return()=>{
      element.removeEventListener("click",handleClick);
    }
  },[]);
  useEffect(()=>{
    setCount(0);
    setTurn(0);
    indexArray.forEach(function(index){
      index.textContent="";
    })
  },[])
  useEffect(()=>{
    if(turn===0){
      Player1Btn&&Player1Btn.classList.add("blue");
      Player2Btn&&Player2Btn.classList.remove("blue");
    }
    else{
      Player2Btn&&Player2Btn.classList.add("blue");
      Player1Btn&&Player1Btn.classList.remove("blue");
    }

  },[turn])
  useEffect(()=>{
    if(index){
      if(turn==0)
        document.querySelector(`.index-${index}`).textContent="X";
      else
        document.querySelector(`.index-${index}`).textContent="O";
      const divide=(index-1)/3;
      newrow=Math.trunc(divide);
      const column=String(divide);
      newcol=findcol(Number(column.substring(column.indexOf('.')+1).slice(0,1)));
      const check=verify(index-1,newrow,newcol);
      if(check){
        Winner.textContent=`Player ${turn+1} Won ⭐`;
        Winner.classList.add("Winner");
        setTimeout(()=>{
          setnewGame();
        },1000);
      }
      else if(count===8){
        Winner.textContent=`Draw 👏`;
        setTimeout(()=>{
          setnewGame();
        },1000);
      }
      setTurn((turn+1)%2);
      setCount(count+1);
    }
  },[index])
  return (
    <div className="App">
      <button className="New-Game" onClick={setnewGame}>New Game</button>
      <header className="App-Header" ref={ref}>
          <div className="index index-1 1"></div>
          <div className="index index-2 2"></div>
          <div className="index index-3 3"></div>
          <div className="index index-4 4"></div>
          <div className="index index-5 5"></div>
          <div className="index index-6 6"></div>
          <div className="index index-7 7"></div>
          <div className="index index-8 8"></div>
          <div className="index index-9 9"></div>
      </header>
      <div className="Player">
          <div className="Player-1">
              <div className="Player-1-btn btn"></div>
              <div className="Player-text" >Player 1</div>
          </div>
          <div className="Player-2">
              <div className="Player-2-btn btn"></div>
              <div className="Player-text">Player 2</div>
          </div>
      </div>
      <div className="Footer">
          <div className="Result"></div>
          <div className="Rules">
              <button onClick={displayRules} className="btnOverlay">How to Play ?</button>
          </div>
      </div>
      <div className="RulesOverlay hidden">
      <button className="close btnOverlay" onClick={close}>X</button>
        <div className="Rules">
            <h1>Rules for Tic-Tac-Toe</h1>
            <p>1.The game is played on a grid that's 3 X 3 squares.</p>
            <p>2.You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares.</p>
            <p>3.The first player to get 3 of her marks in a row (up, down, across ,or diagonally) is the winner.</p>
            <p>4.When all 9 squares are full, the game is over. If no player has 2 marks in a row, the game ends in a tie.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
