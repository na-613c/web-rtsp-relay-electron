(function () {
  "use strict";
  const express = require("express");
  const server = express();
  const port = 2000;

  const { proxy } = require("rtsp-relay")(server);

  const handler = (ws, req) => {
    let { cameraIP, info = "", r = "" } = req.params;
    r = r.length === 0 ? "" : `?${r}`;
    return proxy({
      url: `rtsp://${cameraIP}/${info}${r}`,
      verbose: true, // LOG
      onDisconnect: () => console.log("Connection lost!"),
      // Improving the video quality
      additionalFlags: ["-q", "1"],
      // additionalFlags: ['-s','960x540', '-loglevel','error'],
      transport: "tcp",
    })(ws);
  };

  server.get("/", function (req, res) {
    res.send("START LOCAL SERVER");
  });

  require("events").EventEmitter.defaultMaxListeners = 0;

  server.on("warning", e => console.warn(e.stack));

  server.ws("/api/stream/:cameraIP/:info/:r", handler);

  server.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });

  module.exports.server = server;
})();
