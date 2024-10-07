import { useRef, useState, useEffect } from "react";
import "../css/chat.css";

export default function Chat({ socket }) {
  /*const bottomRef = useRef(null);*/
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  /*useEffect(() => {
    scrollDown();
  }, [messageList]);*/

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;
    socket.emit("message", message);
    clearInput();
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  /*const scrollDown = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };*/

  return (
    <div className="main chatContainer">
      <div className="chatMaster">
        <div className="chat-body">
          {messageList.map((message, index) => {

            return (
              <div
                className={`message-container ${message.authorId === socket.id ? "message-mine" : ""}`}
                key={index}
              >
                <div className="message-author">
                  <strong className="authorName">{message.author}</strong>
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            );
          })}
        </div>

        <div class="messageBox">
          <input
            placeholder="Digite aqui..."
            type="text"
            ref={messageRef}
            onKeyDown={(e) => getEnterKey(e)}
            id="messageInput"
          />
          <button id="sendButton" onClick={() => handleSubmit()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 664 663"
            >
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="33.67"
                stroke="#6c6c6c"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}