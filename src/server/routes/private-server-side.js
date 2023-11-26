import express from "express";
import privateServerSideController from "../controller/private-server-side.js";

const privateServerSideRoute = express.Router();

// prettier-ignore
privateServerSideRoute.post("/news", privateServerSideController.addCategoryNews);
privateServerSideRoute.post("/content", privateServerSideController.addNewNews);

export default privateServerSideRoute;
