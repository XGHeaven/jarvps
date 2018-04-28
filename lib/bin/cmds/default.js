"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.command = '*';
exports.describe = 'enter jump server';
exports.handler = (argv) => {
    utils_1.doActionForJarVps(argv, 'jumpServer');
};
