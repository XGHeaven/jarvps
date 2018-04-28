"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function sshConnect(ip, user = 'root') {
    const child = child_process_1.spawn('ssh', [`${user}@${ip}`], {
        stdio: 'inherit',
    });
    child.on('error', console.error);
    child.on('exit', console.log);
}
exports.sshConnect = sshConnect;
