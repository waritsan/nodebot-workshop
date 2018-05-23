const five = require('johnny-five');
const board = new five.Board();

board.on('ready', function () {
  var button = new five.Button(5);
  var led = new five.Led(13);
  var piezo = new five.Piezo(9);
  var temperature = new five.Thermometer({
    controller: 'TMP36',
    pin: 'A0'
  });

  var threshold = 50;
  var isOnFire = false;
  var isReset = false;

  var sirenInterval = null;

  // Sound the alarm
  function panic() {
    if (isOnFire) return;
    isOnFire = true;
    led.strobe(1000);
    piezo.tone(five.Piezo.Notes.c4, 750);
    sirenInterval = setInterval(function () {
      piezo.tone(five.Piezo.Notes.c4, 750);
    }, 1000);
  }

  // Silence the things
  function calm() {
    if (!isOnFire) return;
    isOnFire = false;
    led.stop().off();
    clearInterval(sirenInterval);
    piezo.noTone();
  }

  // The reset button
  button.on('press', function () {
    if (!isOnFire) return;
    isReset = true;
    calm();
  });

  // Watch the temp
  temperature.on('change', function () {
    if (this.celsius > threshold) {
      if (!isReset) {
        panic();
      }
    } else {
      calm();
      isReset = false;
    }
  });
});
