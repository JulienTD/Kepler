import express = require("express");
import { Request, Response} from 'express';
import { validator } from './validator';
const SerialPort = require('serialport');
const portName = process.argv[2]
const myPort = new SerialPort(portName, {baudRate: 9600});
const PORT = process.env.PORT || 3000;
const app = express();

let ready = false;

app.use(validator);

app.listen(PORT, () => {
    console.log("Server Started");
});

app.post('/api/action/:type', (req: Request, res: Response) => {
    const type = req.params.type;
    console.log(`GOT ${type}`);
    if (!ready)
        return res.status(500).send("Not Ready");
    myPort.write(`${type};`);
    res.send("OK");
})

myPort.on('open', () => {
    ready = true;
});

myPort.on('data', (data: Buffer) => {
    console.log(data.toString())
});


