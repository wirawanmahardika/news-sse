import express from "express";
import newController from "../controller/news-controller..js";
import userController from "../controller/user-controller.js";
import { serverSideErrorHandler } from "../../middleware/errorHandlerMiddleware.js";
import multer from "multer";

const serverSideRoute = express.Router();

serverSideRoute.post("/category-news", multer().single('img'), newController.addCategoryNews); //
serverSideRoute.patch("/category-news", multer().single('img'), newController.updateCategoryNews); //
serverSideRoute.get("/category-news/:id_category_news", newController.getCategoryNewsByID);
serverSideRoute.get("/category-news", newController.getAllNewsCategory);


serverSideRoute.post("/news", multer().single('img'), newController.addNewNews); //
serverSideRoute.patch("/news", multer().single('img'), newController.updateNews); //
serverSideRoute.get("/news/:id_news", newController.getNewsByID);

serverSideRoute.post("/content", newController.updateNewsContent); //

serverSideRoute.post("/login", userController.login);
serverSideRoute.post("/logout", userController.logout);

serverSideRoute.use(serverSideErrorHandler);

// prettier-ignore
// prettier-ignore
export default serverSideRoute;
