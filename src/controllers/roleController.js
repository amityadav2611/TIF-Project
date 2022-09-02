const roleModel = require("../models/roleModel")

const createRole = async (req, res) => {
    try {
        let data = req.body      //data receiving from the request body
        
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Error: "Input Data is Missing" }) 

        //we are creating the document using roleModel
        let savedData = await roleModel.create(data)
        delete savedData._doc.__v
        if (!savedData) return res.status(404).send({ status: false, Error: "Failed to Create Role Model" }) 
        res.status(201).send({status: true, content:{data: savedData} })   //sending the data in the respond body
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}

let getRoles = async (req, res) => {
    try {
        let data = req.query;
        
        //finding the document in collection
        let roles = await roleModel.find(data).select({__v:0})  
        res.status(200).send({ status: true, content:{data: roles} })  //it will send the data to response body
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });

    }
}

module.exports = {createRole, getRoles};

