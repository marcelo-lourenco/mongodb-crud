import connectDB from '../config/db.js';
import Historico from '../models/historico.js';

const collectionName = "historico";

/**
 * Lista todos os registros da coleção histórico.
 * @param {import('express').Request} req - O objeto da requisição HTTP.
 * @param {import('express').Response} res - O objeto da resposta HTTP.
 * @returns {Promise<void>}
 */
export async function listarHistoricos(req, res) {
  const db = await connectDB();

  try {
    const historicos = await db.collection(collectionName).find().toArray();
    console.log('Todos os registros:', historicos);

    const historicosObj = historicos.map((historico) => Historico.fromDbObject(historico));
    console.log('Registros mapeados:', historicosObj);

    res.json(historicosObj);

  } catch (error) {
    console.error('Erro ao buscar histórico de registro MongoDB:', error);
    res.status(500).json({ error: 'Falha ao buscar histórico' });
  }
}

/**
 * Consulta registros com base nos parâmetros (cpf, dataCriacaoDe e  dataCriacaoAte).
 * @param {import('express').Request} req - O objeto da requisição HTTP.
 * @param {import('express').Response} res - O objeto da resposta HTTP.
 * @returns {Promise<void>}
 */
export async function consultarHistorico(req, res) {
  const { cpf, dataCriacaoDe, dataCriacaoAte } = req.query;
  const db = await connectDB();

  try {
    console.log('Query Parameters:', req.query);

    const query = {
      cpf,
      dataCriacao: {
        $gte: new Date(dataCriacaoDe),
        $lte: new Date(dataCriacaoAte),
      },
    };

    const historicos = await db
      .collection(collectionName)
      .find(query)
      .toArray();

    console.log('Resultado da Consulta:', historicos);

    // retorna apenas os dados mapeados
    const historicosObj = historicos.map((historico) => Historico.fromDbObject(historico));
    console.log('Registros mapeados:', historicosObj);

    res.json(historicosObj);
  } catch (error) {
    console.error('Erro ao buscar histórico de registro MongoDB:', error);
    res.status(500).json({ error: 'Falha ao buscar histórico' });
  }
}

/**
 * Consulta registros históricos com base no CPF fornecido e que foram criados nos últimos 30 dias.
 * @param { import('express').Request } req - O objeto da requisição HTTP.
 * @param { import('express').Response } res - O objeto da resposta HTTP.
 * @returns { Promise < void>}
 */

export async function consultarHistoricoTrintaDias(req, res) {
  const { cpf } = req.query;
  const db = await connectDB();

  try {
    console.log('Query Parameters:', req.query);

    // Calcular a data 30 dias atrás a partir da data corrente
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

    const query = {
      cpf,
      dataCriacao: {
        $gte: trintaDiasAtras,
        $lte: new Date(), // data corrente
      },
    };

    const historicos = await db
      .collection(collectionName)
      .find(query)
      .toArray();

    console.log('Resultado da Consulta:', historicos);

    // Retorna apenas os dados mapeados
    const historicosObj = historicos.map((historico) => Historico.fromDbObject(historico));
    console.log('Registros mapeados:', historicosObj);

    res.json(historicosObj);
  } catch (error) {
    console.error('Erro ao buscar histórico de registro MongoDB:', error);
    res.status(500).json({ error: 'Falha ao buscar histórico' });
  }
}

/**
 * Inclui um novo registro no histórico.
 * @param {import('express').Request} req - O objeto da requisição HTTP.
 * @param {import('express').Response} res - O objeto da resposta HTTP.
 * @returns {Promise<void>}
 */
export async function incluirHistorico(req, res) {
  const { cpf, nome, dataCriacao, servicosConsulta } = req.body;
  const db = await connectDB();

  try {
    const novoHistorico = {
      cpf,
      nome,
      dataCriacao: new Date(dataCriacao),
      servicosConsulta
    };
    console.log(novoHistorico)
    const resultado = await db.collection(collectionName).insertOne(novoHistorico);

    console.log(`Registro incluído com sucesso - _id: ${resultado.insertedId}`);

    res.json(resultado);
  } catch (error) {
    console.error('Erro ao incluir novo registro:', error);
    res.status(500).json({ error: 'Falha ao incluir registro' });
  }
}

/**
 * Edita um registro do histórico com base no CPF fornecido.
 * @param {import('express').Request} req - O objeto da requisição HTTP.
 * @param {import('express').Response} res - O objeto da resposta HTTP.
 * @returns {Promise<void>}
 */
export async function editarHistorico(req, res) {

  const { cpf } = req.params;
  const { nome, dataCriacao, servicosConsulta } = req.body;
  const db = await connectDB();

  try {

    const filtro = { cpf };
    const atualizacao = {
      $set: {
        nome,
        dataCriacao: new Date(dataCriacao),
        servicosConsulta,
      },
    };

    const resultado = await db.collection(collectionName).updateOne(filtro, atualizacao);
    console.log(resultado)

    // TODO
    //if (resultado.modifiedCount === 0) {
    //  console.log(`Nenhum registro com CPF ${cpf} encontrado para edição.`);
    //  res.status(404).json({ message: 'Registro não encontrado para edição' });
    //  return;
    //}

    console.log('Registro editado com sucesso:', cpf);
    res.json({ message: 'Registro editado com sucesso' });
  } catch (error) {
    console.error('Erro ao editar registro:', error);
    res.status(500).json({ error: 'Falha ao editar registro' });
  }
}

/**
 * Exclui um registro histórico com base no CPF fornecido.
 * @param {import('express').Request} req - O objeto da requisição HTTP.
 * @param {import('express').Response} res - O objeto da resposta HTTP.
 * @returns {Promise<void>}
 */
export async function excluirHistorico(req, res) {
  const { cpf } = req.params;
  const db = await connectDB();

  try {
    const resultado = await db.collection(collectionName).deleteOne({ cpf });

    if (resultado.deletedCount === 0) {
      console.log(`Nenhum registro com CPF ${cpf} encontrado.`);
      res.status(404).json({ message: 'Registro não encontrado' });
      return;
    }

    console.log('Registro excluído com sucesso:', cpf);
    res.json({ message: 'Registro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir registro:', error);
    res.status(500).json({ error: 'Falha ao excluir registro' });
  }
}
