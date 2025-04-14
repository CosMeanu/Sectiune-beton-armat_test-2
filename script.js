document.getElementById('sectionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    drawSection(width, height);
});

function drawSection(width, height) {
    const canvas = document.getElementById('sectionCanvas');
    const context = canvas.getContext('2d');
    canvas.width = width * 10;
    canvas.height = height * 10;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#cccccc';
    context.fillRect(0, 0, canvas.width, canvas.height);
}
