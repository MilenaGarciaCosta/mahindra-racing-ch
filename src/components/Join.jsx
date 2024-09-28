import { useRef } from "react"
import io from 'socket.io-client'

export default function Join({setChatVisibility, setSocket}) {
    const usernameRef = useRef()
    const handleSubmit = async ()=>{
        const username = usernameRef.current.value
        if(!username.trim()) return
        const socket = await io.connect('http://localhost:3001') //URL servidor do chat
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
    }

    return(
        <div className="main">
            <h1>Entre no fórum!</h1>
            <input type="text" ref={usernameRef}/>
            <button onClick={()=>handleSubmit()}>Entrar</button>
        </div>
    )
}