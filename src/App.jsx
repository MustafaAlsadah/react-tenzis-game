import Board from './Board'
import { useState, useEffect } from 'react'

function App() {
  let score = localStorage.getItem("bestScore")
  const [bestScore, setBestScore] = useState(score ? score : null)
  const [tenzies, setTenzies] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [intervalID, setIntervalID] = useState(null)
  let interval;

  const resetInterval = ()=>{
    setElapsedTime(0)
    interval = setInterval(()=>{
                  setElapsedTime(prev=> prev+1)    
               }, 1000)
    setIntervalID(interval)
  }
  
  const setTenziesValue = (val)=>{
    setTenzies(val)

  }
  
    console.log('render', elapsedTime)


    useEffect(()=>{
        interval = setInterval(()=>{
            setElapsedTime(prev=> prev+1)    
        }, 1000)
        setIntervalID(interval)
        return ()=>{
          clearInterval(interval)
          console.log('clear1')
        }
    }, [])

    useEffect(()=>{
          if(tenzies){
            clearInterval(intervalID)
            const record = localStorage.getItem("bestScore", elapsedTime)
            if(!record){
              setBestScore(elapsedTime)
              localStorage.setItem("bestScore", elapsedTime)
              return
            }
            if(elapsedTime<record){
                setBestScore(elapsedTime)
                localStorage.setItem("bestScore", elapsedTime)
            }else{
              return
            }
            console.log('clear2')
          }
    }, [tenzies])

  return (
    <div className="bg-slate-800 h-screen w-screen text-wcenterhite p-6  flex flex-col justify-center items-center">
      <div className="flex justify-between w-5/6 max-w-xl">
        <div className="text-black bg-slate-50 p-2 md:w-1/4 md:px-4 md:py-2 rounded-md text- mb-5">
            {elapsedTime<60 ? `${elapsedTime} seconds` : `${Math.floor(elapsedTime/60)}:${Math.floor(elapsedTime%60)<10 ? "0"+Math.floor(elapsedTime%60) : Math.floor(elapsedTime%60)} minutes`}
        </div>
        <div className="text-black bg-green-400 p-2 md:w-fit md:px-4 md:py-2 rounded-md text- mb-5">
          best score: {bestScore ? (bestScore<60 ? `${bestScore} seconds` : `${Math.floor(bestScore/60)}:${Math.floor(bestScore%60)} minutes`) : ("N/A")} 
        {console.log(bestScore)}
        </div>
      </div>
      <Board tenzies={tenzies} setTenziesValue={setTenziesValue} stopTimer={()=> stopTimer()} resetInterval={resetInterval} />
    </div>
  )
}

export default App
