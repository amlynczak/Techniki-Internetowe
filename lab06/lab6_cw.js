var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
 
for (var x = 0.5; x < 1000; x += 10) {
  context.moveTo(x, 0);
  context.lineTo(x, 1000);
}
for (var y = 0.5; y < 1000; y += 10) {
  context.moveTo(0, y);
  context.lineTo(1000, y);
}
context.strokeStyle = "#ddd";
context.stroke();

context.beginPath();
context.moveTo(0, 960);
context.lineTo(490, 960);
context.moveTo(510, 960);
context.lineTo(990, 960);
context.moveTo(985, 980);
context.lineTo(990, 960);
context.lineTo(985, 940);
 
context.moveTo(60, 20);
context.lineTo(60, 490);
context.moveTo(60, 510);
context.lineTo(60, 1000);
context.moveTo(65, 25);
context.lineTo(60, 20);
context.lineTo(55, 25);
 
context.strokeStyle = "#00A";
context.stroke();

context.font = "bold 12px sans-serif";
context.fillText("x", 500, 960);
context.fillText("y", 58, 500);
 
context.textBaseline = "top";
context.fillText("( 0 , 0 )", 50, 970);
 
var a = 2;
var b = 3;

context.strokeStyle = '#FOO';
context.lineWidth = 2;


context.beginPath();
for (var x = 0; x <= 1000; x++) {
  var y = a * x + b;
  if (x === 0) {
    context.moveTo(x, 1000 - y);
  } else {
    context.lineTo(x, 1000 - y);
  }
}
context.stroke();

context.fillStyle = "#F00";
context.font = "bold 16px sans-serif";
context.textAlign = "left";
context.fillText("y = " + a + "x + " + b, 20, 20);