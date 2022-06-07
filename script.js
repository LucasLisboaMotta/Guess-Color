const circulosPrincipais = document.getElementsByClassName('circulo-principal');
const paineisSecundarios = document.getElementsByClassName('paineis-secundarios');
const painelResposta = document.getElementsByClassName('painel-resposta');
const circuloFinal = document.getElementsByClassName('circulo-final')
const arrayClasses = ['verde', 'vermelho', 'azul', 'rosa', 'amarelo', 'roxo'];
const respostaFinal = document.getElementById('repostaFinal')
let linhaPreta = 0;
let circuloDaLinhaPreta = 0;

const coresIniciais = () => {
  const retornaCor = [];
  for (let i = 0; i < 4; i += 1) {
    retornaCor.push(arrayClasses[Math.floor(Math.random() * 6)]);
    circuloFinal[i].classList.add(retornaCor[i]);
  }
  console.log(retornaCor);
  return retornaCor;
}

const arrayExemplo = coresIniciais();

const acertou = () => {
  respostaFinal.style.display = 'block';
}

const perdeu = () => {
  respostaFinal.style.display = 'block';
  respostaFinal.children[4].innerText = 'Você perdeu :('
}

const testarResposta = () => {
  const copia = [...arrayExemplo];
  let correto = 0;
  let parcial = 0;


  arrayExemplo.forEach((atual, index) => {
    if(paineisSecundarios[linhaPreta].children[index].classList[1] === atual) {
      correto += 1;
      parcial -= 1;
    }

    if(copia.includes(paineisSecundarios[linhaPreta].children[index].classList[1])) {
      parcial += 1;
      const indexCopia = copia.indexOf(paineisSecundarios[linhaPreta].children[index].classList[1]);
      copia.splice(indexCopia, 1);
    } 
  });
    
    for (let i = 0; i < 4; i += 1) {
      if (correto > i) painelResposta[linhaPreta].children[i].classList.add('verde');
      else if (correto + parcial > i) painelResposta[linhaPreta].children[i].classList.add('amarelo');
      else painelResposta[linhaPreta].children[i].classList.add('vermelho');
    }

    if (correto === 4) acertou();
    else if (linhaPreta === 9) perdeu();
    else linhaPreta += 1;

};

const seleciona = (target) => {
  console.log(target.target.classList[1])
 paineisSecundarios[linhaPreta].children[circuloDaLinhaPreta].classList.add(target.target.classList[1]);
 if (circuloDaLinhaPreta === 3) {
   circuloDaLinhaPreta = 0;
   testarResposta();
 } else {
   circuloDaLinhaPreta += 1;
 }
};


for (let i = 0; i < circulosPrincipais.length; i += 1) {
  circulosPrincipais[i].addEventListener('click', seleciona);
}