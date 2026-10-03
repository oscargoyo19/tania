const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width;
let height;

let flores = [];
let particulas = [];

function ajustarCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

ajustarCanvas();

window.addEventListener("resize", () => {

    ajustarCanvas();

    crearFlores();

});


/* =========================
   CREAR FLORES
   ========================= */

function crearFlores() {

    flores = [];

    const cantidad =
        Math.min(18, Math.max(7, Math.floor(width / 80)));

    for (let i = 0; i < cantidad; i++) {

        flores.push({

            x: Math.random() * width,

            y: height + Math.random() * 200,

            tamaño: 25 + Math.random() * 25,

            velocidad: 0.4 + Math.random() * 0.8,

            balanceo: Math.random() * Math.PI * 2,

            profundidad: Math.random()

        });

    }

}

crearFlores();


/* =========================
   DIBUJAR PÉTALO
   ========================= */

function petalo(x, y, radio, angulo) {

    ctx.save();

    ctx.translate(x, y);

    ctx.rotate(angulo);

    ctx.beginPath();

    ctx.ellipse(
        0,
        -radio * 0.8,
        radio * 0.45,
        radio,
        0,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#FFD92F";

    ctx.fill();

    ctx.restore();

}


/* =========================
   DIBUJAR FLOR
   ========================= */

function dibujarFlor(flor) {

    const { x, y, tamaño } = flor;

    /* Tallo */

    ctx.beginPath();

    ctx.moveTo(x, y);

    ctx.quadraticCurveTo(
        x - 10,
        y + 50,
        x,
        y + 100
    );

    ctx.strokeStyle = "#3d8b40";

    ctx.lineWidth = Math.max(2, tamaño / 10);

    ctx.stroke();


    /* Hojas */

    ctx.beginPath();

    ctx.ellipse(
        x - 12,
        y + 65,
        tamaño * 0.25,
        tamaño * 0.6,
        -0.7,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#4caf50";

    ctx.fill();


    ctx.beginPath();

    ctx.ellipse(
        x + 12,
        y + 80,
        tamaño * 0.25,
        tamaño * 0.6,
        0.7,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* Pétalos */

    const petalos = 10;

    for (let i = 0; i < petalos; i++) {

        const angulo =
            (Math.PI * 2 / petalos) * i;

        petalo(
            x,
            y,
            tamaño,
            angulo
        );

    }


    /* Centro */

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        tamaño * 0.38,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#8D5A00";

    ctx.fill();


    /* Pequeños puntos del centro */

    for (let i = 0; i < 15; i++) {

        const angulo =
            Math.random() * Math.PI * 2;

        const distancia =
            Math.random() * tamaño * 0.25;

        const px =
            x + Math.cos(angulo) * distancia;

        const py =
            y + Math.sin(angulo) * distancia;

        ctx.beginPath();

        ctx.arc(
            px,
            py,
            1.5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#5D3A00";

        ctx.fill();

    }

}


/* =========================
   PARTÍCULAS
   ========================= */

function crearParticulas() {

    particulas = [];

    for (let i = 0; i < 60; i++) {

        particulas.push({

            x: Math.random() * width,

            y: Math.random() * height,

            tamaño: 1 + Math.random() * 3,

            velocidad: 0.2 + Math.random() * 0.6,

            opacidad: Math.random()

        });

    }

}

crearParticulas();


function dibujarParticulas() {

    particulas.forEach(p => {

        p.y -= p.velocidad;

        if (p.y < 0) {
            p.y = height;
        }

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.tamaño,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,180,${p.opacidad})`;

        ctx.fill();

    });

}


/* =========================
   ANIMACIÓN
   ========================= */

function animar() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    dibujarParticulas();

    flores.forEach(flor => {

        flor.y -= flor.velocidad;

        flor.balanceo += 0.015;

        flor.x +=
            Math.sin(flor.balanceo) * 0.25;

        dibujarFlor(flor);

        /* Cuando la flor sale de la pantalla,
           vuelve a aparecer abajo */

        if (flor.y < -150) {

            flor.y =
                height + Math.random() * 150;

            flor.x =
                Math.random() * width;

        }

    });

    requestAnimationFrame(animar);

}

animar();
