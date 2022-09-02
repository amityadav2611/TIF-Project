const studentModel = require("../models/studentModel")

const createStudent = async (req, res) => {
    try {
        let data = req.body      //data receiving from the request body
        
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Error: "Input Data is Missing" }) 

        //we are creating the document using studentModel
        let savedData = await studentModel.create(data)
        delete savedData._doc.__v
        if (!savedData) return res.status(404).send({ status: false, Error: "Failed to Create student Model" }) 
        res.status(201).send({status: true, content:{data: savedData} })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

let getStudent = async (req, res) => {
    try {
        let data = req.query;
        
        //finding the document in collection
        let students = await schoolModel.find(data).select({__v:0})  
        res.status(200).send({ status: true, content:{data: students} })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });

    }
}

module.exports = {createStudent, getStudent};