let cartas = document.querySelectorAll('.fiomoria-carta');
let temCartaVirada = false;
let bloqueio = false;
let primeiraCarta, segundaCarta;

function viraCarta() 
{
    if(bloqueio)
        return;

    if(this === primeiraCarta)
        return;

    this.classList.add('flip');

    if(!temCartaVirada) 
    {
       temCartaVirada = true;
       primeiraCarta = this;
       return;
    }

    segundaCarta = this;
    bloqueio = true;

    checar();
}

function checar() 
{
    let par =  primeiraCarta.dataset.framework === segundaCarta.dataset.framework;
    par ? desvira() : volta();
}

function desvira()
{
    primeiraCarta.removeEventListener('click', viraCarta());
    segundaCarta.removeEventListener('click', viraCarta());
    reseta();
}

function volta()
{
    bloqueio = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');
        reseta();
    }, 1000);
}

function reseta() 
{
    [temCartaVirada, bloqueio] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function embaralhar()
{
    cartas.forEach(carta => {
        let posicaoAleatoria = Math.floor(Math.random() * 12);
        carta.style.order = posicaoAleatoria;
    });
})();

cartas.forEach(carta => carta.addEventListener('click', viraCarta));
