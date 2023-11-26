import express from "express";
import publicServerSide from "../controller/public-server-side.js";

const privateServerSideRoute = express.Router();

privateServerSideRoute.get("/news", publicServerSide.getAllNewsCategory);

export default privateServerSideRoute;
