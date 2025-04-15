document.addEventListener('DOMContentLoaded', () => {
  const concreteClassSelect = document.getElementById('concreteClass');
  const fckInput = document.getElementById('fck');
  const sectionForm = document.getElementById('sectionForm');

  // Definirea valorilor pentru fck
  const concreteClasses = {
    'C12/15': 12,
    'C16/20': 16
  };

  // Schimbarea valorii fck pe baza clasei betonului selectate
  concreteClassSelect.addEventListener('change', () => {
    const selectedClass = concreteClassSelect.value;
    if (concreteClasses[selectedClass]) {
      fckInput.value = `${concreteClasses[selectedClass]} N/mm²`;
    } else {
      fckInput.value = '';
    }
  });

  // Funcția pentru a desena secțiunea betonului
  sectionForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const cover = parseFloat(document.getElementById('cover').value);
    const stirrupDiameter = parseFloat(document.getElementById('stirrupDiameter').value) / 10; // Convert mm to cm
    const numBars = parseInt(document.getElementById('numBars').value);
    const barDiameters = document.getElementById('barDiameters').value.split(',').map(d => parseFloat(d) / 10); // Convert mm to cm

    if (width > 0 && height > 0 && cover > 0 && stirrupDiameter > 0 && numBars > 0 && barDiameters.length === numBars) {
      drawSection(width, height, cover, stirrupDiameter, numBars, barDiameters);
    } else {
      alert('Please enter valid dimensions.');
    }
  });

  // Funcția pentru function drawSection(width, height, cover, stirrupDiameter, numBars, barDiameters) {
  const canvas = document.getElementById('sectionCanvas');
  const context = canvas.getContext('2d');
  canvas.width = width * 10; // pixels
  canvas.height = height * 10;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Desenează betonul
  context.fillStyle = '#cccccc';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#000000';
  context.strokeRect(0, 0, canvas.width, canvas.height);

  // Desenează etrierul
  const stirrupOffset = cover + stirrupDiameter / 2;
  const stirrupWidth = (width - 2 * stirrupOffset) * 10;
  const stirrupHeight = (height - 2 * stirrupOffset) * 10;
  context.lineWidth = stirrupDiameter * 10;
  context.strokeRect(stirrupOffset * 10, stirrupOffset * 10, stirrupWidth, stirrupHeight);

  // Poziționare bare jos (pe lățime, simetric între etrieri)
  context.fillStyle = '#000000';

  const firstBarOffset = cover + stirrupDiameter + barDiameters[0] / 2;
  const lastBarOffset = cover + stirrupDiameter + barDiameters[numBars - 1] / 2;
  const totalSpacingLength = width - firstBarOffset - lastBarOffset;
  const barSpacing = numBars > 1 ? (totalSpacingLength - (barDiameters[0] / 2 + barDiameters[numBars - 1] / 2)) / (numBars - 1) : 0;

  for (let i = 0; i < numBars; i++) {
    const diameter = barDiameters[i];
    const x = (firstBarOffset + i * barSpacing) * 10;
    const y = (height - cover - stirrupDiameter - diameter / 2) * 10;
    context.beginPath();
    context.arc(x, y, diameter * 5, 0, 2 * Math.PI);
    context.fill();
  }
}
