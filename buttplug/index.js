const ws = require("ws");
const bp = require("buttplug");
const phrases = require("./phrases");
const bpClient = new bp.ButtplugClient("SS13 WS Bridge");

const reconnectBp = async () => {
  try {
    await bpClient.connect(
      new bp.ButtplugNodeWebsocketClientConnector(
        "ws://127.0.0.1:12345/buttplug"
      )
    );
    console.log("Connected to Buttplug Server.");
  } catch (e) {
    console.error("Buttplug Connection Failed:", e);
  }
};
reconnectBp();

const wss = new ws.Server({ port: 8094 });

wss.on("listening", () => console.log("WebSocket Server Listening on 8094"));

wss.on("connection", (socket) => {
  console.log("Client connected!");

  socket.on("message", async (data) => {
    try {
      const messageData = JSON.parse(data.toString("utf-8"));

      if (!bpClient.connected) await reconnectBp();
      
      if (!bpClient.connected || messageData.type !== "chat/message") return;

      
      const parsedPayload = JSON.parse(messageData.payload);

      if (!parsedPayload?.content?.html) return;

      const message = parsedPayload.content.html.toLowerCase();
      const matchedPhrase = phrases.phrases.find((phrase) =>
        message.match(phrase.regex)
      );

      if (matchedPhrase) {
        for (const device of bpClient.devices) {
          try {
            if (matchedPhrase.type === "constant") {
              await device.vibrate(matchedPhrase.intensity);
              setTimeout(
                () => device.stop().catch(console.error),
                matchedPhrase.duration
              );
            } else if (matchedPhrase.type === "linearDropoff") {
              const steps = 5;
              const stepDuration = matchedPhrase.duration / steps;
              for (let i = 0; i < steps; i++) {
                setTimeout(() => {
                  const intensity = matchedPhrase.intensity * (1 - i / steps);
                  device.vibrate(intensity).catch(console.error);
                }, i * stepDuration);
              }
              setTimeout(
                () => device.stop().catch(console.error),
                matchedPhrase.duration
              );
            }
          } catch (e) {
            console.error("Device Vibration Error:", e);
          }
        }
      }
    } catch (e) {
      console.error("Message Processing Error:", e);
    }
  });

  socket.on("close", () => console.log("Client disconnected."));
});

process.on("uncaughtException", (e) => console.error("Unhandled Error:", e));
