import express, {Router, Request} from 'express';
const route: Router = Router();
import {Lecture} from '../db';

route.get('/:id',(req,res)=>{
    Lecture.findAll({
        attributes : ['id','name','batchId','teacherId'],
        where : {
            id : req.params.id
        }
    })
    .then((lectures)=>{
        res.status(200).send(lectures);
    })
    .catch((error)=>{
        res.status(501).send({
            success : false,
            message : "No matching id found !!"
        })
    })
})

route.get('/', (req, res) => {
    Lecture.findAll({
        attributes : ['id','name','batchId','teacherId']
    })
        .then((lectures) => {
            res.status(200).send(lectures);
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message : "Error retrieving courses"
            })
        })
})

route.post('/', (req, res) => {
    Lecture.create(req.body).then((lecture)=>{
        res.json(lecture)
    }).catch(()=>{
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        })
    })
});

export default route