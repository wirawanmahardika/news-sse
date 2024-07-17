import express from "express";
import newController from "../controller/news-controller..js";
import userController from "../controller/user-controller.js";
import { serverSideErrorHandler } from "../../middleware/errorHandlerMiddleware.js";
import multer from "multer";

const serverSideRoute = express.Router();

serverSideRoute.get("/category-news/count", newController.countCategoriesNews);
serverSideRoute.get("/category-news/:id_category_news", newController.getImageCategoryNewsByID);
serverSideRoute.get("/category-news", newController.getAllNewsCategory);
serverSideRoute.post("/category-news", multer().single('img'), newController.addCategoryNews); //
serverSideRoute.patch("/category-news", multer().single('img'), newController.updateCategoryNews); //
serverSideRoute.delete("/category-news/:id_category_news", newController.deleteCategoryNews);


serverSideRoute.post("/news", multer().single('img'), newController.addNewNews); //
serverSideRoute.patch("/news", multer().single('img'), newController.updateNews); //
serverSideRoute.delete("/news/:id_news", newController.deleteNews);
serverSideRoute.get("/news/:id_news", newController.getImageNewsById);
serverSideRoute.get("/news", newController.getNews);

serverSideRoute.post("/login", userController.login);
serverSideRoute.post("/logout", userController.logout);

serverSideRoute.use(serverSideErrorHandler);

// prettier-ignore
// prettier-ignore
export default serverSideRoute;
