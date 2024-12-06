import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import socket from './socket/socket'

function App() {
  const [message, setMessage] = useState([])
  const [input , setinput] = useState('')


  useEffect(()=>
  {
    socket.on('message' , (message)=>
    {
      setMessage((prev)=>[...prev,message])
    })


    return ()=>
    {
      socket.off('message')
    }
  },[])



  const handleSend = (e)=>
  {
    e.preventDefault()
    socket.emit('message',input)
  }

  return (
    <>


    <form action="">
      
      <input type="text" name="" id=""  placeholder='enter the message'  
       onChange={(e)=>setinput(e.target.value)}
      />
      <button onClick={handleSend} >send message</button>
      <ul>
        {
          message.map((val,index)=>
          {
            return <li key={index} >{val}</li>
          })
        }
      </ul>
    </form>
      
   
    </>
  )
}

export default App
