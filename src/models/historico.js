import { ObjectId } from 'mongodb';

/**
 * Representa um objeto Histórico.
 * @class
 */
class Historico {

  /**
   * Cria um objeto Histórico.
   * @constructor
   * @param {string} cpf - O CPF do registro histórico.
   * @param {string} nome - O nome associado ao registro histórico.
   * @param {Date} dataCriacao - A data de criação do registro histórico.
   * @param {string[]} servicosConsulta - Um array de serviços associados ao registro histórico.
   */
  constructor(cpf, nome, dataCriacao, servicosConsulta) {
    this.cpf = cpf;
    this.nome = nome;
    this.dataCriacao = dataCriacao;
    this.servicosConsulta = servicosConsulta;
  }

  /**
   * Cria um objeto Histórico a partir de um objeto do banco de dados.
   * @static
   * @param {Object} dbObject - O objeto do banco de dados que representa o registro histórico.
   * @param {ObjectId} dbObject._id - O ObjectID do MongoDB do registro histórico.
   * @param {string} dbObject.cpf - O CPF do registro histórico.
   * @param {string} dbObject.nome - O nome associado ao registro histórico.
   * @param {Date} dbObject.dataCriacao - A data de criação do registro histórico.
   * @param {string[]} dbObject.servicosConsulta - Um array de serviços associados ao registro histórico.
   * @returns {Historico} Um novo objeto Histórico criado a partir do objeto do banco de dados.
   */
  static fromDbObject(dbObject) {
    const { _id, ...data } = dbObject;
    return new Historico(data.cpf, data.nome, data.dataCriacao, data.servicosConsulta);
  }
}

export default Historico;