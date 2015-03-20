var PARTICLE_SIZE = 10;  // In pixels

var c;
var ctx;

var draw_particles = function() {
  var size = PARTICLE_SIZE / 2;

  // Clear the canvas
  ctx.clearRect(0, 0, 400, 400);

  sph.particles.forEach(function(particle) {
    var x = particle.position.re * PARTICLE_SIZE;
    var y = particle.position.im * PARTICLE_SIZE;

    if (particle.wall)
      ctx.fillStyle = "brown";
    else
      ctx.fillStyle = "blue";

    ctx.beginPath();
    ctx.arc(x + size, y + size, size, 0, Math.PI * 2);
    ctx.fill();
  })

  window.requestAnimationFrame(draw_particles);
};

var run = function() {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  c.addEventListener("mousedown", function(e) {
    var x = Math.floor((e.x - e.target.offsetLeft) / PARTICLE_SIZE);
    var y = Math.floor((e.y - e.target.offsetTop) / PARTICLE_SIZE);

    if (e.which == 1) {
      // Left click
      sph.add_particle(x, y);
    } else if (e.which == 2) {
      // Middle click
      sph.add_wall(x, y);
    } else if (e.which == 3) {
      // Right click
      sph.remove_particle(x, y);
    }
  });

  c.addEventListener("contextmenu", function(e) {
    // Right click
    e.preventDefault();
    e.stopPropagation();
  });

  window.requestAnimationFrame(draw_particles);
};
