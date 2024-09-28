import { useRef } from "react";
import io from "socket.io-client";

export default function Join({ setChatVisibility, setSocket }) {
  const usernameRef = useRef();
  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = await io.connect("http://localhost:3001"); //URL servidor do chat
    socket.emit("set_username", username);
    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <>
      <section className="main loginContainer">
        <form className="form-login">
          <div className="titulo-container">
            <h2>Entre no fórum!</h2>
          </div>

          <div className="input-group">
            <input type="text" ref={usernameRef} className="input" />
            <label className="user-label">Seu nome</label>
          </div>

          <div className="compraContainer">
            <button className="button" onClick={() => handleSubmit()}>
              Entrar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
