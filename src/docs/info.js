export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Desafio 11",
      version: "1.0.0",
      description: "Aplicacion de comercio online",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
