const select = document.querySelector('select[name="game-mode"');
const play = document.querySelector('#joga');
const board = document.querySelector('.fiomoria-game');
const characters = [
    'burro',
    'burroAlazao',
    'dragao',
    'encantado',
    'fada',
    'farquaad',
    'fiona',
    'fionaHumana',
    'gato',
    'rumple',
    'shrek',
    'shrekHumano'
];
const timer = document.querySelector(".timer");
const countDown = [
    90,
    60,
    30,
    5
];
let rec;
let pares;
let first = '';
let second = '';

function novoElemento (tag, classe) 
{
    const el = document.createElement(tag);
    el.className = classe;

    return el;
}

function criaCarta(character) 
{
    const carta = novoElemento('figure', 'fiomoria-carta');
    const frente = novoElemento('figure', 'face frente');
    const verso = novoElemento('figure', 'face verso');

    frente.style.backgroundImage = `url("img/${character}.jpg")`;

    carta.appendChild(frente);
    carta.appendChild(verso);
    carta.setAttribute('data-character', character)

    board.appendChild(carta);

    return carta
}

function endGame(won) {
    if (won) {
        $.ajax({
            url: 'code/record.php',
            method: 'POST',
            data: {
                record: rec
            }
        }).done(result => {
            if (result)
                window.alert('Parabéns, novo record!');
            else
                window.alert('Você ganhou!')
        });
    }
    else {
        cartas = document.querySelectorAll('.fiomoria-carta');
        cartas.forEach(carta => carta.removeEventListener('click', e => flip(e)));
        window.alert('Seu tempo acabou, você perdeu');
    }
}

function close() 
{
    first.removeEventListener('click', e => flip(e));
    second.removeEventListener('click', e => flip(e));
    const firstFrente = first.firstChild;
    const secondFrente = second.firstChild;

    firstFrente.classList.add('disabled');
    secondFrente.classList.add('disabled');

    pares++;

    first = '';
    second = '';

    if(pares == 12)
        endGame(1);
}

function unflip() 
{
    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');

        first = '';
        second = '';
    }, 1000)
}

function checar() 
{
    par = first.getAttribute('data-character') === second.getAttribute('data-character');

    par ? close() : unflip();
}

function flip(evt) 
{
    const target = evt.target;
    const carta = target.parentNode;

    if (carta.className.includes('flip'))
        return;
    if (first === '') {
        first = carta;

        carta.classList.add('flip');
    }
    else if (second === '') {
        second = carta;
        carta.classList.add('flip');

        checar();
    }
}

function embaralhar() 
{
    const cartas = document.querySelectorAll('.fiomoria-carta');

    cartas.forEach(carta => {
        let posicaoAleatoria = Math.floor(Math.random() * 24);
        carta.style.order = posicaoAleatoria;
    });
}

function time(countDown) {

    endGame(0);
}

function load(dificuldade) 
{
    const duplicateCharacters = [...characters, ...characters];
    rec = pares = 0;

    duplicateCharacters.forEach(character => {
        const carta = criaCarta(character);

        carta.addEventListener('click', flip);
    })
    
    embaralhar();

    if (dificuldade === 0)
        timer.innerHTML = "Sem tempo";
    else
        time(countDown[dificuldade - 1]);
}
