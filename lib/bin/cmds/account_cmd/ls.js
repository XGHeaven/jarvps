"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const commandModule = {
    command: 'ls',
    describe: 'List Accounts',
    builder: yargs => yargs,
    handler: argv => {
        utils_1.doActionForJarVps(argv, 'listAccount');
    },
};
exports.default = commandModule;
