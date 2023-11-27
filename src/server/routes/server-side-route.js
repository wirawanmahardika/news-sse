import express from "express";
import newController from "../controller/news-controller..js";

const serverSideRoute = express.Router();

serverSideRoute.post("/news", newController.addCategoryNews); //
serverSideRoute.post("/content", newController.addNewNews); //
serverSideRoute.post("/news/category", newController.addCategoryNews); //

serverSideRoute.get("/news", newController.getAllNewsCategory);

export default serverSideRoute;
