'user strict';
// test lib for now, must change to actual lib
const SerialPort = require('serialport/test');

// test port for now, must change to actual port
const portPath = 'COM_TEST';
const MockBinding = SerialPort.Binding;

// creates the mock binding, set behaviour to emulate an Arduino echo device
MockBinding.createPort(portPath, { echo: true, record: false });

// open the serial port
const serialPort = new SerialPort(portPath);
serialPort.on('open', () => {
  console.log('Port opened:\t', serialPort.path);
});

// writes data to the mock port; the port echoes data back and can be received by the server
const sendRandomNumber = () => {
  let x = 0;
  const intervalId = setInterval(() => {
    x++;
    x > 500 ? clearInterval(intervalId) : null;
    const random = Math.floor(Math.random() * 10);
    const message = Buffer.from(`random number: ${random}`);
    serialPort.write(message, () => console.log('Wrote random number.'));
  }, 10);
};

// destroys the serial port; not sure if this is required
MockBinding.reset();
