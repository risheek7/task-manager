const express = require('express');
const User = require("../models/users");

const router = new express.Router();



router.post('/users', async (req, res)=> {

    const user = new User(req.body);

    try{

        await user.save();

        const token = await user.generateAuthToken();
            
            res.send({user, token});

    }catch(e){
        res.status(400).send(e)
    }

});


router.get('/users', async (req, res) => {

    try{
        const users = await User.find({});
         res.send(users);

    }catch(e){
        res.status(500).send(e)
    }


});

router.get('/users/:id', async (req, res) => {

    try{

        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send("User not found");
        }
        
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }


})


router.patch('/users/:id', async (req, res) => {
    const allowedUpdates = ["name", "age", "email", "password"];

    const updates = Object.keys(req.body);

    const validateUpdate = updates.every((update) => allowedUpdates.includes(update));
    
    if(!validateUpdate){
        return res.send("Invalid Update");
    }

    try{

        const _id = req.params.id;

        const user = await User.findById(_id);

        updates.forEach((update) => user[update] = req.body[update]);

         await user.save()

        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});

        if(!user){
            return res.status(404).send("Id not found");
        }

        res.send(user);

    }catch(e){
        res.status(400).send(e);
    }
});


router.delete('/users/:id', async (req, res) => {

    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).send("User not found");
        }

        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }

});


router.post('/users/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){  
        res.status(400).send(e);
    }
})


module.exports = router;