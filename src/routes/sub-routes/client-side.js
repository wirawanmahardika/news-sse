import express from 'express'
import clientSideController from '../../controller/client-side-controller.js'

const clientSideRoute = express.Router()

clientSideRoute.get("/home", clientSideController.homeView)
clientSideRoute.get("/read-news", clientSideController.readNews)

export default clientSideRoute