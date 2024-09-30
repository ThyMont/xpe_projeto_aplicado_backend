import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "GoAppa",
      version: "1.0.0",
      description: "Documentação do GoAppa - API para gerenciamento de restaurantes e cardápios",
      contact: {
        name: "Thyago Monteiro",
        url: "https://seusite.com",
        email: "thyagomonteirodev@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
