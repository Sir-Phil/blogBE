// 'use strict';
// import serverless from "serverless-http";
// import app from "./src/app";
// module.exports.blogapi = serverless(app); 

// "use strict";
// import serverless from "serverless-http";
// import app from "./src/app";
// import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

// // Create a handler using serverless-http
// const handler = serverless(app);

// // Export the handler
// exports.blogapi = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
//   // Forward the event and context to the handler
//   const response = await handler(event, context);

//   // Modify the response object to include required properties
//   const modifiedResponse: APIGatewayProxyResult = {
//     ...response,
//     statusCode: 200, // Set the desired status code
//     body: JSON.stringify({ message: "Success" })
//   };

//   return modifiedResponse;
// };ss

import serverless from "serverless-http";
import app from "./src/app";



// Export the handler
module.exports.hello = serverless(app);
