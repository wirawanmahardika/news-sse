import express from "express";
import newController from "../server/controller/news-controller.js";
import userController from "../server/controller/user-controller.js";
import multer from "multer";
import { serverSideErrorHandler } from "../middleware/errorHandlerMiddleware.js";
import { ensureAuthenticated, isAuthenticated } from "../middleware/authMiddleware.js";

const serverSideRoute = express.Router();

serverSideRoute.get("/category-news/count", newController.countCategoriesNews);
serverSideRoute.get("/category-news/:id_category_news", newController.getImageCategoryNewsByID);
serverSideRoute.get("/category-news", newController.getAllNewsCategory);
serverSideRoute.post("/category-news", isAuthenticated, multer().single('img'), newController.addCategoryNews); //
serverSideRoute.patch("/category-news", isAuthenticated, multer().single('img'), newController.updateCategoryNews); //
serverSideRoute.delete("/category-news/:id_category_news", newController.deleteCategoryNews);


serverSideRoute.post("/news", isAuthenticated, multer().single('img'), newController.addNewNews); //
serverSideRoute.patch("/news", isAuthenticated, multer().single('img'), newController.updateNews); //
serverSideRoute.delete("/news/:id_news", isAuthenticated, newController.deleteNews);
serverSideRoute.get("/news/:id_news", newController.getImageNewsById);
serverSideRoute.get("/news", newController.getNews);

serverSideRoute.post("/login", ensureAuthenticated, userController.login);
serverSideRoute.delete("/logout", isAuthenticated, userController.logout);
serverSideRoute.get("/check-authentication", userController.checkAuthentication);

serverSideRoute.use(serverSideErrorHandler);

export default serverSideRoute;
