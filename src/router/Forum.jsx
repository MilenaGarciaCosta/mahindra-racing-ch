import Join from "../components/Join.jsx";
import Chat from "../components/Chat.jsx";
import { useState } from "react";
import background from '../img/background_img.png';

const Forum = () => {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <>
      <div id="backgroundImg">
        <img src={background} />
      </div>

      {
        chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      }
    </>
  )
};

export default Forum;
