class Vaga {
  constructor(empresa, cargo, requisitos, salario, modalidade) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibicaoResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

class VagaFrontEnd extends Vaga {
  constructor(empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível da vaga: ${this.nivel}`;
  }
}

const candidato = {
  nome: "Ana",
  habilidades: ["JavaScript", "React", "CSS"],
  experienciaMeses: 3
}

const vagasGerais = [
  new Vaga("Empresa1", 
    "Dev Back-End", 
    ["Node", "SQL"], 
    3000, 
    "Remoto"
  )
];

const vagasFrontEnd = [
  new VagaFrontEnd(
    "Empresa2",
    "Dev Front-End",
    ["JavaScript", "React", "CSS"],
    2500,
    "Híbrido",
    "Júnior"
  )
];

const vagasEstagio = [
  new Vaga("Empresa3", 
    "Estágio TI", 
    ["Lógica", "Git"], 
    1500, 
    "Presencial"
  )
];

const todasVagas = [
  ...vagasGerais,
  ...vagasFrontEnd,
  ...vagasEstagio
];

function finalizarAnalise(nomeCandidato, callback) {
  console.log("Análise finalizada.");
  callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
  console.log(`${nome}, revise suas habilidades faltantes e atualize seu plano de estudos.`);
}

function criaContadorDeAnalises() {

  let totalAnalises = 0;

  return function() {
    totalAnalises++;

    console.log(`Total de análises realizadas: ${totalAnalises}`);
  }

}

const contadorAnalises = criaContadorDeAnalises();

function buscarVagasSimuladas() {

  return new Promise((resolve) => {

    console.log("Carregando vagas...")

    setTimeout(() => {

      resolve(todasVagas)

    }, 2000)

  })

}

async function iniciarSistema() {

  const vagasCarregadas = await buscarVagasSimuladas()

  console.log("Vagas carregadas com sucesso!")

  analisaVagas(
    vagasCarregadas,
    candidato,
    exibirMensagemFinal
  )

}

function analisaVagas(todasVagas, candidato, callback) {

  let melhorVaga = null
  let maiorCompatibilidade = 0
  let prioridadeEstudo = []

  for (let i = 0; i < todasVagas.length; i++) {
    const vaga = todasVagas[i]

    const requisitosEncontrados = vaga.requisitos.filter(requisitoVaga =>
      candidato.habilidades.includes(requisitoVaga)
    )

    const requisitosFaltando = vaga.requisitos.filter(requisitoVaga =>
      !candidato.habilidades.includes(requisitoVaga)
    )

    const atendeTodosRequisitos = vaga.requisitos.every(requisitoVaga =>
      candidato.habilidades.includes(requisitoVaga)
    )

    prioridadeEstudo.push(...requisitosFaltando)

    const calculaCompatibilidade = Math.round(
      (requisitosEncontrados.length / vaga.requisitos.length) * 100
    )

    let classificacao;

    if (calculaCompatibilidade >= 80 && calculaCompatibilidade <= 100){
      classificacao = "Alta compatibilidade"
    } 
    else if (calculaCompatibilidade >= 50 && calculaCompatibilidade <= 79){
      classificacao = "Média compatibilidade"
    } 
    else if (calculaCompatibilidade >= 0 && calculaCompatibilidade <= 49){
      classificacao = "Baixa compatibilidade"
    } 

    if (calculaCompatibilidade > maiorCompatibilidade) {
      maiorCompatibilidade = calculaCompatibilidade
      melhorVaga = vaga
    }

    console.log(vaga.exibicaoResumo())
    console.log(`Salário: ${vaga.salario}`)
    console.log(`Modalidade: ${vaga.modalidade}`)
    if (vaga instanceof VagaFrontEnd) {
      console.log(vaga.exibirNivel())
    }
    console.log(`Compatibilidade: ${calculaCompatibilidade}%`)
    console.log("Habilidades encontradas:", requisitosEncontrados.length ? requisitosEncontrados : "Nenhuma")
    console.log("Habilidades faltantes:", requisitosFaltando.length ? requisitosFaltando : "Nenhuma")
    console.log(`Classificação: ${classificacao}`)
    console.log(`Atende todos os requisitos? ${atendeTodosRequisitos ? "Sim" : "Não"}`)

    console.log("--------------------------------------------------")
  }

    const resumoCompatibilidade = todasVagas.reduce((total, vaga) => {

      const encontrados = vaga.requisitos.filter(requisitoVaga =>
        candidato.habilidades.includes(requisitoVaga)
      )

      const compatibilidade =
        (encontrados.length / vaga.requisitos.length) * 100

      return total + compatibilidade

    }, 0)

    const mediaCompatibilidade = todasVagas.length > 0 ? resumoCompatibilidade / todasVagas.length : 0;

    console.log(`Média de compatibilidade: ${mediaCompatibilidade.toFixed(2)}%`)
    console.log("--------------------------------------------------")

    if (melhorVaga) {
      console.log("Melhor vaga:")
      console.log(`Empresa: ${melhorVaga.empresa}`)
      console.log(`Cargo: ${melhorVaga.cargo}`)
      console.log(`Compatibilidade: ${maiorCompatibilidade}%`)
    } else {
      console.log("Nenhuma vaga encontrada.")
    }
    console.log("--------------------------------------------------")

    console.log("Recomendações de estudo:")
    console.log("Priorize estudar:", prioridadeEstudo.length ? prioridadeEstudo : "Nada encontrado", "pois esses conteúdos aparecem nas vagas analisadas.")

    finalizarAnalise(candidato.nome, callback)

    contadorAnalises();
}

iniciarSistema()