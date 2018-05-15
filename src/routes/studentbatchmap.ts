import express, {Router, Request} from 'express';
const route: Router = Router();
import {StudentBatchMap} from '../db';

route.get('/', (req, res) => res.send("Inside subject.ts/js"))

route.post('/', (req, res) => {
    StudentBatchMap.create(req.body).then((studentbatchmaps)=>{
        res.json(studentbatchmaps)
    }).catch(()=>{
        res.status(501).send({
            success: false,
            message: "Error in creating data"
        })
    })
})



export default route