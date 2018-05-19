const five = require('johnny-five');
const board = five.Board();

board.on('ready', function () {
  var piezo = five.Piezo();
});
