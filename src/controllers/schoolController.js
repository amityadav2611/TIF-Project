const schoolModel = require("../models/schoolModel");
const studentModel = require("../models/studentModel")

const createSchool = async (req, res) => {
    try {
        let data = req.body      //data receiving from the request body
        
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Error: "Input Data is Missing" }) 

        //we are creating the document using schoolModel
        let savedData = await schoolModel.create(data)
        delete savedData._doc.__v
        if (!savedData) return res.status(404).send({ status: false, Error: "Failed to Create School Model" }) 
        res.status(201).send({status: true, content:{data: savedData} })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

let getSchool = async (req, res) => {
    try {
        let data = req.query;

        //finding the document in collection
        let schools = await schoolModel.find(data).select({__v:0})  
        res.status(200).send({ status: true, content:{data: schools} })  //it will send the data to response body
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });

    }
}


const schoolDetails = async (req, res) => {
    try {
        let schoolName = req.query;

        let getSchoolData = await schoolModel.find(schoolName).select({__v:0}).lean();
        if (!getSchoolData) return res.status(404).send({ status: false, message: "College not found! check the name and try again" }); 

        for(let i of getSchoolData){
            let students = await studentModel.find({schoolId: i._id}).select({__v:0})
            i.students = students
            
        }

        res.status(200).send({ status: true, content: {data: getSchoolData} });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = {createSchool, getSchool, schoolDetails};