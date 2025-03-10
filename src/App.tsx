import "./App.css";
import { WebSocketInterface, UA } from "jssip";

function App() {
  const socket = new WebSocketInterface("wss:/192.168.0.34:8089/ws");
  const configuration = {
    sockets: [socket],
    uri: "sip:202@192.168.0.34",
    password: "202@202",
  };

  const coolPhone = new UA(configuration);

  coolPhone.on("connected", function () {
    console.log("Connected!");
  });
  coolPhone.on("newRTCSession", function (e: unknown) {
    console.log(e);
    console.log("incoming call");
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
