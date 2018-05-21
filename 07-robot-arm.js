const five = require('johnny-five');
const board = five.Board();

board.on('ready', function () {
  var potentiometer = new five.Sensor('A2');
  var servo = new five.Servo(9);
  potentiometer.on('change', function () {
    var position = five.Fn.map(this.value, 0, 1023, 0, 179);
    servo.to(position);
  });
});
