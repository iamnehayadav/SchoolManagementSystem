import express, { Router, Request } from 'express';
const route: Router = Router();
import { Course, Batch, Lecture, Student, Teacher, StudentBatchMap } from '../db';
import { ICourse, IBatch, ILecture, IStudent, ITeacher, IBatchStudentMap } from '../dbI';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

route.get('/:id', (req, res) => {
    Course.findAll({
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
            })
        })
})

route.get('/:id/batches', (req, res) => {
    console.log("Inside course by id and batches")
    Batch.findAll({
        attributes: ['id', 'name', 'courseId'],
        where: {
            courseId: req.params.id

        }

    }).then((coursebatch) => {
        console.log(coursebatch)
        res.status(200).send(coursebatch)
    })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "could not find course by batch and id"
            })
        })
})

route.get('/:courseid/batches/:batchid', (req, res) => {
    Batch.findAll({
        attributes: ['id', 'name', 'courseId'],
        where: {
            courseId: parseInt(req.params.courseid),
            id: parseInt(req.params.batchid)
        }
    })
        .then((coursebatches) => {
            res.send(coursebatches)
        })
})

route.get('/:courseid/batches/:batchid/lectures', (req, res) => {
    Lecture.findAll({
        attributes: ['id', 'name', 'batchId', 'teacherId'],
        include: [
            {
                model: Batch,
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
            res.send(courses)
        })
})

route.get('/:courseid/batches/:batchid/lectures/:lectureid', (req, res) => {
    Lecture.findAll({
        attributes: ['id', 'name', 'batchId', 'teacherId'],
        include: [
            {
                model: Batch,
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
            res.send(courses)
        })
})

//===========================================================================================
route.get('/:courseid/batches/:batchid/students', (req, res) => {
    StudentBatchMap.findAll({
        where: {
            batchId: req.params.batchid
        },
        attributes: [],
        include: [{
            model: Student,
            attributes: ['id', 'name']
        }, {
            model: Batch,
            where: {
                id: req.params.batchid
            },
            attributes: [],
            include: [{
                model: Course,
                where: {
                    id: req.params.courseid
                },
                attributes: []
            }]
        }]
    })
        .then((students) => {
            res.send(students)
        })
})

//=================================================================================================
route.get('/:courseid/batches/:batchid/teachers', (req, res) => {
    Lecture.findAll({
        where: {
            batchId: req.params.batchid
        },
        attributes: [],
        include: [{
            model: Batch,
            where: {
                id: req.params.batchid
            },
            attributes: [],
            include: [{
                model: Course,
                where: {
                    id: req.params.courseid
                },
                attributes: []
            }]
        }, {
            model: Teacher,
            attributes: ['id', 'name', 'subjectId'],
        }]
    })
        .then((teachers) => {
            res.send(teachers)
        })
})
//==================================================================================

route.get('/', (req, res) => {
    Course.findAll({
        attributes: ['id', 'name']
    })
        .then((courses) => {
            res.status(200).send(courses);
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "Error retrieving courses"
            })
        })
})

route.post('/', (req, res) => {
    Course.create(req.body).then((course) => {
        res.json(course)
    }).catch(() => {
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        })
    })
});

export default route