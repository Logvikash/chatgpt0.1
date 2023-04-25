import { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [previousChats, setPreviousChats] = useState([]);

  // send question to nodejs
  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8800/completions",
        options
      );
      const data = await response.json();
      // setMessage(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      console.log("you have got an error");
    }
  };

  const getUsers = async () => {
    const response = await fetch("http://localhost:8800/userdata", {
      method: "GET",
    });
    const data = await response.json();
    setPreviousChats(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history">
          vikash
        </ul>
        <nav>
          <p>Clear conversations</p>
        </nav>
      </section>
      <section className="main">
        <h1 style={{ color: "black" }}>Chat-GPT</h1>
        <ul className="feed">
          {previousChats.map((user) => (
            <li key={user._id}>
             <p className="role">{user.question}</p>
             <p className="answer">{user.answer} </p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              className="input-value"
              name="question"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div id="submit" onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className="info">
            ChatGPT Mar 23 Version. Free Research Preview. ChatGPT may produce
            inaccurate information about people, places, or facts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;