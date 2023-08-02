// openapi-path.js

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger-docs.json' assert { type: 'json' };

/**
 * Ajusta as rotas definidas no objeto "paths" do "swagger-docs.json" substituindo a variável "${basePath}" pelo valor correto.
 * Também configura a rota "/api-docs" para servir a documentação Swagger UI.
 * @function
 * @name swaggerPath
 * @param {express.Application} app - O objeto do aplicativo Express.
 * @returns {void}
 */
export function swaggerPath(app) {
  const basePath = '/historico';
  const updatedPaths = {};

  // Itera sobre as chaves do objeto "paths" no "swaggerDocs" e atualiza as rotas com o valor correto
  for (const path of Object.keys(swaggerDocs.paths)) {
    const updatedPath = path.replace('${basePath}', basePath);
    updatedPaths[updatedPath] = swaggerDocs.paths[path];
  }

  // Atualiza o objeto "paths" do "swaggerDocs" com as rotas ajustadas
  swaggerDocs.paths = updatedPaths;

  // Configura a rota "/api-docs" para servir a documentação Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
