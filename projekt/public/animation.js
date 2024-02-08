const canvas = document.getElementById('solarSystemCanvas');
const ctx = canvas.getContext('2d');
const speedControl = document.getElementById('speedControl');
const sizeControl = document.getElementById('sizeControl');

const maxWidth = window.innerWidth * 0.75;
const maxHeight = window.innerHeight;
canvas.width = maxWidth;
canvas.height = maxHeight;

const sun = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  baseRadius: 25,
  radius: 25,
  color: 'yellow'
};

let planets = [
  { name: 'Merkury', baseRadius: 5, baseDistance: 53, radius: 5, distance: 53, speed: 0.03, color: 'gray', angle: 0 },
  { name: 'Wenus', baseRadius: 7.5, baseDistance: 87, radius: 7.5, distance: 87, speed: 0.02, color: 'orange', angle: 0 },
  { name: 'Ziemia', baseRadius: 10, baseDistance: 120, radius: 10, distance: 120, speed: 0.015, color: 'blue', angle: 0 },
  { name: 'Mars', baseRadius: 9, baseDistance: 160, radius: 9, distance: 160, speed: 0.01, color: 'red', angle: 0 },
  { name: 'Jowisz', baseRadius: 20, baseDistance: 233, radius: 20, distance: 233, speed: 0.005, color: 'brown', angle: 0 },
  { name: 'Saturn', baseRadius: 17.5, baseDistance: 320, radius: 17.5, distance: 320, speed: 0.004, color: 'goldenrod', angle: 0 },
  { name: 'Uran', baseRadius: 15, baseDistance: 400, radius: 15, distance: 400, speed: 0.003, color: 'lightblue', angle: 0 },
  { name: 'Neptun', baseRadius: 12.5, baseDistance: 467, radius: 12.5, distance: 467, speed: 0.002, color: 'darkblue', angle: 0 },
];

function applySize() {
  const newSize = parseFloat(sizeControl.value);
  sun.radius = sun.baseRadius * newSize;
  planets = planets.map(planet => ({
    ...planet,
    radius: planet.baseRadius * newSize,
    distance: planet.baseDistance * newSize
  }));
  draw();

  const animationSpeed = parseFloat(speedControl.value) || 0.1;
  const animationSize = parseFloat(sizeControl.value);

  fetch('http://localhost:9006/updatePreferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      animationSpeed,
      animationSize
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error updating preferences:', error);
  });
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
  ctx.fillStyle = sun.color;
  ctx.fill();
  ctx.closePath();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  planets.forEach(planet => {
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, planet.distance, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  });
  
  planets.forEach(planet => {
    planet.angle += planet.speed * parseFloat(speedControl.value);
    const planetX = sun.x + planet.distance * Math.cos(planet.angle);
    const planetY = sun.y + planet.distance * Math.sin(planet.angle);
    
    ctx.beginPath();
    ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();
    ctx.closePath();
    
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(planet.name, planetX - planet.radius, planetY + planet.radius + 15);
  });
  requestAnimationFrame(draw);
}

speedControl.addEventListener('input', draw);

draw();
