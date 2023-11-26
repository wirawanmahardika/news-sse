import express from "express";
import helmet from 'helmet'
import routeRegulator from "../routes/route-regulator.js";

const web = express();

web.use(helmet());
web.set("view engine", "pug");
web.use(express.json());
web.use(express.static("public"));

web.use(routeRegulator);

export default web