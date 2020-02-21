import express = require("express");
import { validator } from './validator';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(validator);

app.listen(PORT, () => {
    console.log("Server Started");
});