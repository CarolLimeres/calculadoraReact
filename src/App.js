import Frame from "./Components/Frame/index";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import './App.css';
import Button from "./Components/Button";
import { useState } from "react";
const btnValues=[
  ["C","+-","%","/"],
  [7,8,9,"x"],
  [4,5,6,"-"],
  [1,2,3,"+"],
  [0,".","="]
]

const removeSpaces=(num)=>num.toString().replace(/\s/g,"");

function App() {
  let [calc,setCalc]=useState({
    sign:"",
    num:0,
    res:0,
  })

  const numClickHandler=(e)=>{
    e.preventDefault();
    const value=e.target.innerHTML;
    if(removeSpaces(calc.num).length<16){
      setCalc({
        ...calc,
        num:calc.num===0 && value==="0"
        ?"0"
        :calc.num%1===0
        ?Number(calc.num+value)
        :calc.num+value,
        res: !calc.sign?0:calc.res,
      })
    }
  }

  const commaClickHandler=(e)=>{
    e.preventDefault();
    const value=e.target.innerHTML;
    setCalc({
      ...calc,
      num:!calc.num.toString().includes(".")?calc.num+value:calc.num,
      
    })
  }


const signalClickHandler=(e)=>{
  e.preventDefault();
  const value=e.target.innerHTML;
  setCalc({
    ...calc,
    sign:value,
    res:!calc.res && calc.num? calc.num:calc.res,
    num:0,
  })
  }


const equalsClickHandler=()=>{
  if(calc.sign && calc.num)
  {
    const math=(a,b,sign)=>
    sign==="+"
    ?a+b
    :sign==="-"
    ?a-b
    :sign==="x"
    ?a*b
    :a/b
    setCalc({
      ...calc,
      res:
      calc.num==="0" && calc.sign==="/"
      ?"ERROR"
      :math(Number(calc.res),Number(calc.num), calc.sign),
      sign:"",
      num:0
    })
  }
  }


const percentClickHandler=()=>{
  let num=calc.num?parseFloat(calc.num):0;
  let res=calc.res?parseFloat(calc.res):0;
  setCalc({
    ...calc,
    num:(num/Math.pow(100,1)),
    res:(res/Math.pow(100,1)),
    sign:"",
  })
  }


const invertClickHandler=()=>{
  setCalc({
    ...calc,
    num:calc.num?calc.num*-1:0,
    res:calc.num?calc.res*-1:0,
    sign:"",
  })  
  }


const resetClickHandler=()=>{
  setCalc({
    ...calc,
    sign:"",
    num:0,
    res:0,
  })

  }


  return (
    <Frame>
      <Screen value={calc.num?calc.num:calc.res}></Screen>
      <ButtonBox>
        {
          btnValues.flat().map((btn,i)=>{
            return(
              <Button key={i} className={btn==="="?"equals":""} value={btn} onClick={
                btn==="C"
                ? resetClickHandler
                :btn==="+-"
                ? invertClickHandler
                :btn==="%"
                ? percentClickHandler
                :btn==="="
                ? equalsClickHandler
                :btn==="+" || btn==="-" || btn==="x" || btn==="/"
                ? signalClickHandler
                :btn==="."
                ? commaClickHandler
                :numClickHandler
              }></Button>
            )
          })
        }
      </ButtonBox>
    </Frame>
  );
}

export default App;
