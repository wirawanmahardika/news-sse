import express from "express";
import newsController from "../controller/news-controller.js";

const clientSideRoute = express.Router();

clientSideRoute.get("/home", newsController.homeView);
clientSideRoute.get("/add-news", newsController.addNews);
clientSideRoute.get("/read-news", newsController.readNews);
clientSideRoute.get("/add-category-news", newsController.addCategoryNews);

export default clientSideRoute;
