const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const MONGO_URL = 'mongodb://127.0.0.1:27017/SolveLog';

//Middlewares
app.use(cors());          //cross origin resource sharing
app.use(express.json());          //converts json string to js object 
app.use(express.urlencoded({extended:true}));        //parses data from url 

//MODEL
const Problem = require('./models/problem');

//DATABASE
mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log('MongoDB connection error:', err));

//ROUTES
app.get('/', (req,res) => {
    res.send('Hello World!');
})

//fetch details
app.get('/getproblem/:id', async(req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if(!problem) return res.status(404).json({ message: 'Problem not found'});
        res.status(200).json(problem);
    } catch(error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({message: 'Server error', error:error.message});
    }
})

//create 
app.post('/problemform', async(req,res) => {
    try{
        const newProblem = new Problem(req.body);
        const savedProblem = await newProblem.save();

        res.status(201).json({message: 'Saved', id:savedProblem._id});
    } catch(error) {
        console.error('Database error:', error);
        res.status(500).json({error:error.message});
    }
})

//delete
app.delete('/deleteproblem/:id', async(req,res) => {
    try {
        const deleteProblem = await Problem.findByIdAndDelete(req.params.id);
        if(!deleteProblem) return res.status(404).json({message: 'Problem not found'});
        res.status(200).json({message: 'Problem deleted successfully'});
    } catch(error) {
        console.error('Error deleting problem:', error);
        res.status(500).json({message: 'Server error', error:error.message});
    }
})

//edit/update
app.patch('/updateproblem/:id', async(req,res) =>{
    try{
        const updateProblem = await Problem.findByIdAndUpdate(req.params.id, req.body, {returnDocument:'after', runValidators:true});
        if(!updateProblem) return res.status(404).json({message: 'Problem not found'});
        res.status(200).json({message:'Edited successfully'});
    } catch(error){
        console.error('Error updating problem', error);
        res.status(500).json({message:'Server error', error:error.message});
    }
})

//Start
app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
});