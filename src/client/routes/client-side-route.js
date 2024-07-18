import express from "express";
import newsController from "../controller/news-controller.js";
import userController from "../controller/user-controller.js";
import { ensureAuthenticated, isAuthenticated } from "../../middleware/authMiddleware.js";
import { errorHandlerMid } from "../../middleware/errorHandlerMiddleware.js";
import othersController from "../controller/others-controller.js";

const clientSideRoute = express.Router();

clientSideRoute.get("/", othersController.homeView);
clientSideRoute.get("/search-news", newsController.searchNews);
clientSideRoute.get("/read-news", newsController.readNews);
clientSideRoute.get("/category-news", newsController.categoryNews);

clientSideRoute.get("/login", ensureAuthenticated, userController.login);
clientSideRoute.get("/signup", userController.signup);
clientSideRoute.get("/admin", isAuthenticated, userController.admin);

clientSideRoute.get("/error", othersController.errorView);

clientSideRoute.use(errorHandlerMid);
export default clientSideRoute;
