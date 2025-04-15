document.getElementById('betonClass').addEventListener('change', function () {
const betonClass = this.value;
const fckElement = document.getElementById('fckValue');
let fck = '-';

if (betonClass === 'C12/15') {
fck = '12 N/mm²';
} else if (betonClass === 'C16/20') {
fck = '16 N/mm²';
}

fckElement.innerHTML = `f<sub>ck</sub>: ${fck}`;
});

document.getElementById('sectionForm').addEventListener('submit', function (event) {
event.preventDefault();

const width = parseFloat(document.getElementById('width').value);
const height = parseFloat(document.getElementById('height').value);
const cover = parseFloat(document.getElementById('cover').value);
const stirrupDiameter = parseFloat(document.getElementById('stirrupDiameter').value) / 10; // mm -> cm
const numBars = parseInt(document.getElementById('numBars').value);
const barDiameters = document.getElementById('barDiameters').value.split(',').map(d => parseFloat(d.trim()) / 10); // mm -> cm

if (
width > 0 &&
height > 0 &&
cover > 0 &&
stirrupDiameter > 0 &&
numBars > 0 &&
barDiameters.length === numBars &&
barDiameters.every(d => !isNaN(d))
) {
drawSection(width, height, cover, stirrupDiameter, numBars, barDiameters);
document.getElementById('dimensions').textContent =
`Latime: ${width} cm, Înălțime: ${height} cm, Acoperire: ${cover} cm, ` +
`Diametru Etrier: ${stirrupDiameter * 10} mm, Număr Bare: ${numBars}, ` +
`Diametre: ${barDiameters.map(d => (d * 10).toFixed(1)).join(', ')} mm`;
} else {
alert('Te rog introdu valori valide.');
}
});

function drawSection(width, height, cover, stirrupDiameter, numBars, barDiameters) {
const canvas = document.getElementById('sectionCanvas');
const ctx = canvas.getContext('2d');
canvas.width = width * 10;
canvas.height = height * 10;
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Desen beton
ctx.fillStyle = '#cccccc';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#000000';
ctx.strokeRect(0, 0, canvas.width, canvas.height);

// Desen etrier
const etrierX = (cover + stirrupDiameter / 2) * 10;
const etrierY = etrierX;
const etrierW = (width - 2 * cover - stirrupDiameter) * 10;
const etrierH = (height - 2 * cover - stirrupDiameter) * 10;
ctx.lineWidth = stirrupDiameter * 10;
ctx.strokeRect(etrierX, etrierY, etrierW, etrierH);

// Calcul poziționare bare
const xStart = (cover + stirrupDiameter + barDiameters[0] / 2) * 10;
const xEnd = (width - cover - stirrupDiameter - barDiameters[numBars - 1] / 2) * 10;
const spacing = (xEnd - xStart) / (numBars - 1);
const y = (height - cover - stirrupDiameter - barDiameters[0] / 2) * 10;

// Desenare bare
barDiameters.forEach((diameter, i) => {
const x = xStart + i * spacing;
const r = diameter * 5;
ctx.beginPath();
ctx.arc(x, y, r, 0, 2 * Math.PI);
ctx.fillStyle = '#000';
ctx.fill();
});
}
