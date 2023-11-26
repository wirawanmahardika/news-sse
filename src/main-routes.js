import clientSideRoute from "./client/routes/client-side-route.js";
import serverSideRoute from "./server/routes/server-side-route.js";
import express from "express";

const routeRegulator = express.Router();

routeRegulator.use("/view", clientSideRoute);
routeRegulator.use("/api/v1", serverSideRoute);

export default routeRegulator;
