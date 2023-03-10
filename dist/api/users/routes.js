"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.get("/", controller_1.default.getAll);
router.get("/:id", controller_1.default.getOne);
router.put("/:id", controller_1.default.update);
router.delete("/:id", controller_1.default.delete_);
exports.default = router;
