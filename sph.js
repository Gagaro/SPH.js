var sph = {
  gravity: 1,
  pressure: 4,
  viscosity: 8,

  particles: [],

  add_particle: function(x, y) {
    this.particles.push({
      position: math.complex(x, y),
      wall: false,
      density: 0,
      force: math.complex(0, 0),
      velocity: math.complex(0, 0),
    });
  },

  add_wall: function(x, y) {
    this.particles.push({
      position: math.complex(x, y),
      wall: true,
	  density: 0,
      force: math.complex(0, 0),
      velocity: math.complex(0, 0),
    });
  },

  remove_particle: function(x, y) {
    this.particles.forEach(function(particle, index, particles) {
      if (particle.position.re == x && particle.position.im == y) {
        particles.splice(index, 1);
      }
    });
  },
  
  clear: function() {
	  this.particles = [];
  },
  
  on_neighbours: function(particle, callback) {
	  this.particles.forEach(function(neighbour) {
			// Get distance
			var distance = math.subtract(particle.position, neighbour.position);
			var weight = math.abs(distance) / 2 - 1;
			// Only keep close particles
			if (weight < 1) {
				callback.apply(this, [particle, neighbour, distance, weight]);
			}
		}, this);
  }, 

  move: function() {
    // Calculate density
	this.particles.forEach(function(particle) {
		particle.density = 0;
		if (particle.wall) {
			particle.density = 9;
			return ;
		}
		
		this.on_neighbours(particle, function(particle, neighbour, distance, weight) {
			particle.density += weight * weight;
		});
	}, this);
	
	// Calculate external forces
	this.particles.forEach(function(particle) {
		particle.force = math.complex(0, this.gravity);
		if (particle.wall)
			return ;
		
		this.on_neighbours(particle, function(particle, neighbour, distance, weight) {
			var pressure = math.multiply(distance, (3 - particle.density - neighbour.density) * this.pressure);
			var velocity = math.subtract(math.multiply(particle.velocity, this.viscosity),
										 math.multiply(neighbour.velocity, this.viscosity));
			var force = math.divide(math.multiply(weight, math.add(pressure, velocity)), particle.density);

			particle.force = math.add(particle.force, force);
		});
	}, this);
	
	// Move
	this.particles.forEach(function(particle) {
		if (!particle.wall) {
			console.log(particle);
			particle.velocity = math.add(particle.velocity, math.divide(particle.force, 10));
			particle.position = math.add(particle.position, particle.velocity);
		}
	}, this);
  },
};
