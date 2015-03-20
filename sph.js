var sph = {
  gravity: 1,
  pressure: 4,
  viscosity: 8,

  particles: [],

  add_particle: function(x, y) {
    this.particles.push({
      position: math.complex(x, y),
      wall: false,
      density: math.complex(0, 0),
      force: math.complex(0, 0),
      velocity: math.complex(0, 0),
    });
  },

  add_wall: function(x, y) {
    this.particles.push({
      position: math.complex(x, y),
      wall: true,
    });
  },

  remove_particle: function(x, y) {
    this.particles.forEach(function(particle, index, particles) {
      if (particle.position.re == x && particle.position.im == y) {
        particles.splice(index, 1);
      }
    });
  },

  move: function() {
    // TODO
  },
};
