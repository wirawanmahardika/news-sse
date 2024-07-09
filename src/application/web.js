import express from "express";
import helmet from 'helmet'
import routeRegulator from "../main-routes.js";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import { initializePassport } from "../security/passport.js";
import dotenv from "dotenv";
import mysqlSessionStore from "../config/session-store.js";
import cors from "cors"

dotenv.config();
const web = express();

web.use(cors())
web.use(helmet());
web.set("view engine", "pug");
web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(flash());
web.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: mysqlSessionStore(session),
    cookie: {
      httpOnly: true,
      signed: true,
      sameSite: "strict",
      path: "/",
      maxAge: 1000 * 3600 * 24 * 3,
    },
  })
);
web.use(express.static("public"));
web.use(passport.initialize());
web.use(passport.session());
initializePassport(passport);

web.use(routeRegulator);

export default web