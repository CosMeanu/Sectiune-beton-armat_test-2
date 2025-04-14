document.getElementById('sectionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const cover = parseFloat(document.getElementById('cover').value);
    const stirrupDiameter = parseFloat(document.getElementById('stirrupDiameter').value) / 10; // Convert mm to cm
    const numBars = parseInt(document.getElementById('numBars').value);
    const barDiameters = document.getElementById('barDiameters').value.split(',').map(d => parseFloat(d) / 10); // Convert mm to cm

    if (width > 0 && height > 0 && cover > 0 && stirrupDiameter > 0 && numBars > 0 && barDiameters.length === numBars) {
        drawSection(width, height, cover, stirrupDiameter, numBars, barDiameters);
        document.getElementById('dimensions').textContent = `Width: ${width} cm, Height: ${height} cm, Cover: ${cover} cm, Stirrup Diameter: ${stirrupDiameter * 10} mm, Number of Bars: ${numBars}, Bar Diameters: ${barDiameters.map(d => d * 10).join(', ')} mm`;
    } else {
        alert('Please enter valid dimensions.');
    }
});

function drawSection(width, height, cover, stirrupDiameter, numBars, barDiameters) {
    const canvas = document.getElementById('sectionCanvas');
    const context = canvas.getContext('2d');
    canvas.width = width * 10;
    canvas.height = height * 10;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw concrete section
    context.fillStyle = '#cccccc';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#000000';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw stirrup
    const stirrupWidth = (width - 2 * cover - stirrupDiameter) * 10;
    const stirrupHeight = (height - 2 * cover - stirrupDiameter) * 10;
    context.lineWidth = stirrupDiameter * 10;
    context.strokeRect((cover + stirrupDiameter / 2) * 10, (cover + stirrupDiameter / 2) * 10, stirrupWidth, stirrupHeight);

    // Draw reinforcement bars at the bottom
    const bottomBarSpacing = (width - 2 * cover - 2 *
