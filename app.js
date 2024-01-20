let buttonChute = document.querySelector("#chute");
let tentativas = 1;
let buttonReiniciar = document.getElementById("reiniciar");

function exibeTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerText = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.5});
}

function exibirMensagemInicial() {
  exibeTexto("h1", "Jogo do número secreto");
  exibeTexto("p", "Escolha um número entre 1 e 10");
}

function gerarNumero() {
  let listaNumeros = [];
  let limite = 10;
  let numeroEscolhido = parseInt(Math.random() * limite + 1);
  let quantidadeElementos = listaNumeros.length;

  if (quantidadeElementos == limite) {
    listaNumeros = [];
  }

  if (listaNumeros.includes(numeroEscolhido)) {
    return gerarNumero();
  } else {
    listaNumeros.push(numeroEscolhido);
    console.log(listaNumeros);
    return numeroEscolhido;
  }
}

let numero = gerarNumero();

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numero = gerarNumero();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numero) {
    let pTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Parabéns!    Você descobriu o número secreto com ${tentativas} ${pTentativa}!`;
    exibeTexto("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numero) {
      exibeTexto("p", "O número secreto é menor");
    } else {
      exibeTexto("p", "O número secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

buttonChute.onclick = verificarChute;
buttonReiniciar.onclick = reiniciarJogo;

exibirMensagemInicial();
