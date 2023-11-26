import publicClientSideRoute from "./client/routes/public-client-side.js";
import privateServerSideRoute from "./server/routes/private-server-side.js";
import publicServerSideRoute from "./server/routes/public-server-side.js";
import express from "express";

const routeRegulator = express.Router();

routeRegulator.use("/view", publicClientSideRoute);
routeRegulator.use("/api/v1/private", privateServerSideRoute);
routeRegulator.use("/api/v1/public", publicServerSideRoute);

export default routeRegulator;
