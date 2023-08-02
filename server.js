// server.js

import express from 'express';
import { json } from 'express';
import { swaggerPath } from './docs/swagger/swagger-path.js';
import historicoRoutes from './src/routes/historicoRoutes.js';

const expressApp = express();
const PORT = process.env.PORT || 3000;

expressApp.use(json());

// Rotes
expressApp.use('/historico', historicoRoutes);

// Chame a função swaggerPath e passe o objeto do aplicativo Express
swaggerPath(expressApp);

/**
 * Inicia o servidor e o faz ouvir na porta especificada.
 * @function
 * @name startServer
 * @param {number} port - O número da porta na qual o servidor deve ouvir.
 * @param {() => void} callback - A função de retorno a ser executada após o início bem-sucedido do servidor.
 * @returns {void}
 */
function startServer(port, callback) {
  expressApp.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
    if (callback) callback();
  });
}

startServer(PORT);