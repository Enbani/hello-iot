const onoff = require('onoff');
const Gpio = onoff.Gpio;

// initialize pin 17 in input mode, respond to rising and falling interrupt edges
const sensor = new Gpio(17, 'in', 'both');

var exit = (err) => {
  if (err) {
    console.log(`There was an error: ${err}`)
  }
  sensor.unexport();
  console.log('Later!')
  process.exit();
};

sensor.watch((err,  value) => {
  if (err) {
    exit(err);
  }
  console.log(value ? 'detected!' : 'not anymore')
});

process.on('SIGINT', exit);
