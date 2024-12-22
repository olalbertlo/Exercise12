//引入套件
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
})
const student = mongoose.model("student", studentSchema);

mongoose.connect("mongodb+srv://01257060:DuwIyOxzl23YDZVK@cluster0.8g02p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const db = mongoose.connection;

db.on('err', err => console.log(err));

db.once('open', () => console.log('connected to database'));

router.get("/", async (req, res) => {
    try {
        const Student = await student.find();
        res.json(Student);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post("/", async (req, res) => {
    const Student = new student({
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,
    });
    try {
        const newStudent = await Student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Export 該Router
module.exports = router
