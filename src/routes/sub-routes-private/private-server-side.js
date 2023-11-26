import express from "express";
import privateServerSideController from "../../controller/server-side/private-server-side.js";

const privateServerSide = express.Router();

privateServerSide.post("/news", privateServerSideController.addCategoryNews);
privateServerSide.post("/content", privateServerSideController.addNewNews);

export default privateServerSide;
