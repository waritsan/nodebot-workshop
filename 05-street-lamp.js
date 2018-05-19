const five = require('johnny-five');
const board = five.Board();

board.on('ready', function () {
  var photoresistor = five.Sensor('A0');
  var led = five.Led(9);
  photoresistor.on('change', function () {
    if (this.value > 600) {
      led.on();
    } else {
      led.off();
    }
  });
});
