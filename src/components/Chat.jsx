import { useRef, useState, useEffect } from "react";
import "../css/chat.css";

const forbiddenWords = [
  "puta",
  "viado",
  "filho da puta",
  "vagabundo",
  "safado",
]; // Teste para filtro de palavras

export default function Chat({ socket }) {
  /*const bottomRef = useRef(null);*/
  const messageRef = useRef();
  const fileInputRef = useRef();
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

    const containsForbiddenWords = forbiddenWords.some((word) =>
      message.toLowerCase().includes(word)
    );
    if (containsForbiddenWords) {
      alert("Sua mensagem não foi inviada por conter palavras inapropriadas.");
      return;
    }

    socket.emit("message", message);
    clearInput();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      socket.emit("message", {
        text: reader.result, // A imagem em base64
        author: "User",
        authorId: socket.id,
        isImage: true,
      });
    };
    reader.readAsDataURL(file);
    fileInputRef.current.value = "";
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
                className={`message-container ${
                  message.authorId === socket.id ? "message-mine" : ""
                }`}
                key={index}
              >
                <div className="message-author">
                  <strong className="authorName">{message.author}</strong>
                </div>
                <div className="message-text">
                  {message.isImage ? (
                    <img
                      src={message.text}
                      alt="Imagem enviada"
                      className="message-image"
                      style={{ width: '248px' }}
                    />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div class="messageBox">
          <div class="fileUploadWrapper">
            <label for="file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 337 337"
              >
                <circle
                  stroke-width="20"
                  stroke="#6c6c6c"
                  fill="none"
                  r="158.5"
                  cy="168.5"
                  cx="168.5"
                ></circle>
                <path
                  stroke-linecap="round"
                  stroke-width="25"
                  stroke="#6c6c6c"
                  d="M167.759 79V259"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-width="25"
                  stroke="#6c6c6c"
                  d="M79 167.138H259"
                ></path>
              </svg>
              <span class="tooltip">Adicione uma imagem</span>
            </label>
            <input
              type="file"
              id="file"
              name="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
            />
          </div>

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
