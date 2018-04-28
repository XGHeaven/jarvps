"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const commandModule = {
    command: 'rm',
    describe: 'Remove account',
    handler: argv => {
        utils_1.doActionForJarVps(argv, 'removeAccount');
    },
};
exports.default = commandModule;
