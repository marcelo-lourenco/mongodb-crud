/**
 * Módulo para lidar com as rotas relacionadas ao histórico.
 * @module routes/historico
 */

import { Router } from 'express';
import {
  listarHistoricos,
  consultarHistorico,
  consultarHistoricoTrintaDias,
  incluirHistorico,
  editarHistorico,
  excluirHistorico
} from '../controllers/historicoController.js';

const router = Router();

/**
 * @route GET /listar
 * @description Rota para consultar todos os registros da coleção.
 * @access Public
 */
router.get('/listar', listarHistoricos);

/**
 * @route GET /consultar
 * @description Rota para consultar com os parâmetros (filtros).
 * @access Public
 */
router.get('/consultar', consultarHistorico);

/**
 * @route GET /consultar
 * @description Rota para consultar registros dos últimos 30 dias.
 * @access Public
 */
router.get('/consultartrintadias', consultarHistoricoTrintaDias);

/**
 * @route POST /incluir
 * @description Rota para incluir um novo registro.
 * @access Public
 */
router.post('/incluir', incluirHistorico);


/**
 * @route PUT /editar
 * @description Rota para editar um registro histórico por CPF.
 * @access Public
 */
// 
router.put('/editar/:cpf', editarHistorico);

/**
 * @route DELETE /excluir/:cpf
 * @description Rota para excluir um registro com base no CPF.
 * @param {string} cpf - O CPF do registro a ser excluído.
 * @access Public
 */
router.delete('/excluir/:cpf', excluirHistorico);

export default router;