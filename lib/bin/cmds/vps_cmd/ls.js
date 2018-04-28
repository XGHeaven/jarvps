"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const commandModule = {
    command: 'ls',
    describe: 'List All Vpses',
    builder: yargs => yargs
        .alias('s', 'include-ssh-config')
        .describe('include-ssh-config', 'include ssh config')
        .boolean('s'),
    handler: argv => utils_1.doActionForJarVps(argv, 'listVpses', argv.s),
};
exports.default = commandModule;
