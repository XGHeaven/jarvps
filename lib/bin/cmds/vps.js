"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.command = 'vps';
exports.describe = 'manage vps';
exports.builder = (yargs) => {
    yargs.commandDir('vps_cmd', utils_1.CommandDirOptions).demandCommand();
};
