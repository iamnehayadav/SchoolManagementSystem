"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
route.get('/:id', (req, res) => {
    db_1.Teacher.findAll({
        attributes: ['id', 'name', 'subjectId'],
        where: {
            id: req.params.id
        }
    })
        .then((teachers) => {
        res.status(200).send(teachers);
    })
        .catch((error) => {
        res.status(501).send({
            success: false,
            message: "No matching id found !!"
        });
    });
});
//=================================================================================================
route.get('/:id/batches', (req, res) => {
    db_1.Lecture.findAll({
        attributes: [],
        include: [{
                model: db_1.Teacher,
                attributes: [],
                where: {
                    id: req.params.id
                }
            }, {
                model: db_1.Batch,
                attributes: ['id', 'name', 'courseId'],
            }]
    }).then((coursebatch) => {
        console.log(coursebatch);
        res.status(200).send(coursebatch);
    })
        .catch((err) => {
        res.status(501).send({
            success: false,
            message: "could not find batch by teacher id !!"
        });
    });
});
//==================================================================================================
route.get('/', (req, res) => {
    db_1.Teacher.findAll({
        attributes: ['id', 'name', 'subjectId']
    })
        .then((teachers) => {
        res.status(200).send(teachers);
    })
        .catch((err) => {
        res.status(501).send({
            success: false,
            message: "Error retrieving courses"
        });
    });
});
route.post('/', (req, res) => {
    db_1.Teacher.create({
        name: req.body.name,
        id: req.body.id,
        subjectId: req.body.subjectId
    }).then((teacher) => {
        res.json(teacher);
    }).catch(() => {
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        });
    });
});
exports.default = route;
