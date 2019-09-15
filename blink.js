// onoff package allows one to interface with GPIO
const onoff = require('onoff');

const Gpio = onoff.Gpio;
// LED connected to GPIO4
const led = new Gpio(4, 'out');
let interval;

// interval will alternate LED setting (0, 1) every 2 seconds
interval = setInterval(() => {
  let value = (led.readSync() + 1) %2;
  led.write(value, () => {
    console.log(`Changed LED state to: ${value}`);
  });
}, 2000);

// on CRTL + C
process.on('SIGINT', () => {
  clearInterval(interval);
  led.writeSync(0); //set LED to 0
  led.unexport();
  console.log('Peace out...');
  process.exit();
})
