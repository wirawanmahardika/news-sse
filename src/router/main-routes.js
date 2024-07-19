
import express from "express";
import serverSideRoute from "./server-side-route.js";
import clientSideRoute from "./client-side-route.js";

const routeRegulator = express.Router();

routeRegulator.use("/api/v1", serverSideRoute);
routeRegulator.use(clientSideRoute);
routeRegulator.use((_, res, next) => {
  res.send("there is no such file or directory");
});

export default routeRegulator;
