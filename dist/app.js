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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const seed_js_1 = require("./dev/seed.js");
const index_js_1 = require("./startUp/index.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const dbName = process.env.DB_NAME;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, seed_js_1.createBook)();
(0, index_js_1.startUp)(app);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`mongodb://localhost/${dbName}`);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    console.log('mongoDB connected');
}));
