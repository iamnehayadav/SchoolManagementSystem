import express, {Router, Request} from 'express';
const route: Router = Router();
import {Teacher,Batch,Lecture} from '../db';

route.get('/:id',(req,res)=>{
    Teacher.findAll({
        attributes : ['id','name','subjectId'],
        where : {
            id : req.params.id
        }
    })
    .then((teachers)=>{
        res.status(200).send(teachers);
    })
    .catch((error)=>{
        res.status(501).send({
            success : false,
            message : "No matching id found !!"
        })
    })
})

//=================================================================================================
route.get('/:id/batches', (req, res) => {
    Lecture.findAll({
        attributes: [],
        include : [{
            model : Teacher,
            attributes : [],
            where :{
                id : req.params.id
            }
        },{
            model : Batch,
            attributes : ['id','name','courseId'],
        }]
    }).then((coursebatch) => {
        console.log(coursebatch)
        res.status(200).send(coursebatch)
    })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "could not find batch by teacher id !!"
            })
        })
})

//==================================================================================================
route.get('/', (req, res) => {
    Teacher.findAll({
        attributes : ['id','name','subjectId']
    })
        .then((teachers) => {
            res.status(200).send(teachers);
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message : "Error retrieving courses"
            })
        })
})

route.post('/', (req, res) => {
    Teacher.create({
        name: req.body.name,
        id : req.body.id,
        subjectId : req.body.subjectId
    }).then((teacher)=>{
        res.json(teacher)
    }).catch(()=>{
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        })
    })
});

export default route