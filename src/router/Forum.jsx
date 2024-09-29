import Join from "../components/Join.jsx";
import Chat from "../components/Chat.jsx";
import { useState } from "react";

const Forum = () => {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div>
      {
        chatVisibility ? <Chat socket={socket}/> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility}/>
      }
    </div>
  )
};

export default Forum;
