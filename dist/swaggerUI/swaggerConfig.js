"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog RESTful API',
            version: '1.0.0',
            description: 'Document for API for Blog signUp',
        },
        // servers: {
        //     url: "http://localhost:9923/"
        // },
    },
    apis: ['./routes/*.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
