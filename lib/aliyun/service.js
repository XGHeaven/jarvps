"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pop_core_1 = tslib_1.__importDefault(require("@alicloud/pop-core"));
const ora_1 = tslib_1.__importDefault(require("ora"));
const service_1 = require("../core/service");
const instance_1 = require("./instance");
class AliyunService extends service_1.Service {
    static create(options) {
        return new AliyunService(options.accessKey, options.accessSecret);
    }
    constructor(accessKey, accessSecret) {
        super();
        this.client = new pop_core_1.default({
            accessKeyId: accessKey,
            apiVersion: '2014-05-26',
            endpoint: 'http://ecs.aliyuncs.com',
            secretAccessKey: accessSecret,
        });
    }
    getAllVps() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const spinner = ora_1.default('fetch vpses from aliyun');
            spinner.start();
            const regions = yield this.getAllRegion();
            const vpsesGroup = [];
            for (const region of regions) {
                spinner.text = `fetch vpses within ${region.LocalName}`;
                vpsesGroup.push(yield this.getVpsWithRegion(region.RegionId));
            }
            spinner.succeed('fetch vpses from aliyun');
            return [].concat(...vpsesGroup.map((vpses) => vpses.map((vps) => new instance_1.AliyunVpsInstance(vps))));
        });
    }
    getVpsWithRegion(region) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vpses = yield this.client.request('DescribeInstances', {
                RegionId: region,
            }, {});
            return vpses.Instances.Instance;
        });
    }
    getAllRegion() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const region = yield this.client.request('DescribeRegions', {}, {});
            return region.Regions.Region;
        });
    }
}
exports.AliyunService = AliyunService;
