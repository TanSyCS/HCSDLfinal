const express = require("express");
const expressApp = require("./init");
const application = require("./API/Route");
const cors = require("cors");
const StartServer = async () => {
  const app = express();
  await expressApp(app);
  app.listen(3001);
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  app.use(application);
};

StartServer();
