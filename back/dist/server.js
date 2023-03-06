"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require('dotenv').config();
const backend_port = process.env.BACKEND_PORT;
app.get('/', (req, res) => {
    res.send('hello calculator');
});
app.listen(4000, () => {
    console.log(`calculator backend running at port ${backend_port}`);
});
//# sourceMappingURL=server.js.map