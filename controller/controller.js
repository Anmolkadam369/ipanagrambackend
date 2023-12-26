let mongoose = require("mongoose");
const employeeModel = require("../models/employeeModel")
const managerModel = require("../models/managerModel")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const departmentModel = require("../models/departmentModel");



const employeesignup = async function (req, res) {
    try {
        console.log("some", req.body);
        let data = req.body;
        let { firstName, lastName, email, password, department, location } = data;
        
        if (email === "") return res.status(400).send({ status: false, message: `empty email not possible` });
        if (password === "") return res.status(400).send({ status: false, message: `empty password not possible` });
       
        const foundEmail = await employeeModel.findOne({ email: email });
        if (foundEmail) return res.status(400).send({ status: false, message: `email already in use` });
        
        let hashing = bcrypt.hashSync(password, 10);
        data.password = hashing;

        let createdData = await employeeModel.create(data);
        return res.status(201).send({ status: true, data: createdData});
    } catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
}

const employeesignIn = async function (req, res) {
    try {
        console.log("some", req.body);
        let data = req.body;
        let { email, password } = data;
        
        if (email === "") return res.status(400).send({ status: false, message: `empty email not possible buddy` });
        if (password === "") return res.status(400).send({ status: false, message: `empty password not possible buddy` });
        let foundUserName = await employeeModel.findOne({ email: email });
        if (!foundUserName) return res.status(400).send({ status: false, message: `${email} isn't available !!!` });
        console.log(foundUserName, password)
        
        let passwordCompare = await bcrypt.compare(password, foundUserName.password);
        if (!passwordCompare) return res.status(400).send({ status: false, message: "Please enter valid password" })
        
        let token = jwt.sign(
            { userId: foundUserName._id, exp: Math.floor(Date.now() / 1000) + 86400 },
            "project"
          );
      
          let tokenInfo = { userId: foundUserName._id, token: token };
      
          res.setHeader('x-api-key', token)
        return res.status(201).send({ status: true, data: foundUserName, tokenData:tokenInfo });
    } catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
}

const managersignup = async function (req, res) {
    try {
        console.log("some", req.body);
        let data = req.body;
        let { firstName, lastName, email, password, department,location } = data;
        
        if (email === "") return res.status(400).send({ status: false, message: `empty email not possible` });
        if (password === "") return res.status(400).send({ status: false, message: `empty password not possible` });
       
        const foundEmail = await managerModel.findOne({ email: email });
        if (foundEmail) return res.status(400).send({ status: false, message: `email already in use` });
       
        let hashing = bcrypt.hashSync(password, 10);
        data.password = hashing;

        let createdData = await managerModel.create(data);
        return res.status(201).send({ status: true, data: createdData});
    } catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
}

const managersignIn = async function (req, res) {
    try {
        console.log("some", req.body);
        let data = req.body;
        let { email, password } = data;
        
        if (email === "") return res.status(400).send({ status: false, message: `empty email not possible buddy` });
        if (password === "") return res.status(400).send({ status: false, message: `empty password not possible buddy` });
        let foundUserName = await managerModel.findOne({ email: email });
        if (!foundUserName) return res.status(400).send({ status: false, message: `${email} isn't available !!!` });
        console.log(foundUserName, password)
        
        let passwordCompare = await bcrypt.compare(password, foundUserName.password);
        if (!passwordCompare) return res.status(400).send({ status: false, message: "Please enter valid password" })
        

        let token = jwt.sign(
            { userId: foundUserName._id, exp: Math.floor(Date.now() / 1000) + 86400 },
            "project"
          );
      
          let tokenInfo = { userId: foundUserName._id, token: token };
      
          res.setHeader('x-api-key', token)
        return res.status(201).send({ status: true, data: foundUserName, tokenData:tokenInfo });
    } catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
}

const getAllEmployees = async function (req,res){
    try {
        console.log("data")
        let allData = await employeeModel.find({isDeleted:false});
        console.log(allData)
        if(allData.length ==0) return res.status(400).send({status:false, message:"no data found"});
        return res.status(200).send({ status: true, data: allData });
        
    } catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
}

const getEmployee = async function (req, res) {
try {
  console.log("data1");
  let id = req.params.userId;
  let getData = await employeeModel.findOne({_id:id, isDeleted:false});
  if(!getData) return res.status(400).send({status:false, message:"no data found"});
  return res.status(200).send({ status: true, data: getData });

} catch (error) {
  return res.status(500).send({ status: false, message: `error ${error.message}` });
}
}

const getManager = async function (req, res) {
  try {
    console.log("data1");
    let id = req.params.userId;
    let getData = await managerModel.findOne({_id:id, isDeleted:false});
    if(!getData) return res.status(400).send({status:false, message:"no data found"});
    return res.status(200).send({ status: true, data: getData });
  
  } catch (error) {
    return res.status(500).send({ status: false, message: `error ${error.message}` });
  }
  }

