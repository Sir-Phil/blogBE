import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";



//Routers
import { errorHandler, notFound } from "./Middleware/errorHandle";
import userRoutes from "./routes/userRoutes";


dotenv.config()

const env = process.env.NODE_ENV || 9923

const app = express();
//config cors
app.use(cors());

//Parser JSON and URL-encoded bodies
app.use(cookiesParser());

app.use("/test", (_req, res) => {
  res.send("Testing the Blog API")
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
}
app.use(bodyParser.json());
app.use(express.json());


//api Routes
app.use("/api/users", userRoutes);



app.use(errorHandler);
app.use(notFound);


export default app;