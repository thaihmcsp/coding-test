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
exports.categoryValidate = void 0;
const fastest_validator_1 = __importDefault(require("fastest-validator"));
const v = new fastest_validator_1.default();
const categoryValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = {
        Name: { type: "string", min: 3, max: 255 },
    };
    const check = v.compile(schema);
    const result = check(req.body);
    if (result !== true)
        return res.status(400).json({ result });
    next();
});
exports.categoryValidate = categoryValidate;
