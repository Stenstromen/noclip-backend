const express = require("express");
const bodyParser = require("body-parser");

const compression = require("compression");
const app = express();

const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization !== process.env.AUTHHEADER_PASSWORD
  ) {
    return res.status(403).json({ error: "Invalid or no credentials" });
  }
  next();
});
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});

const noclipRouter = require("./routers/noclip.router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(noclipRouter);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join_room", (data) => {
    console.log(socket.id + " joined " + data);
    socket.join(data);
  });

  socket.on("location", (data) => {
    socket.to(data.room).emit("location", {
      latitude: data.latitude,
      longitude: data.longitude,
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
});

http.listen(8080, () => {
  console.log("Server listening on localhost:8000");
});
