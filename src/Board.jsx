import Die from "./Die"
import { useState, useEffect } from "react"
import Confetti from "react-confetti";

export default function Board(){
    const [dicesValues, setDicesValues] = useState(generateDiecesValues())
    const [tenzies, setTenzies] = useState(false)

    useEffect(()=>{        
        if(isWinner()){
            setTenzies(true)
        }
    }, [dicesValues])

    function generateDieValue(){
        return Math.ceil(Math.random()*6)
    }

    function generateDiecesValues(){
        let array = []
        for(let i=0; i<10; i++){
            const value = generateDieValue()
            array[i] = {value, isHeld: false, id:i}
        }
        return array
    }
    
    function isWinner(){
        const commonValue = dicesValues[0].value
        const allDicesHeld = dicesValues.filter(die => die.isHeld).length==10
        const allHaveSameValue = dicesValues.filter(die => die.value==commonValue).length==10
        return(allDicesHeld && allHaveSameValue)
    }

    function holdDice(id){
        setDicesValues((prev)=> prev.map(die =>{
           return die.id==id ? {...die, isHeld:!die.isHeld} : die
        }))
    }

    function rollDice(){
        if(tenzies){
            setDicesValues(generateDiecesValues())
            setTenzies(false)
        }else{
            setDicesValues(prevArr => prevArr.map(die=>{
                return die.isHeld ? die : {...die, value: generateDieValue()}
            }))
        }
    }

    return(
        <div className="bg-slate-200 h-5/6 w-5/6 max-w-xl rounded-xl">
            {tenzies && <Confetti/>}
            
            <div className="flex flex-col justify-evenly items-center h-full w-full">
                <div className="flex flex-col justify-center items-center space-y-3">
                    <h1 className="text-black text-5xl font-semibold">Tenzies</h1>
                    <p className="text-black  text-center w-3/4 font-normal">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                </div>
                <div className="grid grid-cols-5 gap-3">
                    {
                        dicesValues.map(obj => <Die id={obj.id} value={obj.value} isHeld={obj.isHeld} key={obj.id} holdDice={()=> holdDice(obj.id)} />)
                    }
                </div>
                <button className="bg-indigo-600 px-10 py-3 rounded-md hover:scale-110 transition-all" onClick={()=> rollDice()}>
                    {tenzies ? "Reset Game" : "Roll"}
                </button>
            </div>
        </div>
    )
}