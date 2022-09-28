"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_js_1 = __importDefault(require("./authRoute.js"));
const bookRoute_1 = __importDefault(require("./bookRoute"));
const categoryRoute_1 = __importDefault(require("./categoryRoute"));
const router = (0, express_1.Router)();
router.use('/api/auth', authRoute_js_1.default);
router.use('/api/book', bookRoute_1.default);
router.use('/api/category', categoryRoute_1.default);
exports.default = router;
