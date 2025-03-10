import "./App.css";
import { WebSocketInterface, UA } from "jssip";

function App() {
  const socket = new WebSocketInterface("wss:/192.168.0.33:8089/ws");
  const configuration = {
    sockets: [socket],
    uri: "sip:200@192.168.0.33",
    password: "200@200",
  };
  const coolPhone = new UA(configuration);

  coolPhone.on("connected", function () {
    console.log("Connected!");
  });

  function connect() {
    coolPhone.start();
  }

  return (
    <div className="App">
      <h1>SIP Client</h1>
      <button onClick={connect}>Connect</button>
      <audio id="remote-audio" autoPlay></audio>
    </div>
  );
}

export default App;
