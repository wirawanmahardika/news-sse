import express from "express";
import helmet from 'helmet'
import routeRegulator from "../main-routes.js";
import passport from "passport";
import { initializePassport } from "../security/passport.js";
import flash from "express-flash";
import session from "express-session";

const web = express();

web.use(helmet());
web.set("view engine", "pug");
web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(flash());
web.use(session({ resave: false, saveUninitialized: false, secret: "asd" }));
web.use(express.static("public"));
web.use(passport.initialize());
web.use(passport.session());
initializePassport(passport);

web.use(routeRegulator);

export default web