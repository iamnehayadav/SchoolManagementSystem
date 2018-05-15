"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/:id', (req, res) => {
    db_1.Student.findAll({
        attributes: ['id', 'name'],
        where: {
            id: req.params.id
        }
    })
        .then((students) => {
        res.status(200).send(students);
    })
        .catch((error) => {
        res.status(501).send({
            success: false,
            message: "No matching id found !!"
        });
    });
});
//=======================================================================================
route.get('/:id/batches', (req, res) => {
    db_1.StudentBatchMap.findAll({
        attributes: [],
        include: [{
                model: db_1.Student,
                attributes: [],
                where: {
                    id: req.params.id
                }
            }, {
                model: db_1.Batch,
                attributes: ['id', 'name', 'courseId'],
            }]
    }).then((studentbatch) => {
        console.log(studentbatch);
        res.status(200).send(studentbatch);
    })
        .catch((err) => {
        res.status(501).send({
            success: false,
            message: "could not find batch by student id !!"
        });
    });
});
//=======================================================================================
route.get('/', (req, res) => {
    db_1.Student.findAll({
        attributes: ['id', 'name']
    })
        .then((students) => {
        res.status(200).send(students);
    })
        .catch((err) => {
        res.status(501).send({
            success: false,
            message: "Error retrieving courses"
        });
    });
});
route.post('/', (req, res) => {
    db_1.Student.create(req.body).then((student) => {
        res.json(student);
    }).catch(() => {
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        });
    });
});
exports.default = route;
