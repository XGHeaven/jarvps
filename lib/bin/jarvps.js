"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const os = tslib_1.__importStar(require("os"));
const path = tslib_1.__importStar(require("path"));
const yargs = tslib_1.__importStar(require("yargs"));
const utils_1 = require("./utils");
function start() {
    yargs
        .command('a', 'sss')
        .commandDir('cmds', utils_1.CommandDirOptions)
        .option('config', {
        default: path.join(os.homedir(), '.jarvps.yaml'),
        describe: 'config path',
    })
        .alias('h', 'help')
        .alias('v', 'version')
        .help()
        .parse();
}
exports.start = start;
if (require.main === module) {
    start();
}
