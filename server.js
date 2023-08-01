import express, { json } from 'express';
import { config } from 'dotenv';
/**
 * Módulo que inicia o servidor Express e define as rotas para o aplicativo.
 * @module app
 */

import historicoRoutes from './src/routes/historicoRoutes.js';

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

// Rotes
app.use('/historico', historicoRoutes);

/**
 * Inicia o servidor e o faz ouvir na porta especificada.
 * @function
 * @name listen
 * @param {number} PORT - O número da porta na qual o servidor deve ouvir.
 * @param {() => void} callback - A função de retorno a ser executada após o início bem-sucedido do servidor.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});