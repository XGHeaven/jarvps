"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const commandModule = {
    command: 'add <service>',
    describe: 'Add account',
    handler: argv => {
        switch (argv.service) {
            case 'aliyun':
                const accessKey = argv.accessKey;
                const accessSecret = argv.accessSecret;
                if (!accessKey || !accessSecret) {
                    console.log('Error');
                    return;
                }
                utils_1.doActionForJarVps(argv, 'addAccount', 'aliyun', {
                    accessKey, accessSecret,
                });
                break;
            case 'qcloud':
                const secretId = argv.secretId;
                const secretKey = argv.secretKey;
                if (!secretId || !secretKey) {
                    console.log('Error qcloud');
                    return;
                }
                utils_1.doActionForJarVps(argv, 'addAccount', 'qcloud', {
                    secretId, secretKey,
                });
                break;
            default:
                console.log(`Cannot support ${argv.service} service`);
                return;
        }
    },
};
exports.default = commandModule;
