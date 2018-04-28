"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const commandModule = {
    command: 'fetch',
    describe: 'Fetch Vps',
    builder: yargs => yargs,
    handler: argv => {
        utils_1.doActionForJarVps(argv, 'refetchVpses');
    },
};
exports.default = commandModule;
