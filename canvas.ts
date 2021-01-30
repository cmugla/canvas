const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

/**
 * Objects:
 * Rectangulars
 * line
 * archs
 * bexier curves
 * images
 * text
 */

/**
 * Rectangles
 */
// // style
// c.fillStyle = "rgba(255, 0, 0, 0.1)";
// // draw rectangle
// c.fillRect(100, 100, 100, 100);
// // style
// c.fillStyle = "rgba(255, 0, 0, 0.2)";
// // draw
// c.fillRect(200, 100, 100, 100);
// // style
// c.fillStyle = "rgba(255, 0, 0, 0.3)";
// // draw
// c.fillRect(300, 100, 100, 100);

/**
 * Lines
 */
// // starting point
// c.beginPath();
// c.moveTo(50, 300);

// // create line
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

/**
 * Archs / Circles
 */
// // separate from previous line
// c.beginPath();
// // create outline
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// // style
// c.strokeStyle = "rgba(255, 0, 0, 0.1)";
// // draw
// c.stroke();

// // Create hundreds of circles
// for (let index = 2; index < 100; index++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;

//   c.beginPath();
//   // create outline
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   // style
//   c.strokeStyle = `rgba(255, 0, 0, ${0.01 * index})`;
//   // draw
//   c.stroke();
// }

// // Create hundreds of rectangles
// for (let index = 2; index < 100; index++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;

//   c.fillStyle = `rgba(255, 0, 0, ${0.001 * index})`;
//   // draw rectangle
//   c.fillRect(x, y, 100, 100);
// }

/**
 * Animating Archs / Circles
 */

// let x = 200;
// let y = 200;

// randomize the x,y
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;

// let dx = 5;
// let dy = 5;

// randomize the velocity
// let dx = (Math.random() - 0.5) * 20;
// let dy = (Math.random() - 0.5) * 20;

// const radius = 30;
function animate() {
  // create a loop
  requestAnimationFrame(animate);

  // clear the canvas between the move (only see one circle)
  c.clearRect(0, 0, innerWidth, innerHeight);

  // each time we refresh the page, we increment the position of the circle
  // separate from previous line
  c.beginPath();
  // create outline
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  // style
  c.strokeStyle = "blue";
  // draw
  c.stroke();

  // x++;

  //   // bounce the circle
  //   if (x + radius > innerWidth || x - radius < 0) {
  //     dx = -dx;
  //   }

  //   if (y + radius > innerHeight || y - radius < 0) {
  //     dy = -dy;
  //   }

  //   x += dx;
  //   y += dy;
}

// animate();

const mouse = { x: undefined, y: undefined };
const color = {
  r: 0,
  g: 0,
  b: 255,
};

function Circle({ x, y, dx, dy, radius, index = 1 }) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.index = index;

  this.draw = function () {
    c.beginPath();
    // create outline
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // style
    c.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.001 * index})`;
    // draw
    c.fill();
  };

  this.update = function () {
    // bounce the circle
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // for interactivity
    // get distance between mouse and circle
    const diffX = mouse.x - this.x;
    const diffY = mouse.y - this.y;
    if (diffX < 50 && diffX > -50 && diffY < 50 && diffY > -50) {
      this.radius += 1;
    } else if (this.radius > 10) {
      this.radius -= 1;
    }

    this.draw();
  };
}

const circleArray = [];

// const circle = new Circle({ x: 200, y: 200, dx: 5, dy: 5, radius: 30 });

for (let index = 1; index < 400; index++) {
  let radius = 0.3 * index;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 5;
  let dy = (Math.random() - 0.5) * 5;

  circleArray.push(new Circle({ x, y, dx, dy, radius, index }));
}

function animateCircle() {
  requestAnimationFrame(animateCircle);
  c.clearRect(0, 0, innerWidth, innerHeight);
  circleArray.forEach((circle) => circle.update());
}

animateCircle();

/**
 * INTERACTION
 */

window.addEventListener("mousemove", (event) => {
  // position of mouse
  mouse.x = event.x;
  mouse.y = event.y;

  // distance between circles
});

window.addEventListener("mousedown", () => {
  color.b = 0;
  color.g = 0;
  color.r = 255;
});

window.addEventListener("mouseup", () => {
  color.b = 255;
  color.g = 0;
  color.r = 0;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/**
 * GRAVITY
 */
