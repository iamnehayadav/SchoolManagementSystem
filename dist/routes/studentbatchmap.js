"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/', (req, res) => res.send("Inside subject.ts/js"));
route.post('/', (req, res) => {
    db_1.StudentBatchMap.create(req.body).then((studentbatchmaps) => {
        res.json(studentbatchmaps);
    }).catch(() => {
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        });
    });
});
exports.default = route;
