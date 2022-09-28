"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUp = void 0;
const indexRoute_1 = __importDefault(require("./indexRoute"));
const initData_1 = require("./initData");
const startUp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.use('/', indexRoute_1.default);
        yield (0, initData_1.defaultCategory)();
    }
    catch (error) {
        console.log(error);
    }
});
exports.startUp = startUp;
