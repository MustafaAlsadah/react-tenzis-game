import Board from './Board'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-slate-800 h-screen w-screen text-white p-6  flex justify-center items-center">
      <Board/>
    </div>
  )
}

export default App
