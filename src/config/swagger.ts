import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hydrapp API",
      version: "1.0.0",
      description: "Documentação da API do Hydrapp",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nome: { type: "string", example: "Thyago Monteiro" },
            email: { type: "string", example: "thyago@email.com" },
          },
        },
        Meta: {
          type: "object",
          properties: {
            id: { type: "integer" },
            usuario_id: { type: "integer" },
            quantidade_ml: { type: "integer" },
            ativa: { type: "boolean" },
            criada_em: { type: "string", format: "date-time" },
          },
        },
        RegistroAgua: {
          type: "object",
          properties: {
            id: { type: "integer" },
            usuario_id: { type: "integer" },
            quantidade_ml: { type: "integer" },
            registrado_em: { type: "string", format: "date-time" },
            recipiente_id: { type: "integer" },
          },
        },
        Recipiente: {
          type: "object",
          properties: {
            id: { type: "integer" },
            nome: { type: "string" },
            volume_ml: { type: "integer" },
            usuario_id: { type: "integer" },
            criado_em: { type: "string", format: "date-time" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            user: {
              $ref: "#/components/schemas/Usuario",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: "Auth", description: "Autenticação e sessão" },
      { name: "Meta", description: "Gerenciamento de metas de hidratação" },
      { name: "Consumo", description: "Registros de ingestão de água" },
      { name: "Dashboard", description: "Resumo geral da hidratação" },
      { name: "Recipientes", description: "Recipientes personalizados" },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
