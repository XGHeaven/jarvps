"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const easy_table_1 = tslib_1.__importDefault(require("easy-table"));
const fs_extra_1 = require("fs-extra");
const inquirer_1 = require("inquirer");
const js_yaml_1 = require("js-yaml");
const os = tslib_1.__importStar(require("os"));
const path = tslib_1.__importStar(require("path"));
const ramda_1 = require("ramda");
const ssh_config_1 = tslib_1.__importDefault(require("ssh-config"));
const logger = tslib_1.__importStar(require("winston"));
const aliyun_1 = require("./aliyun");
const qcloud_1 = require("./qcloud");
const ssh_1 = require("./ssh");
const services = new Map();
services.set('aliyun', aliyun_1.AliyunService);
services.set('qcloud', qcloud_1.QCloudService);
function AutoSave(target, key, desc) {
    const func = desc.value;
    function autoSaveHandle(...args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield func.apply(this, args);
            this.save();
            return result;
        });
    }
    desc.value = autoSaveHandle;
    return desc;
}
class JarVps {
    constructor(options) {
        this.options = options;
        this.config = {
            accounts: [],
            vpses: [],
        };
        logger.info('use config file %s', options.configPath);
        if (fs_extra_1.pathExistsSync(this.options.configPath)) {
            const source = fs_extra_1.readFileSync(this.options.configPath, 'utf8');
            const data = js_yaml_1.load(source);
            if (!data) {
                logger.error('Cannot parse config file.');
                logger.error('Location: %s', options.configPath);
                logger.info('Use default config.');
            }
            else {
                this.config = data;
                this.save();
            }
        }
        else {
            this.save();
        }
        // TODO: validate config
    }
    addAccount(service, options) {
        this.config.accounts = this.config.accounts || [];
        this.config.accounts.push(Object.assign({}, options, { service }));
    }
    listAccount() {
        console.log(easy_table_1.default.print(this.config.accounts.map(account => {
            const { service } = account, config = tslib_1.__rest(account, ["service"]);
            return { service, config: JSON.stringify(config) };
        })));
    }
    removeAccount() {
        return inquirer_1.prompt({
            type: 'checkbox',
            name: 'accounts',
            choices: this.config.accounts.map((account, index) => ({
                name: `${account.service}`,
                value: index,
            })),
            message: 'Please chose your account to remove',
        }).then((value) => {
            const accountsId = value.accounts;
            this.config.accounts = this.config.accounts.filter((_, index) => !accountsId.includes(index));
            logger.info(`Please run "${process.argv[0]} vps fetch" to update vps list`);
        });
    }
    refetchVpses() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accounts = this.config.accounts;
            const vpses = [];
            for (const account of accounts) {
                const serviceName = account.service;
                const serviceCreater = services.get(serviceName);
                if (!serviceCreater) {
                    console.log(`Cannot found ${serviceName} service`);
                    continue;
                }
                const service = serviceCreater.create(account);
                vpses.push(...yield service.getAllVps());
            }
            this.config.vpses = vpses;
            return vpses;
        });
    }
    listVpses(includeSshConfig = false) {
        const vpses = this.config.vpses || [];
        const picker = ramda_1.pick(['id', 'service', 'hostname', 'publicIp', 'cpu', 'memory', 'status']);
        const datasource = vpses.map(picker);
        datasource.forEach((data, index) => {
            data.index = index;
        });
        const sshConfigPath = path.join(os.homedir(), '.ssh', 'config');
        console.log('From Service');
        console.log(easy_table_1.default.print(datasource));
        const sshDatesource = [];
        if (includeSshConfig && fs_extra_1.pathExistsSync(sshConfigPath)) {
            const configString = fs_extra_1.readFileSync(sshConfigPath, 'utf8');
            const config = ssh_config_1.default.parse(configString);
            console.log(config);
            for (const item of config) {
                if (item.param.toLowerCase() === 'host' && item.value !== '*') {
                    const ssh = {
                        id: item.value,
                        user: 'root',
                        address: 'unknown',
                    };
                    for (const line of item.config) {
                        switch (line.param.toLowerCase()) {
                            case 'hostname':
                                ssh.address = line.value;
                                break;
                            case 'user':
                                ssh.user = line.user;
                                break;
                        }
                    }
                    sshDatesource.push(ssh);
                }
                else {
                    continue;
                }
            }
            console.log();
            console.log('From SSH config');
            console.log(easy_table_1.default.print(sshDatesource));
        }
    }
    jumpServer() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vpses = this.config.vpses;
            inquirer_1.prompt({
                type: 'list',
                name: 'id',
                choices: vpses.map(vps => ({
                    name: `${vps.hostname ? vps.hostname : '[no hostname]'}(${vps.id}) - ${vps.publicIp} \tfrom: ${vps.service}`,
                    value: vps.id,
                })),
                message: 'Please choice your vps',
            }).then((value) => {
                this.ssh(value.id);
            });
        });
    }
    ssh(indexOrId) {
        let vps;
        const vpses = this.config.vpses;
        if (typeof indexOrId === 'string') {
            vps = vpses.find(v => v.id === indexOrId);
        }
        else {
            vps = vpses[indexOrId];
        }
        if (!vps) {
            return console.log('out of bound');
        }
        ssh_1.sshConnect(vps.publicIp, 'root');
    }
    save() {
        fs_extra_1.writeFileSync(this.options.configPath, js_yaml_1.dump(this.config));
    }
}
tslib_1.__decorate([
    AutoSave
], JarVps.prototype, "addAccount", null);
tslib_1.__decorate([
    AutoSave
], JarVps.prototype, "removeAccount", null);
tslib_1.__decorate([
    AutoSave
], JarVps.prototype, "refetchVpses", null);
exports.JarVps = JarVps;
