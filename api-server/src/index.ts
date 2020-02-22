import express = require("express");
import { validator } from './validator';
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline()

const portName = process.argv[2]

const myPort = new SerialPort(portName, {baudRate: 9600});
myPort.pipe(parser);
const PORT = process.env.PORT || 3000;
const app = express();

app.use(validator);

app.listen(PORT, () => {
    console.log("Server Started");
});

myPort.on('open', () => {
    myPort.write('l');
    myPort.write('e');
    myPort.write('f');
    myPort.write('t');
});

parser.on('data', (data: Buffer) => {
    console.log(data.toString())
	myPort.write('l');
    myPort.write('e');
    myPort.write('f');
    myPort.write('t');
});


