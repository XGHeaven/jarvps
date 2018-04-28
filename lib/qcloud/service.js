"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ora_1 = tslib_1.__importDefault(require("ora"));
const qcloudapi_sdk_1 = tslib_1.__importDefault(require("qcloudapi-sdk"));
const core_1 = require("../core");
const instance_1 = require("./instance");
class QCloudService extends core_1.Service {
    static create(options) {
        return new QCloudService(options.secretId, options.secretKey);
    }
    constructor(secretId, secretKey) {
        super();
        this.api = new qcloudapi_sdk_1.default({
            SecretId: secretId,
            SecretKey: secretKey,
            serviceType: 'cvm',
        });
    }
    request(data, opts, extra) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.api.request(data, opts, (e, body) => {
                    if (e) {
                        return reject(e);
                    }
                    resolve(body);
                }, extra);
            });
        });
    }
    getAllVps() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const spinner = ora_1.default('start fetch vpses from qcloud');
            spinner.start();
            const regions = yield this.getAllRegion();
            const vpsesGroup = [];
            for (const region of regions) {
                spinner.text = `fetch vpses within region ${region.regionName}`;
                vpsesGroup.push(yield this.getVpsWithRegion(region.regionCode));
            }
            const result = [];
            for (const vpses of vpsesGroup) {
                result.push(...vpses);
            }
            spinner.succeed('fetch vpses from qcloud');
            return result;
        });
    }
    getVpsWithRegion(region) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vpses = yield this.request({
                Action: 'DescribeInstances',
                Region: region,
                Version: '2017-03-12',
            });
            if (!vpses.Response.Error) {
                vpses.Response.InstanceSet.forEach((v) => {
                    v.Placement.Region = region;
                });
                return vpses.Response.InstanceSet.map((vps) => new instance_1.QCloudVpsInstance(vps));
            }
            return [];
        });
    }
    getAllRegion() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const region = yield this.request({
                Action: 'DescribeRegions',
                Region: 'gz',
            });
            return region.regionSet;
        });
    }
}
exports.QCloudService = QCloudService;
