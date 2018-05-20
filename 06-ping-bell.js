const five = require('johnny-five');
const dgram = require('dgram');
const board = five.Board();
const server = dgram.createSocket('udp4');

board.on('ready', function () {
  var piezo = new five.Piezo(8);
  server.on('message', (msg, rinfo) => {
    piezo.play({
      song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
      beats: 1 / 4,
      tempo: 100
    });
  });
  
  server.on('error', (err) => {
    console.log(err);
    server.close();
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });

  server.bind(1337);
});
