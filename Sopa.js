const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");

const sopa = [
['O','N','E','A','B','R','E','O'],
['F','G','H','W','R','I','T','E'],
['T','W','O','E','O','P','D','O'],
['S','T','U','E','W','N','E','E'],
['T','H','R','E','E','E','R','S'],
['D','E','F','G','H','E','J','O'],
['O','P','E','N','L','R','N','L'],
['E','U','L','B','T','G','V','C']
];

let seleccion = [];

// CREAR GRID
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {

        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.dataset.row = i;
        cell.dataset.col = j;

        cell.textContent = sopa[i][j];

        cell.addEventListener("click", toggleCelda);

        grid.appendChild(cell);
    }
}

// TOGGLE SELECCIÓN
function toggleCelda(e) {
    const cell = e.target;

    if (cell.classList.contains("found")) return;

    const fila = cell.dataset.row;
    const col = cell.dataset.col;

    if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
        seleccion = seleccion.filter(x => x.elemento !== cell);
        return;
    }

    cell.classList.add("selected");

    seleccion.push({
        letra: sopa[fila][col],
        elemento: cell
    });

    verificar();
}

// VERIFICAR PALABRA
function verificar() {
    const palabra = seleccion.map(x => x.letra).join("");

    const wordElements = document.querySelectorAll(".word");

    wordElements.forEach(w => {
        if (w.dataset.word === palabra && !w.classList.contains("done")) {

            const color = colorPicker.value;

            alert("🎉 ¡Excelente! Encontraste: " + palabra);

            // marcar sopa
            seleccion.forEach(x => {
                x.elemento.classList.remove("selected");
                x.elemento.classList.add("found");
                x.elemento.style.background = color;
            });

            // marcar lista con ✔
            w.querySelector("span").textContent = "✔";
            w.style.color = color;
            w.classList.add("done");

            seleccion = [];
        }
    });
}