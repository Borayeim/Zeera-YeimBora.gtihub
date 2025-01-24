const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const particles = [];

// Firework Class
class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = canvas.height;
    this.targetY = y;
    this.speed = 5;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.exploded = false;
  }

  update() {
    if (this.y > this.targetY && !this.exploded) {
      this.y -= this.speed;
    } else {
      this.explode();
      this.exploded = true;
    }
  }

  explode() {
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

// Particle Class
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 4 + 1;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.gravity = 0.05;
    this.alpha = 1;
    this.decay = 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.alpha -= this.decay;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Animation Loop
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    fireworks.push(new Firework(x, y));
  }

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.exploded) fireworks.splice(index, 1);
  });

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.alpha <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

animate();
