import * as dotenv from "dotenv";
import { sequelize } from "./Database/db_config";
import app from "./app";

dotenv.config();

//Handle uncaught errors globally
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception', err);
    process.exit(1);
});

//connection to database 
sequelize
    .sync()
    .then(() => {
        console.log('Connected to the database');
        // starting the express app
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error) =>{
        console.error('Error connecting to the database', error);
        process.exit(1);
    });


// handle the promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   
        process.exit(1)
});