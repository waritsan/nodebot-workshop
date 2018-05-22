const five = require('johnny-five');
const board = new five.Board();
const dnode = require('dnode');

board.on('ready', function () {
  var temperature = new five.Thermometer({
    controller: 'TMP36',
    pin: 'A0'
  });
  var celsius;
  temperature.on('data', function () {
    celsius = this.celsius;
  });
  var server = dnode({
    getTemperature : function (callback) {
      callback(celsius)
    }
  });
  server.listen(1337);
});
