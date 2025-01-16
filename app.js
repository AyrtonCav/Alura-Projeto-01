var listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function editarTexto(tag, texto){
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.3; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}


function mensagemInicial(){
    editarTexto('h1', 'Jogo do Número Secreto');
    editarTexto('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();


function verificarChute() {
    let chute = document.querySelector ('input').value;
    if (chute == numeroSecreto) {
        editarTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas!' : 'tentativa!';
        let mensagemTentativas = 'Você descoriu o número secreto com (' + tentativas +')' + palavraTentativa;
        editarTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }

    else if(chute > numeroSecreto) {
        editarTexto('p', 'O número secreto é menor.');
        tentativas ++;
        limparCampo();
    }

    else{
        editarTexto('p', 'O número secreto é maior.');
        tentativas ++;
        limparCampo();
    }
}

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let tamanhoDaLista = listaDeNumerosSorteados.length;

    if(tamanhoDaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return numeroAleatorio();
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

