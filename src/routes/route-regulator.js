import privateServerSideRoute from "./sub-routes-private/private-server-side.js";
import publicServerSideRoute from "./sub-routes-public/public-server-side.js";
import publicClientSideRoute from "./sub-routes-public/public-client-side.js";
import express from "express";

const routeRegulator = express.Router();

routeRegulator.use("/view", publicClientSideRoute);
routeRegulator.use("/api/v1/private", privateServerSideRoute);
routeRegulator.use("/api/v1/public", publicServerSideRoute);

export default routeRegulator;
