"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = parseInt(process.env.DB_PORT || '3306', 10);
// Sequelize configuration
const sequelize = new sequelize_1.Sequelize({
    database: config_1.DB_DATABASE,
    username: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    host: config_1.DB_HOST,
    port: port,
    dialect: 'mysql',
    // Other Sequelize-specific options
});
exports.sequelize = sequelize;
