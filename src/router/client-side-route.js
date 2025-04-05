import express from "express";
import newsController from "../client/controller/news-controller.js";
import { errorHandlerMid } from "../middleware/errorHandlerMiddleware.js";
import othersController from "../client/controller/others-controller.js";

const clientSideRoute = express.Router();

clientSideRoute.get("/", othersController.homeView);
clientSideRoute.get("/search-news", newsController.searchNews);
clientSideRoute.get("/read-news", newsController.readNews);
clientSideRoute.get("/category-news/:id_category", newsController.categoryNews);

clientSideRoute.get("/error", othersController.errorView);
clientSideRoute.use(errorHandlerMid);

export default clientSideRoute;
