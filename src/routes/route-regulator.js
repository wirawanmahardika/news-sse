import clientSideRoute from "./sub-routes/client-side.js";
import express from 'express'

const routeRegulator = express.Router()

routeRegulator.use('/view', clientSideRoute)

export default routeRegulator