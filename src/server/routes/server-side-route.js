import express from "express";
import newController from "../controller/news-controller..js";
import userController from "../controller/user-controller.js";

const serverSideRoute = express.Router();

serverSideRoute.post("/news", newController.addCategoryNews); //
serverSideRoute.post("/content", newController.addNewNews); //
serverSideRoute.post("/news/category", newController.addCategoryNews); //

serverSideRoute.get("/news", newController.getAllNewsCategory);
serverSideRoute.post("/login", userController.login);

export default serverSideRoute;
