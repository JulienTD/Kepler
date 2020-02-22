import express = require("express");
import { validator } from './validator';
const SerialPort = require('serialport')
const portName = process.argv[2]

const myPort = new SerialPort(portName, {baudRate: 9600});
const PORT = process.env.PORT || 3000;
const app = express();

app.use(validator);

app.listen(PORT, () => {
    console.log("Server Started");
});

myPort.on('open', () => {
	myPort.write('left');
});
myPort.on('data', console.log);


