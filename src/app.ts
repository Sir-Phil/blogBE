import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";
import swaggerUi from "swagger-ui-express"



//Routers
import { errorHandler, notFound } from "./Middleware/errorHandle";
import userRoutes from "./routes/userRoutes";
import swaggerSpec from "./swaggerUI/swagger.json";


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

const customCss = `
  .swagger-ui .topbar .download-url-wrapper .download-url-input {
    width: 200px;
  }
`;

const customOptions = {
  customCss, // You can customize the CSS
  customSiteTitle: 'Blogger Signup', // Customize the Header text
};
//swagger UI
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec, customOptions));

//api Routes
app.use("/api/users", userRoutes);



app.use(errorHandler);
app.use(notFound);


export default app;