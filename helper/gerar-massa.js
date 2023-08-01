// Criação do cabeçalho da requisição
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// Criação dos dados em formato JSON a serem enviados na requisição
var raw = JSON.stringify({
  "cpf": gerarCPF(),
  "nome": gerarNome(),
  "dataCriacao": gerarData(),
  "servicosConsulta": [
    {
      "codigoServico": gerarNumeroAleatorio(999),
      "nomeServico": "Serviço 1",
      "retornoServico": [
        {
          "dominioTipoRetorno": "SUCESSO",
          "parametrosServico": {
            "chave1": gerarNumeroAleatorio(99),
            "chave2": gerarNumeroAleatorio(99)
          },
          "conteudo": {
            "campo1": gerarNumeroAleatorio(99),
            "campo2": gerarNumeroAleatorio(99)
          }
        }
      ]
    },
    {
      "codigoServico": gerarNumeroAleatorio(999),
      "nomeServico": "Serviço 2",
      "retornoServico": [
        {
          "dominioTipoRetorno": "SUCESSO",
          "parametrosServico": {
            "chave1": gerarNumeroAleatorio(99),
            "chave2": gerarNumeroAleatorio(99)
          },
          "conteudo": {
            "campo1": gerarNumeroAleatorio(99),
            "campo2": gerarNumeroAleatorio(99)
          }
        }
      ]
    }
  ]
});

// Configurações da requisição
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

/**
 * Função para enviar uma requisição HTTP POST para incluir um novo registro histórico.
 * @returns {Promise<void>} Uma promessa que representa o resultado da requisição.
 */
fetch("http://localhost:3000/historico/incluir", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
// ----------------------------------------


/**
 * Função para gerar um CPF aleatório no formato "XXX.XXX.XXX-XX".
 * @returns {string} O CPF gerado.
 */
function gerarCPF() {
  const randomiza = n => Math.floor(Math.random() * n);
  const mod = (dividendo, divisor) => Math.floor(dividendo % divisor);

  const n = 9;
  let cpf = '';
  for (let i = 0; i < 9; i++) cpf += randomiza(n).toString();
  const d1 = 11 - mod(
    cpf.split('').reduce((acc, digit, i) => acc + parseInt(digit) * (10 - i), 0) % 11,
    11
  );
  cpf += d1 >= 10 ? '0' : d1.toString();
  const d2 = 11 - mod(
    cpf.split('').reduce((acc, digit, i) => acc + parseInt(digit) * (11 - i), 0) % 11,
    11
  );
  cpf += d2 >= 10 ? '0' : d2.toString();

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
// ----------------------------------------

/**
 * Função para gerar uma data aleatória no formato "AAAA-MM-DD".
 * @returns {string} A data gerada.
 */
function gerarData() {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const hoje = new Date();
  const limiteInferior = new Date(hoje);
  limiteInferior.setDate(limiteInferior.getDate() - 60);

  const dataAleatoria = new Date(randomInt(limiteInferior.getTime(), hoje.getTime()));

  const ano = dataAleatoria.getFullYear();
  const mes = String(dataAleatoria.getMonth() + 1).padStart(2, '0');
  const dia = String(dataAleatoria.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}
// ----------------------------------------

/**
 * Função para gerar um nome aleatório.
 * @returns {string} O nome gerado.
 */
function gerarNome() {
  const nomes = [
    'João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Mariana', 'Fernanda', 'Rafael', 'Camila',
    'Gustavo', 'Sofia', 'Felipe', 'Bianca', 'Daniel', 'Carolina', 'Gabriel', 'Laura',
    'Eduardo', 'Juliana', 'Rodrigo', 'Larissa', 'Miguel', 'Beatriz', 'Vitor', 'Isabela',
    'Matheus', 'Letícia', 'Caio', 'Lorena'
  ];

  const sobrenomes = [
    'Silva', 'Santos', 'Oliveira', 'Souza', 'Ferreira', 'Almeida', 'Pereira', 'Costa',
    'Carvalho', 'Gomes', 'Rodrigues', 'Martins', 'Rocha', 'Ramos', 'Lima', 'Alves',
    'Monteiro', 'Mendes', 'Barbosa', 'Freitas', 'Castro', 'Melo', 'Araújo', 'Fernandes',
    'Ribeiro', 'Campos', 'Cardoso', 'Neves', 'Pinto'
  ];

  const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenomeAleatorio = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

  return `${nomeAleatorio} ${sobrenomeAleatorio}`;
}
// -----------------------------------------

/**
 * Função para gerar um número aleatório entre 1 e o valor máximo fornecido.
 * @param {number} max - O valor máximo para o número aleatório.
 * @returns {string} O número aleatório gerado.
 */
function gerarNumeroAleatorio(max) {
  return String(Math.floor(Math.random() * max) + 1);
}
