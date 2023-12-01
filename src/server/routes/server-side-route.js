import express from "express";
import newController from "../controller/news-controller..js";
import userController from "../controller/user-controller.js";
import { serverSideErrorHandler } from "../../middleware/errorHandlerMiddleware.js";
import multer from "multer";

const serverSideRoute = express.Router();

serverSideRoute.post("/news", multer().single('img'), newController.addCategoryNews); //
serverSideRoute.post("/content", multer().single('img'), newController.addNewNews); //
serverSideRoute.patch("/news/category", multer().single('img'), newController.updateCategoryNews); //

serverSideRoute.get("/news", newController.getAllNewsCategory);
serverSideRoute.post("/login", userController.login);

serverSideRoute.use(serverSideErrorHandler);

export default serverSideRoute;
