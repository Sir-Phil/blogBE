import { Sequelize } from 'sequelize';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config';

import dotenv from 'dotenv';

dotenv.config()
const port = parseInt(process.env.DB_PORT || '3306', 10);

// Sequelize configuration
const sequelize = new Sequelize({
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: port,
  dialect: 'mysql',
  // Other Sequelize-specific options
});

// Other database-related configuration
// const maxPoolSize = 10;
//const dbUrl = 'database-url';

export {
  sequelize,
  // maxPoolSize,
  // dbUrl,
  // Other database-related settings
};
