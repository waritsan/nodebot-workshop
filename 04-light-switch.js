const five = require('johnny-five');
const board = five.Board();

board.on('ready', function () {
  var button = five.Button(5);
  var led = five.Led(9);
  button.on('press', function () {
    led.toggle();
  });
});
