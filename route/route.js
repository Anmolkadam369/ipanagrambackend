const express = require('express');
const router = express.Router();
const employeeController = require("../controller/controller");
const auth = require('../middelwares/managerAuth')



router.post("/employeesignup", employeeController.employeesignup);
router.post('/employeesignIn', employeeController.employeesignIn);
router.post("/managersignup", employeeController.managersignup);
router.post('/managersignIn', employeeController.managersignIn);

router.get ('/employees/:userId',auth.authentication, auth.authorization, employeeController.getAllEmployees);
router.get ('/employee/:userId',auth.authentication, auth.authorizationForEmployee, employeeController.getEmployee);
router.get ('/manager/:userId',auth.authentication, auth.authorization, employeeController.getManager);


router.put ('/employee/:userId/:employeeId', employeeController.updateEmployees);
router.delete ('/employee/:userId/:employeeId', employeeController.deleteEmployee);



router.post ('/departments/:userId', auth.authentication, auth.authorization, employeeController.createDepartments);
router.get ('/departments/:userId',auth.authentication, auth.authorization,  employeeController.getDepartments);
router.put ('/departments/:userId/:departmentId',auth.authentication, auth.authorization,  employeeController.updateDepartment);
router.delete ('/departments/:userId/:departmentId', auth.authentication, auth.authorization, employeeController.deleteDepartment);

router.get ('/sortedByLocation/:userId',auth.authentication, auth.authorization, employeeController.sortedByLocation);
router.post ('/sortedByName/:userId',auth.authentication, auth.authorization, employeeController.sortedByName);


router.all("/*", function(req,res){
    res.status(400).send({status:false, message:"invalid http request"});
})

module.exports = router;