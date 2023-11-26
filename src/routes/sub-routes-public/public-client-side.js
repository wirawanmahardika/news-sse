import express from "express";
import clientSideController from "../../controller/client-side/public-client-side.js";

const publicClientSideRoute = express.Router();

publicClientSideRoute.get("/home", clientSideController.homeView);
publicClientSideRoute.get("/add-news", clientSideController.addNews);
publicClientSideRoute.get("/read-news", clientSideController.readNews);

export default publicClientSideRoute;
