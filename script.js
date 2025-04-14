document.getElementById('sectionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Funcție de conversie: , → .
    const parseInput = val => parseFloat(val.replace(',', '.'));

    const width = parseInput(document.getElementById('width').value);
    const height = parseInput(document.getElementById('height').value);
    const cover = parseInput(document.getElementById('cover').value);
    const stirrupDiameter = parseInput(document.getElementById('stirrupDiameter').value) / 10; // mm -> cm
    const numBars = parseInt(document.getElementById('numBars').value);
    const barDiameters = document.getElementById('barDiameters').value
        .split(',')
        .map(d => parseInput(d.trim()) / 10); // mm -> cm

    if (width > 0 && height > 0 && cover > 0 && stirrupDiameter > 0 && numBars > 0 && barDiameters.length === numBars) {
        drawSection(width, height, cover, stirrupDiameter, numBars, barDiameters);
        document.getElementById('dimensions').textContent =
            `Lățime: ${width} cm, Înălțime: ${height} cm, Acoperire: ${cover} cm, Diametru etrier: ${stirrupDiameter * 10} mm, Număr bare: ${numBars}, Diametre bare: ${barDiameters.map(d => (d * 10).toFixed(1)).join(', ')} mm`;
    } else {
        alert('Verifică toate valorile introduse.');
    }
});

function drawSection(width, height, cover, stirrupDiameter, numBars, barDiameters) {
    const canvas = document.getElementById('sectionCanvas');
    const context = canvas.getContext('2d');
    canvas.width = width * 10;
    canvas.height = height * 10;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Secțiune beton
    context.fillStyle = '#cccccc';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#000';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    // Etrier
    const stirrupX = (cover + stirrupDiameter / 2) * 10;
    const stirrupY = stirrupX;
    const stirrupW = (width - 2 * cover - stirrupDiameter) * 10;
    const stirrupH = (height - 2 * cover - stirrupDiameter) * 10;
    context.lineWidth = stirrupDiameter * 10;
    context.strokeRect(stirrupX, stirrupY, stirrupW, stirrupH);

    // Bare jos, cu poziționare corectă
    const firstRadius = barDiameters[0] / 2;
    const lastRadius = barDiameters[numBars - 1] / 2;
    const x_start = (cover + stirrupDiameter + firstRadius) * 10;
    const x_end = (width - cover - stirrupDiameter - lastRadius) * 10;
    const spacing = numBars > 1 ? (x_end - x_start) / (numBars - 1) : 0;

    context.fillStyle = '#000';
    barDiameters.forEach((diameter, i) => {
        const x = x_start + i * spacing;
        const y = (height - cover - stirrupDiameter - diameter / 2) * 10;
        context.beginPath();
        context.arc(x, y, diameter * 5, 0, 2 * Math.PI);
        context.fill();
    });
}
