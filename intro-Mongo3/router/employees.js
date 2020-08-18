const express = require("express");
const router = express.Router();

/*
const EmployeesData = require("../module/employeesModule");

this line will communicate with the schema in the module folder:

employeesModule.js:
const employeesDataSchema = new mongoose.Schema({

 */
const EmployeesData = require("../module/employeesModule");
/* 

                                             ***    1 ROUTE  ***



*/
// create the routes
// where you are going to grab everything from the data base

// (1) route
// Type the following in postman:   localhost:3000/employees
/* BECAUSE there is a lot of errors of any kind, you have to add a 
try and catch with a ASYNC AWAIT in parallel to be safe 
*/
//   res.send("Hi 1 route");
// -----------
//      GET
// -----------
router.get("/", async (req, res) => {
  try {
    const employees = await EmployeesData.find();

    // if you dont have any criteria inside the parentheses, it means grab it all.    find()
    // if you dont pass any  status like so res.status(200), and instead you do it like so: res.  ,
    // it will be by default status of 200
    res.status(200).json(employees);
  } catch {
    //   because there s no data entry mistake due to user or modification, it means that theres an internal error
    // and because of that, you have to show a error 500
    res.status(500).json({ message: err.message });
  }
});
/* 

                                             ***    2 ROUTE  ***



*/

// add new employee
// 2) route
// Type the following in postman:   localhost:3000/employees
//
// -----------
//      POST
// -----------
router.post("/", async (req, res) => {
  /* create a new employee up on my new schema, where i will pass the object with name, age, add,
     whatever you want to have in that schema to create a new row */
  //
  const employee = new EmployeesData({
    name: req.body.name,
    age: req.body.age,
    add: req.body.add,
    // add for address
  });
  //  ---------
  //  add a try and catch in case an error occur
  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
    // 201 means successful
  } catch (err) {
    // anything that has to deal with an error from the user side, is an error 400
    res.status(400).json({
      message: err.message,
    });
  }
});

// GET  http://localhost:3000/employees/ -->  get all employees
// POST http://localhost:3000/employees/ -->  add employee
// GET http://localhost:3000/employees/:name -->  get employee by name
// PATCH http://localhost:3000/employees/:name -->  update specific details... employee by name
// UPDATE aka PUT http://localhost:3000/employees/:name -->  update employee by name
// DELETE http://localhost:3000/employees/:name -->  delete employee by name

// middleware
async function getEmployee(req, res, next) {
  let employee;
  try {
    /*
      //employee = await EmployeesData.findById(req.params.id);

       instead of the name that you type in the localhost,
       to find an employees name, here you find it with an ID, don't forget to change it in line 119:

      */
    // employee = await EmployeesData.find({ name: req.params.name });

    employee = await EmployeesData.findOne({ name: req.params.name });
    if (employee == null)
      //because its just one thing happening, you can avoid the curly brackets in the IF
      return res.status(404).json({ message: "employee NOT Found" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
  console.log(employee);
  //res.employee = employee[0];
  //   to solve the array problem:   res.employee = employee[0];
  res.employee = employee;
  next();
}

// -----------
//      GET
// -----------
// Get one employee
//  url localhost:3000/employee/Faraon
//    "_id": "5f3ab94158c3fe2993d19b8f",  when you search by ID
// router.get("/:id", getEmployee, (req, res) => {
router.get("/:name", getEmployee, (req, res) => {
  // router.get("/:name", getEmployee, (req, res) => {
  res.status(200).json(res.employee);
});
// ------------------------
// Update one
// ------------------------
router.patch("/:name", getEmployee, (req, res) => {});

// ------------------------
//  Delete
// ------------------------
router.delete("/:name", getEmployee, async (req, res) => {
  try {
    await res.employee.remove();
    res.status(200).json({ message: "Employee Deleted" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;
