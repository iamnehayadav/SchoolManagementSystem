import express, {Router, Request} from 'express';
const route: Router = Router();
import {Student,Batch,StudentBatchMap} from '../db';

route.get('/:id',(req,res)=>{
    Student.findAll({
        attributes : ['id','name'],
        where : {
            id : req.params.id
        }
    })
    .then((students)=>{
        res.status(200).send(students);
    })
    .catch((error)=>{
        res.status(501).send({
            success : false,
            message : "No matching id found !!"
        })
    })
})

//=======================================================================================
route.get('/:id/batches', (req, res) => {
    StudentBatchMap.findAll({
        attributes: [],
        include : [{
            model : Student,
            attributes : [],
            where :{
                id : req.params.id
            }
        },{
            model : Batch,
            attributes : ['id','name','courseId'],
        }]
    }).then((studentbatch) => {
        console.log(studentbatch)
        res.status(200).send(studentbatch)
    })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "could not find batch by student id !!"
            })
        })
})

//=======================================================================================
route.get('/', (req, res) => {
    Student.findAll({
        attributes : ['id','name']
    })
        .then((students) => {
            res.status(200).send(students);
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message : "Error retrieving courses"
            })
        })
})

route.post('/', (req, res) => {
    Student.create(req.body).then((student)=>{
        res.json(student)
    }).catch(()=>{
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        })
    })
});

export default route