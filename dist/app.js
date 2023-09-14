"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//Routers
const errorHandle_1 = require("./Middleware/errorHandle");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const swagger_json_1 = __importDefault(require("./swaggerUI/swagger.json"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 9923;
const app = (0, express_1.default)();
//config cors
app.use((0, cors_1.default)());
//Parser JSON and URL-encoded bodies
app.use((0, cookie_parser_1.default)());
app.use("/test", (_req, res) => {
    res.send("Testing the Blog API");
});
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
const customCss = `
  .swagger-ui .topbar .download-url-wrapper .download-url-input {
    width: 200px;
  }
`;
const customOptions = {
    customCss,
    customSiteTitle: 'Blogger Signup', // Customize the Header text
};
//swagger UI
app.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, customOptions));
//api Routes
app.use("/api/users", userRoutes_1.default);
app.use(errorHandle_1.errorHandler);
app.use(errorHandle_1.notFound);
exports.default = app;
