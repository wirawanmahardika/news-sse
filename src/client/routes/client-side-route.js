import express from "express";
import newsController from "../controller/news-controller.js";
import userController from "../controller/user-controller.js";

const clientSideRoute = express.Router();

clientSideRoute.get("/home", newsController.homeView);
clientSideRoute.get("/add-news", newsController.addNews);
clientSideRoute.get("/read-news", newsController.readNews);
clientSideRoute.get("/add-category-news", newsController.addCategoryNews);

clientSideRoute.get("/login", userController.login);

export default clientSideRoute;
