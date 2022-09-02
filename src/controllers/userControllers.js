const userModel = require("../models/userModel")
//const roleModel = require("../models/roleModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validation = require("../utils/userValidations")


const createUser = async (req, res) => {
    try {
        let data = req.body      //data receiving from the request body
        
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Error: "Input Data is Missing" }) 

        //create password to hash password
        const salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(data.password, salt)

        //we are creating the document using userModel
        let savedData = await userModel.create(data)
        delete savedData._doc.__v
        if (!savedData) return res.status(404).send({ status: false, Error: "Failed to Create user Model" }) 
        res.status(201).send({status: true, content:{data: savedData} })   //sending the data in the respond body
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}


const siginUser = async (req, res) => {
    try{
        let data = req.body;
        console.log(data)
        const {email, password} = data

        //check data is present or not
        if(Object.keys(data).length == 0) return res.status(400).send({status: false, message: "Email and Password is required for login"})

        //check email or password is present in body or not
        if(!data.email) return res.status(400).send({status: false, message: "Email field is empty"})
        if(!data.password) return res.status(400).send({status: false, message: "Password field is empty"})

        //check email is corrrect or not
        let getEmailData = await userModel.findOne({email})
        if(!getEmailData) return res.status(400).send({status: false, message: "Email is incorrect"})

        //check password is correct or not
        let passwordData = await bcrypt.compare(password, getEmailData.password)
        if(!passwordData) return res.status(400).send({status: false, message: "Password is incorrect"})

        //generate token
        let token = jwt.sign({ userId: getEmailData._id, roleId: getEmailData.roleId }, "Tif-Assignment", {expiresIn: '1d'});

        //assign the userdId in a variable
        let userData = getEmailData._doc;
        delete userData.__v;

        res.status(200).send({status: false, content:{data:userData,token}})
        
    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

let allUser = async (req, res) => {
    try {
        let data = req.query;

        //finding the document in collection
        let myUsers = await userModel.find(data).select({password:0, __v:0})  
        res.status(200).send({ status: true, content:{data: myUsers} })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message });

    }
}

const getUserById = async (req, res) => {
    try {
      let userId = req.params.id
      
      if(!userId) return res.status(400).send({status: false,message: "Enter a user id" }) 

      let getUser = await userModel.findById(userId).select({password:0, __v: 0})
      if (!getUser) return res.status(404).send({status: false,message: "No user found"})
  
      res.status(200).send({ status: true, content:{data: getUser}})
    } catch (err) {
      return res.status(500).send({status: false,Error: err.message})
    }
  
  }

module.exports = {createUser, siginUser, allUser, getUserById};