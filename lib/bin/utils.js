"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger = tslib_1.__importStar(require("winston"));
const index_1 = require("../index");
const isTypescriptFile = __filename.endsWith('ts');
exports.CommandDirOptions = {
    extensions: isTypescriptFile ? ['ts', 'js'] : ['js'],
    visit(commandObject) {
        if (commandObject.default) {
            commandObject = commandObject.default;
        }
        if ('command' in commandObject) {
            return commandObject;
        }
        return false;
    },
};
function createJarVps(argv) {
    const configPath = argv.config;
    const options = {
        configPath,
    };
    return new index_1.JarVps(options);
}
exports.createJarVps = createJarVps;
function doActionForJarVps(argv, action, ...args) {
    const jarvps = createJarVps(argv);
    const func = jarvps[action].bind(jarvps);
    return Promise.resolve(func(...args)).catch(logger.error);
}
exports.doActionForJarVps = doActionForJarVps;
