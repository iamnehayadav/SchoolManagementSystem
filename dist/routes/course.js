"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const db_1 = require("../db");
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
route.get('/:id', (req, res) => {
    db_1.Course.findAll({
        attributes: ['id', 'name'],
        where: {
            id: req.params.id
        }
    })
        .then((courses) => {
        res.status(200).send(courses);
    })
        .catch((error) => {
        res.status(501).send({
            success: false,
            message: "No matching id found !!"
        });
    });
});
route.get('/:id/batches', (req, res) => {
    console.log("Inside course by id and batches");
    db_1.Batch.findAll({
        attributes: ['id', 'name', 'courseId'],
        where: {
            courseId: req.params.id
        }
    }).then((coursebatch) => {
        console.log(coursebatch);
        res.status(200).send(coursebatch);
    })
        .catch((err) => {
        res.status(501).send({
            success: false,
            message: "could not find course by batch and id"
        });
    });
});
route.get('/:courseid/batches/:batchid', (req, res) => {
    db_1.Batch.findAll({
        attributes: ['id', 'name', 'courseId'],
        where: {
            courseId: parseInt(req.params.courseid),
            id: parseInt(req.params.batchid)
        }
    })
        .then((coursebatches) => {
        res.send(coursebatches);
    });
});
route.get('/:courseid/batches/:batchid/lectures', (req, res) => {
    db_1.Lecture.findAll({
        attributes: ['id', 'name', 'batchId', 'teacherId'],
        include: [
            {
                model: db_1.Batch,
                attributes: [],
                where: {
                    courseId: parseInt(req.params.courseid)
                }
            }
        ],
        where: {
            batchId: parseInt(req.params.batchid)
        }
    })
        .then((courses) => {
        res.send(courses);
    });
});
route.get('/:courseid/batches/:batchid/lectures/:lectureid', (req, res) => {
    db_1.Lecture.findAll({
        attributes: ['id', 'name', 'batchId', 'teacherId'],
        include: [
            {
                model: db_1.Batch,
                attributes: [],
                where: {
                    courseId: parseInt(req.params.courseid)
                }
            }
        ],
        where: {
            batchId: parseInt(req.params.batchid),
            id: parseInt(req.params.lectureid)
        }
    })
        .then((courses) => {
        res.send(courses);
    });
});
//===========================================================================================
route.get('/:courseid/batches/:batchid/students', (req, res) => {
    db_1.StudentBatchMap.findAll({
        where: {
            batchId: req.params.batchid
        },
        attributes: [],
        include: [{
                model: db_1.Student,
                attributes: ['id', 'name']
            }, {
                model: db_1.Batch,
                where: {
                    id: req.params.batchid
                },
                attributes: [],
                include: [{
                        model: db_1.Course,
                        where: {
                            id: req.params.courseid
                        },
                        attributes: []
                    }]
            }]
    })
        .then((students) => {
        res.send(students);
    });
});
//=================================================================================================
route.get('/:courseid/batches/:batchid/teachers', (req, res) => {
    db_1.Lecture.findAll({
        where: {
            batchId: req.params.batchid
        },
        attributes: [],
        include: [{
                model: db_1.Batch,
                where: {
                    id: req.params.batchid
                },
                attributes: [],
                include: [{
                        model: db_1.Course,
                        where: {
                            id: req.params.courseid
                        },
                        attributes: []
                    }]
            }, {
                model: db_1.Teacher,
                attributes: ['id', 'name', 'subjectId'],
            }]
    })
        .then((teachers) => {
        res.send(teachers);
    });
});
//==================================================================================
route.get('/', (req, res) => {
    db_1.Course.findAll({
        attributes: ['id', 'name']
    })
        .then((courses) => {
        res.status(200).send(courses);
    })
        .catch((err) => {
        res.status(501).send({
            success: false,
            message: "Error retrieving courses"
        });
    });
});
route.post('/', (req, res) => {
    db_1.Course.create(req.body).then((course) => {
        res.json(course);
    }).catch(() => {
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        });
    });
});
exports.default = route;
