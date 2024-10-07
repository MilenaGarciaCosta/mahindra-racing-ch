import { useRef, useState, useEffect } from "react";
import "../css/chat.css";

export default function Chat({ socket }) {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const authorColors = {}; // Armazenar cores para cada autor

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return (color === '#0a3cff' || color === '#ffffff' || color === '#000000') ? getRandomColor() : color; // Garantir que a cor não seja vermelha, branca ou preta
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // Atribui cor ao autor, se ainda não tiver uma
      if (!authorColors[data.authorId]) {
        authorColors[data.authorId] = getRandomColor();
      }
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receive_message");
  }, [socket, authorColors]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;
    
    const messageData = {
      text: message,
      author: socket.id,
      authorId: socket.id, // Adiciona o ID do autor
    };

    // Envia a mensagem para o servidor
    socket.emit("message", messageData);

    clearInput();
    
    // Atribui uma cor ao autor atual, se ainda não tiver uma
    if (!authorColors[socket.id]) {
      authorColors[socket.id] = '#0a3cff'; // Cor vermelha para o autor atual
    }
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="main chatContainer">
      <div className="chatMaster">
        <div className="chat-body">
          {messageList.map((message, index) => {
            const messageColor = authorColors[message.authorId] || '#008080'; // Usa cor padrão se não houver cor definida

            return (
              <div
                className={`message-container ${message.authorId === socket.id ? "message-mine" : ""}`}
                key={index}
                style={{ backgroundColor: messageColor }}
              >
                <div className="message-author">
                  <strong className="authorName">{message.author}</strong>
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            );
          })}
        </div>

        <div className="messageBox">
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="33.67"
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
