import express = require("express");
import { validator } from './validator';
import { SerialPort } from 'serialport'

const portName = process.argv[2]

const myPort = new SerialPort(portName, {baudRate: 9600});
const PORT = process.env.PORT || 3000;
const app = express();

app.use(validator);

app.listen(PORT, () => {
    console.log("Server Started");
});

myPort.on('open', console.log);
myPort.on('data', console.log);


