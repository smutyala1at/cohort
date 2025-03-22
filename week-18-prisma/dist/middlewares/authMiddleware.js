"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const custom_errors_1 = require("../errors/custom.errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new custom_errors_1.AuthenticationError("Token not provided");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.exp <= Math.floor(Date.now() / 1000)) {
            throw new custom_errors_1.AuthenticationError("Token expired");
        }
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        if (error instanceof custom_errors_1.AuthenticationError) {
            res.status(401).json({
                message: error.message
            });
            return;
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({
                message: "Invalid token"
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
};
exports.authMiddleware = authMiddleware;
