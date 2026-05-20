const candidato = {
  nome: "Ana",
  habilidades: ["JavaScript", "React", "CSS"],
  experienciaMeses: 3
}

const vagas = [
  {
    id: 1,
    empresa: "TechStart",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["JavaScript", "GitHub", "Lógica de Programação"],
    salario: 2800,
    modalidade: "Remoto"
  },
  {
    id: 2,
    empresa: "Empresa2",
    cargo: "Estágio Front-End",
    requisitos: ["JavaScript", "GitHub", "Kanban"],
    salario: 1800,
    modalidade: "Híbrido"
  },
  {
    id: 3,
    empresa: "Empresa3",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["JavaScript", "GitHub", "HTML", "CSS"],
    salario: 2000,
    modalidade: "Presencial"
  }
]

function analisaVagas(vagas, candidato) {

  let melhorVaga = null
  let maiorCompatibilidade = 0
  let prioridadeEstudo = []

  for (let i = 0; i < vagas.length; i++) {
    const vaga = vagas[i]

    const requisitosEncontrados = vaga.requisitos.filter(requisitoVaga =>
      candidato.habilidades.includes(requisitoVaga)
    )

    const requisitosFaltando = vaga.requisitos.filter(requisitoVaga =>
      !candidato.habilidades.includes(requisitoVaga)
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
    

    console.log(`Empresa: ${vaga.empresa}`)
    console.log(`Cargo: ${vaga.cargo}`)
    console.log(`Compatibilidade: ${calculaCompatibilidade}%`)
    console.log("Habilidades encontradas:", requisitosEncontrados.length ? requisitosEncontrados : "Nenhuma")
    console.log("Habilidades faltantes:", requisitosFaltando.length ? requisitosFaltando : "Nenhuma")
    console.log(`Classificação: ${classificacao}`)
    console.log("--------------------------------------------------")
  }

    console.log("Vaga mais compatível:")
    console.log(`Empresa: ${melhorVaga.empresa}`)
    console.log(`Cargo: ${melhorVaga.cargo}`)
    console.log(`Compatibilidade: ${maiorCompatibilidade}%`)
    console.log("--------------------------------------------------")

    console.log("Recomendações de estudo:")
    console.log("Priorize estudar:", prioridadeEstudo.length ? prioridadeEstudo : "Nada encontrado", "pois esses conteúdos aparecem nas vagas analisadas.")
}

analisaVagas(vagas, candidato)