var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { $, argv, fs, path } from "zx";
console.log(argv);
var infile = argv.infile, outfile = argv.outfile;
if (!infile) {
    throw new Error("--infile argument missing");
}
var _a = path.parse(infile), base = _a.base, dir = _a.dir, name = _a.name;
console.log(infile, path.parse(infile));
var output = { duration: 0, creationTime: 0 };
$.log = function (entry) {
    var extractDuration = function (message) {
        var regex = /Duration: (\d{2})\:(\d{2})\:(\d{2})\.(\d{2})/gm;
        var matches = regex.exec(String(message));
        if (matches != null) {
            var h = Number(matches[1]);
            var m = Number(matches[2]);
            var s = Number(matches[3]);
            var decis = Number(matches[4]);
            output.duration = (h * 3600 + m * 60 + s) * 1000 + decis + 10;
        }
    };
    var extractCreationTime = function (message) {
        if (message.includes("creation_time")) {
            var creationTimeString = message.split(": ")[1];
            var creationTime = new Date(creationTimeString).getTime();
            if (output.creationTime === 0)
                output.creationTime = creationTime;
            if (output.creationTime !== creationTime) {
                console.log("multiple creation times", creationTime, message);
            }
        }
    };
    switch (entry.kind) {
        case "stdout":
            entry.data
                .toString("utf-8")
                .split(/\r?\n/)
                .forEach(function (line) {
                extractDuration(line);
                extractCreationTime(line);
            });
            break;
    }
};
void (function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $(templateObject_1 || (templateObject_1 = __makeTemplateObject(["docker run --rm -it -v ", ":/video linuxserver/ffmpeg -i /video/", ""], ["docker run --rm -it -v ", ":/video linuxserver/ffmpeg -i /video/", ""])), dir, base)];
                case 1:
                    _a.sent();
                    console.log(output);
                    if (!outfile) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs.writeFile(outfile, JSON.stringify(output))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
})();
var templateObject_1;
