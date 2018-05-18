const five = require('johnny-five');
const board = five.Board();

board.on('ready', function () {
  var servo = new five.Servo(9);
  servo.sweep();
  board.wait(3000, function () {
    servo.stop();
    servo.center();
  });
});
