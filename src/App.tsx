import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Chat from './pages/chat/Chat'
import Home from './pages/home/Home';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Routes>
  )
}

export default App
