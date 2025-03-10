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
    coolPhone.register();
  }
  function call() {
    // Register callbacks to desired call events
    const eventHandlers = {
      progress: function (e) {
        console.log("call is in progress");
      },
      failed: function (e) {
        console.log("call failed with cause: " + e.data.cause);
      },
      ended: function (e) {
        console.log("call ended with cause: " + e.data.cause);
      },
      confirmed: function (e) {
        console.log("call confirmed");
      },
    };

    const options = {
      eventHandlers: eventHandlers,
      mediaConstraints: { audio: true, video: true },
    };
    coolPhone.call("sip:200@192.168.0.34", options);
  }

  return (
    <div className="App">
      <h1>SIP Client</h1>
      <button onClick={connect}>Connect</button>
      <button onClick={call}>Call User</button>
      <audio id="remote-audio" autoPlay></audio>
    </div>
  );
}

export default App;
