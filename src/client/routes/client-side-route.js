import express from "express";
import newsController from "../controller/news-controller.js";
import userController from "../controller/user-controller.js";
import { ensureAuthenticated, isAuthenticated } from "../../middleware/authMiddleware.js";
import { errorHandlerMid } from "../../middleware/errorHandlerMiddleware.js";
import othersController from "../controller/others-controller.js";

const clientSideRoute = express.Router();

clientSideRoute.get("/", othersController.homeView);
clientSideRoute.get("/read-news", newsController.readNews);

clientSideRoute.get("/add-news", isAuthenticated, newsController.addNews);
clientSideRoute.get("/add-category-news",isAuthenticated,newsController.addCategoryNews);
clientSideRoute.get("/login", ensureAuthenticated, userController.login);
clientSideRoute.get("/signup", userController.signup);

clientSideRoute.get("/error", othersController.errorView);

clientSideRoute.use(errorHandlerMid);

//prettier-ignore
//prettier-ignore
//prettier-ignore
export default clientSideRoute;
