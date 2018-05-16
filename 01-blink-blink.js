const five = require('johnny-five');
const board = five.Board();

board.on('ready', function () {
  var led = new five.Led(13);
  led.strobe(1000);
});
