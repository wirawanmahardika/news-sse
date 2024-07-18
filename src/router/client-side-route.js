import express from "express";
import newsController from "../client/controller/news-controller.js";
import userController from "../client/controller/user-controller.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import { errorHandlerMid } from "../middleware/errorHandlerMiddleware.js";
import othersController from "../client/controller/others-controller.js";

const clientSideRoute = express.Router();

clientSideRoute.get("/", othersController.homeView);
clientSideRoute.get("/search-news", newsController.searchNews);
clientSideRoute.get("/read-news", newsController.readNews);
clientSideRoute.get("/category-news", newsController.categoryNews);

clientSideRoute.get("/login", ensureAuthenticated, userController.login);
clientSideRoute.get("/signup", userController.signup);

clientSideRoute.get("/error", othersController.errorView);

clientSideRoute.use(errorHandlerMid);
export default clientSideRoute;
