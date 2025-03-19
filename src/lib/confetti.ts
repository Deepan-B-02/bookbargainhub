
// Simple confetti animation utility

const confetti = () => {
  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Confetti settings
  const particles: Particle[] = [];
  const particleCount = 150;
  const gravity = 0.5;
  const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', 
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39', 
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
  ];

  // Particle class
  class Particle {
    x: number;
    y: number;
    color: string;
    velocity: { x: number; y: number };
    radius: number;
    tilt: number;
    tiltAngle: number;
    tiltAngleIncrement: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.velocity = {
        x: Math.random() * 6 - 3,
        y: Math.random() * -10 - 5
      };
      this.radius = Math.random() * 4 + 2;
      this.tilt = 0;
      this.tiltAngle = 0;
      this.tiltAngleIncrement = Math.random() * 0.1 + 0.05;
    }

    update() {
      this.tiltAngle += this.tiltAngleIncrement;
      this.tilt = Math.sin(this.tiltAngle) * 15;
      this.velocity.y += gravity;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      
      return this.y < canvas.height;
    }

    draw() {
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.lineWidth = this.radius / 2;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + this.radius / 4, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.radius / 4);
      ctx.stroke();
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(
      Math.random() * canvas.width,
      Math.random() * canvas.height - canvas.height
    ));
  }

  // Animation loop
  let animationFrameId: number;
  
  const render = () => {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let remainingParticles = false;
    
    particles.forEach((p, index) => {
      if (p.update()) {
        remainingParticles = true;
        p.draw();
      }
    });
    
    if (remainingParticles) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      // Clean up when animation is done
      cancelAnimationFrame(animationFrameId);
      document.body.removeChild(canvas);
    }
  };
  
  render();
};

export default confetti;
