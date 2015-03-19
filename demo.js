var run = function() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.arc(150, 150, 5, 0, Math.PI * 2);

  ctx.arc(200, 200, 5, 0, Math.PI * 2);

  ctx.fill();
}
