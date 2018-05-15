"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/:id', (req, res) => {
    db_1.Lecture.findAll({
        attributes: ['id', 'name', 'batchId', 'teacherId'],
        where: {
            id: req.params.id
        }
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    })
        .catch((error) => {
        res.status(501).send({
            success: false,
            message: "No matching id found !!"
        });
    });
});
route.get('/', (req, res) => {
    db_1.Lecture.findAll({
        attributes: ['id', 'name', 'batchId', 'teacherId']
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    })
        .catch((err) => {
        res.status(501).send({
            success: false,
            message: "Error retrieving courses"
        });
    });
});
route.post('/', (req, res) => {
    db_1.Lecture.create(req.body).then((lecture) => {
        res.json(lecture);
    }).catch(() => {
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        });
    });
});
exports.default = route;
