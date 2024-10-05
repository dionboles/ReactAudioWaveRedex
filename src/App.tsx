import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AudioVisualizer from './compoents/AudioVisualizer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AudioVisualizer/>
      </div>
    </>
  )
}

export default App
