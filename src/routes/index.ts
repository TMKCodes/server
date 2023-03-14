// Import Multer route to /
import { Router } from 'express-serve-static-core';
import path from 'path';
import dotenv from "dotenv";
import multer from '../lib/common/Multer';
import authentication from "./authentication";
import groups from "./groups";
import members from "./members";
import articles from "./articles";

export const EnableRoutes = (app: {
  get(arg0: string, arg1: (req: any, res: any) => void): unknown; 
  use: (arg0: string, arg1: Router) => void; 
}) => {
  const dirname = path.resolve();
  if(process.env.FILE_UPLOAD_ENABLED === "true") {
    app.use("/", multer.router);
    console.log(`FILE_UPLOAD_ENABLED == ${process.env.FILE_UPLOAD_ENABLED}`);
  }
  if(process.env.AUTHENTICATION_ENABLED === "true") {
    app.use("/api", authentication.router);
    console.log(`AUTHENTICATION_ENABLEDAUTHENTICATION_ENABLED == ${process.env.AUTHENTICATION_ENABLEDAUTHENTICATION_ENABLED}`);
  }
  if(process.env.GROUPS_ENABLED === "true") {
    app.use("/api", groups.router);
    console.log(`AUTHENTICATION_ENABLED == ${process.env.AUTHENTICATION_ENABLED}`);
  } 
  if(process.env.MEMBERS_ENABLED === "true") {
    app.use("/api", members.router);
    console.log(`AUTHENTICATION_ENABLED == ${process.env.AUTHENTICATION_ENABLED}`);
  } 
  if(process.env.ARTICLES_ENABLED == "true") {
    app.use("/api", articles.router);
    console.log(`AUTHENTICATION_ENABLED == ${process.env.AUTHENTICATION_ENABLED}`);
  }
    // Catch all other routes, serve client build if it exists.
  app.get('*', (req, res) => {
    res.sendFile(path.join(dirname + '/../client/build/'));
  });
}
