import express, {Router, Request} from 'express';
const route: Router = Router();
import {Batch} from '../db';
var Sequelize = require('sequelize');

route.get('/:id',(req,res)=>{
    Batch.findAll({
        attributes : ['id','name','courseId'],
        where : {
            id : req.params.id
        }
    })
    .then((batches)=>{
        res.status(200).send(batches);
    })
    .catch((error)=>{
        res.status(501).send({
            success : false,
            message : "No matching id found !!"
        })
    })
})

route.get('/', (req, res) => {
    var currentTime = new Date()
    var currentYear = currentTime.getFullYear()
    var currentMonth = currentTime.getMonth() + 1 
    const Op = Sequelize.Op;
    Batch.findAll({
        attributes : ['id','name','courseId','year','startMonth'],
        where : {
            year : currentYear,
            startMonth :{
                [Op.gte] : currentMonth
            }
             
        }
    })
        .then((batches) => {
            res.status(200).send(batches);
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message : "Error retrieving courses"
            })
        })
})

route.post('/', (req, res) => {
    Batch.create(req.body).then((batch)=>{
        res.json(batch)
    }).catch(()=>{
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        })
    })
});

export default route