const estrellas = document.getElementById("estrellas");
const particulas = document.getElementById("particulas");

const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// ESTRELLAS DEL FONDO

for (let i = 0; i < 95; i++) {
    const estrella = document.createElement("span");

    estrella.className = "estrella";
    estrella.setAttribute("aria-hidden", "true");

    estrella.style.left = Math.random() * 100 + "%";
    estrella.style.top = Math.random() * 100 + "%";

    const tamano = Math.random() * 2 + 1;

    estrella.style.width = tamano + "px";
    estrella.style.height = tamano + "px";

    estrella.style.animationDelay = Math.random() * 5 + "s";
    estrella.style.animationDuration = (2 + Math.random() * 4) + "s";

    estrellas.appendChild(estrella);
}

// PARTÍCULAS DORADAS

const simbolos = ["✦", "✧", "·", "✦", "✧"];

for (let i = 0; i < 30; i++) {
    const particula = document.createElement("span");

    particula.className = "particula";
    particula.setAttribute("aria-hidden", "true");

    particula.textContent =
        simbolos[Math.floor(Math.random() * simbolos.length)];

    particula.style.left = Math.random() * 100 + "%";
    particula.style.top = Math.random() * 100 + "%";
    particula.style.fontSize = (7 + Math.random() * 13) + "px";
    particula.style.animationDelay = Math.random() * 6 + "s";
    particula.style.animationDuration = (3 + Math.random() * 5) + "s";

    particulas.appendChild(particula);
}

// FLORECITAS ROSAS AL MOVER EL PUNTERO

const coloresRosa = [
    "#ff91c5",
    "#ffb3d5",
    "#f77eb8",
    "#ffc0df",
    "#e987bd"
];

let ultimaPosicion = null;

function crearFlorecita(x, y) {
    if (movimientoReducido) return;

    const flor = document.createElement("div");

    flor.className = "flor-rosa";
    flor.setAttribute("aria-hidden", "true");
    flor.style.left = x + "px";
    flor.style.top = y + "px";

    // Cinco pétalos

    for (let i = 0; i < 5; i++) {
        const petalo = document.createElement("span");

        petalo.className = "petalo-rosa";

        const angulo = i * 72;

        petalo.style.transform =
            "rotate(" + angulo + "deg) translateY(-7px)";

        const color =
            coloresRosa[Math.floor(Math.random() * coloresRosa.length)];

        petalo.style.background =
            "linear-gradient(145deg, #ffe3f0, " + color + ")";

        flor.appendChild(petalo);
    }

    const centro = document.createElement("span");
    centro.className = "centro-rosa";
    flor.appendChild(centro);

    document.body.appendChild(flor);

    // Limitar la cantidad para conservar fluidez

    const floresAntiguas = document.querySelectorAll(".flor-rosa");

    if (floresAntiguas.length > 55) {
        floresAntiguas[0].remove();
    }

    flor.addEventListener("animationend", () => {
        flor.remove();
    }, { once: true });
}

// Mouse, lápiz o dedo

document.addEventListener("pointermove", (evento) => {
    const x = evento.clientX;
    const y = evento.clientY;

    if (!ultimaPosicion) {
        ultimaPosicion = { x, y };
        return;
    }

    const dx = x - ultimaPosicion.x;
    const dy = y - ultimaPosicion.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia >= 16) {
        crearFlorecita(x, y);
        ultimaPosicion = { x, y };
    }
});

document.addEventListener("pointerdown", (evento) => {
    crearFlorecita(evento.clientX, evento.clientY);

    ultimaPosicion = {
        x: evento.clientX,
        y: evento.clientY
    };
});

document.addEventListener("pointerleave", () => {
    ultimaPosicion = null;
});