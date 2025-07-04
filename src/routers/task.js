const express = require("express");
const Task = require("../models/tasks");

const router = express.Router();

router.post('/tasks', async (req, res) => {

    const task = new Task(req.body);

    try{

        await task.save();
        res.send(task);
    }catch(e){

         res.status(400).send(e)
    }

});

router.get('/tasks', async (req, res) => {

    try{

        const tasks = await Task.find({});
        res.send(tasks); 

    }catch(e){
        res.status(500).send(e)
    }
   
});

router.get('/tasks/:id', async (req, res) => {

    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(400).send();
        }
        res.send(task);

    }catch(e){
        res.status(500).send('error', e)
    }
});

router.patch("/tasks/:id", async (req, res) => {

    const allowedUpdates = ['description', 'completed'];

    const updates = Object.keys(req.body);

    const validateUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!validateUpdate){
        return res.status(400).send("Invalid Update");
    }

    try{

       const task = await Task.findById(req.params.id);
       
       updates.forEach((update) => {
        task[update] = req.body[update];
       });

       await task.save();
       
    //  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidate: true});

     if(!task){
        return res.status(404).send("Task not found");
     }

     res.send(task);
    }catch(e){
        res.status(400).send(e);
    }

});

router.delete('/tasks/:id', async (req, res) => {
    try{

        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).send("Task not found");
        }

        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});


module.exports = router;