import clientSideRoute from "./client/routes/client-side-route.js";
import serverSideRoute from "./server/routes/server-side-route.js";
import express from "express";

const routeRegulator = express.Router();

routeRegulator.use("/api/v1", serverSideRoute);
routeRegulator.use(clientSideRoute);
routeRegulator.use((req, res, next) => {
  res.send("there is no such file or directory");
});

export default routeRegulator;
