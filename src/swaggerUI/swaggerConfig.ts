import swaggerJSDoc from "swagger-jsdoc" ;

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
    
    apis:['./routes/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

console.log(JSON.stringify(swaggerSpec, null, 2));

export default swaggerSpec;
