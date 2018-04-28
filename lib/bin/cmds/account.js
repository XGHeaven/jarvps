"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const commandModule = {
    command: 'account',
    describe: 'manage account',
    builder: yargs => yargs.commandDir('account_cmd', utils_1.CommandDirOptions).demandCommand(),
    handler: argv => argv,
};
exports.default = commandModule;
