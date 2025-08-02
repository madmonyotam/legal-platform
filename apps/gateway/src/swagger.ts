import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Legal Platform API Gateway',
      version: '1.0.0',
      description: 'API documentation for the gateway service',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [ './src/index.ts', './src/routes/*.ts' ], // files containing annotations
};

export const swaggerSpec = swaggerJsdoc(options); 