const createDepartments =  async (req, res) => {
    try {
        let data = req.body;
        let { name, doneBy } = data;
        let userId = req.params.userId;
        const managerData = await managerModel.findById(userId);
        doneBy = data.doneBy = managerData.firstName;
        const newDepartment =await departmentModel.create(data);
        const departments = await departmentModel.find({isDeleted:false});
       
        return res.status(201).send({ status: true, data: newDepartment, allData : departments});
   
      }catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
  };

  const getDepartments = async (req, res)=>{
    try {
        const departments = await departmentModel.find({isDeleted:false});
        return res.status(201).send({ status: true, allData: departments});

      }catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
  }
  
const updateDepartment= async (req, res) => {
    try {
        let data = req.body;
        let { name, doneBy } = data;
        let id = req.params.departmentId;
        let userData = await managerModel.findById(req.params.userId);
        doneBy = data.doneBy = userData.firstName;
      const updatedDepartment = await departmentModel.findByIdAndUpdate( id, { name:name , doneBy:doneBy},{ new: true });
      if (!updatedDepartment) {
        return res.status(404).json({status:false,  message: 'Department not found' });
      }
       const departments = await departmentModel.find({isDeleted:false});
      return res.status(200).send({ status: true, data: updatedDepartment, allData:departments});

    } catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
  };
  

  const deleteDepartment = async (req, res) => {
    try {
        let id = req.params.departmentId;
      const deletedDepartment = await departmentModel.findByIdAndUpdate(id, {isDeleted:true}, {new:true});
      if (!deletedDepartment) {
        return res.status(404).json({status:false,  message: 'Department not found' });
      }
      const departments = await departmentModel.find({isDeleted:false});
      console.log(departments)
      console.log("---------------------")
      return res.status(200).send({ status: true, message:"the data is deleted", allData:departments});
    }  catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
  };

const updateEmployees = async (req,res)=>{
    try {
        let data = req.body;
        let { firstName, lastName, email, password, department ,location, designation} = data;
        let id = req.params.employeeId;

        if(firstName) {
        firstName = data.firstName= data.firstName.trim();
        if (firstName === "") return res.status(400).send({ status: false, message: `empty firstName not possible` });
        }
        if(lastName) {
            lastName = data.lastName= data.lastName.trim();
            if (lastName === "") return res.status(400).send({ status: false, message: `empty lastName not possible` });
        }
        if(email) {
            email = data.email= data.email.trim();
            if (email === "") return res.status(400).send({ status: false, message: `empty email not possible` });
        }
        if(location) {
            location = data.location= data.location.trim();
            if (location === "") return res.status(400).send({ status: false, message: `empty location not possible` });
        }
        if(designation) {
          designation = data.designation= data.designation.trim();
          if (designation === "") return res.status(400).send({ status: false, message: `empty designation not possible` });
      }
        if(department) {
            department = data.department= data.department.trim();
            if (department === "") return res.status(400).send({ status: false, message: `empty department not possible` });
        }

        const updateEmployees = await employeeModel.findByIdAndUpdate(id, {firstName:firstName, lastName:lastName, email:email, designation:designation,location:location, department:department},{new:true})
        let allData = await employeeModel.find({isDeleted:false});
       
        return res.status(200).send({ status: true, data: updateEmployees, allData:allData});

    } catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
}

const deleteEmployee = async (req,res)=>{
    try {
        let id = req.params.employeeId;
        const deletedEmployee = await employeeModel.findByIdAndUpdate(id, {isDeleted:true}, {new:true});
        if (!deletedEmployee) {
            return res.status(404).json({status:false,  message: 'Department not found' });
          }
          let allData = await employeeModel.find({isDeleted:false});
          return res.status(200).send({ status: true, message:"the data is deleted", allData:allData});
    } catch (error) {
        return res.status(500).send({ status: false, message: `error ${error.message}` })
    }
}


const sortedByLocation = async (req, res) => {
  try {
    const employees = await employeeModel.find().collation({ locale: 'en', strength: 1 }).sort({ location: 1 });
    console.log(employees);

    const sortedEmployees = [
      ...employees.filter((employee) => employee.location.startsWith('A')),
      ...employees.filter((employee) => !employee.location.startsWith('A')),
    ];

    return res.status(200).send({ status: true, data: sortedEmployees });
  } catch (error) {
    return res.status(500).send({ status: false, message: `Error: ${error.message}` });
  }
};

  
  const sortedByName = async (req, res)=>{
    try {
        const filter = req.body.filter; 
       let sortOption = {}; 
       console.log(typeof filter)
        if (filter === 1)  sortOption = { firstName: 1 };
        if (filter === -1)  sortOption = { firstName: -1 };
        const employees = await employeeModel.find().collation({ locale: 'en', strength: 1 }).sort(sortOption);
        return res.status(200).send({ status: true, data:employees});
      } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: `error ${error.message}` })
      }
  }


module.exports={employeesignup, employeesignIn, managersignup, getAllEmployees,getEmployee, getManager,
    managersignIn, createDepartments, getDepartments, updateDepartment,
    deleteDepartment, updateEmployees, deleteEmployee, sortedByLocation, sortedByName}