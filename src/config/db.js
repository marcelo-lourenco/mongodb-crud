import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Conecta ao banco de dados MongoDB.
 * @returns {Promise<import('mongodb').Db>} Uma promessa que resolve na conexão bem-sucedida à base de dados MongoDB e retorna a instância do banco de dados.
 * @throws {Error} Se ocorrer um erro na conexão ao banco de dados MongoDB.
 */
async function connectDB() {
  try {
    await client.connect();
    console.log('Conectado ao banco de dados MongoDB.');
    return client.db(process.env.MONGODB_DATABASE);
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados MongoDB:', error);
    throw error;
  }
}

export default connectDB;
