"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
app.listen(PORT, () => {
    console.log("Server Started");
});
