let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
 
// GATO
let imagenGato = new Image();
imagenGato.src = "GATO.png";
let gatox = 0;
let gatoy = 0;
const ANCHOGATO = 50;
const ALTURAGATO = 50;
 
// COMIDA
let imagenComida = new Image();
imagenComida.src = "COMIDA.png";
let comidax = 50;
let comiday = 50;
const ANCHOCOMIDA = 30;
const ALTURACOMIDA = 30;
 
// PUNTAJE Y TIEMPO
let puntaje = 0;
let tiempo = 15;
let tiempoV = 15;
let temporizador = null;
 
// FUNCION PRINCIPAL PARA GRAFICAR
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}
 
// FUNCION PARA GRAFICAR GATO
function graficarGato() {
    ctx.drawImage(imagenGato, gatox, gatoy, ANCHOGATO, ALTURAGATO);
}
 
// FUNCION PARA GRAFICAR COMIDA
function graficarComida() {
    ctx.drawImage(imagenComida, comidax, comiday, ANCHOCOMIDA, ALTURACOMIDA);
}
 
// FUNCION INICIAR JUEGO
function iniciarJuego() {
    // GATO AL CENTRO DEL CANVAS
    gatox = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoy = (canvas.height / 2) - (ALTURAGATO / 2);
 
    // COMIDA ESQUINA INFERIOR DERECHA
    comidax = canvas.width - ANCHOCOMIDA;
    comiday = canvas.height - ALTURACOMIDA;
 
    graficarGato();
    graficarComida();
}
 
// LIMPIAR EL CANVAS
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
 
// LIMITES DE MOVIMIENTO DEL GATO
const LIMITE_X = canvas.width - ANCHOGATO;
const LIMITE_Y = canvas.height - ALTURAGATO;
 
// MOVIMIENTOS
function moverIzquierda() {
    if (gatox > 0) {
        gatox -= 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}
 
function moverDerecha() {
    if (gatox < LIMITE_X) {
        gatox += 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}
 
function moverArriba() {
    if (gatoy > 0) {
        gatoy -= 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}
 
function moverAbajo() {
    if (gatoy < LIMITE_Y) {
        gatoy += 10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}
 
// BOTONES DE DIRECCION
document.getElementById("btnArriba").onclick = () => moverArriba();
document.getElementById("btnAbajo").onclick = () => moverAbajo();
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick = () => moverDerecha();
 
// DETECTAR COLISION GATO - COMIDA
function detectarColision() {
    if (gatox < comidax + ANCHOCOMIDA &&
        gatox + ANCHOGATO > comidax &&
        gatoy < comiday + ALTURACOMIDA &&
        gatoy + ALTURAGATO > comiday) {
        comidax = generarAleatorio(0, canvas.width - ANCHOCOMIDA);
        comiday = generarAleatorio(0, canvas.height - ALTURACOMIDA);
        puntaje++;
        mostrarEnSpan("puntos", puntaje);
        tiempoV --;
        tiempo = tiempoV;
    }
}
 
// TEMPORIZADOR
function restarTiempo() {
    temporizador = setInterval(function () {
        tiempo--;
        mostrarEnSpan('tiempo', tiempo);
 
        if (tiempo <= 0) {
            alert("Game Over!");
            clearInterval(temporizador);
        }
        if (puntaje >= 6) {
            alert("¡Ganaste!");
            clearInterval(temporizador);
        }
    }, 1000);
}
 
// ARRANCA EL TEMPORIZADOR AL CARGAR LA PAGINA
if (!(tiempo <= 0)) {
    restarTiempo();
}
 
// REINICIAR JUEGO
function reiniciar() {
    clearInterval(temporizador);
    puntaje = 0;
    tiempo = 15;
    mostrarEnSpan('puntos', puntaje);
    mostrarEnSpan('tiempo', tiempo);
    limpiarCanva();
 
    restarTiempo();
    iniciarJuego();
}