const mongoose = require("mongoose");
const employeesDataSchema = new mongoose.Schema({
  // this is one collection
  // here you specify the nature of the data you are introducing, forexample:
  // name is a string therefore type: is a String, age is a number therefore the type is Number,
  // the required: true, means that its required for the user to add  it
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  // add is for address
  add: String,
  employeeAddedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

/*********   1  *************** 
module.exports = mongoose.model(
  "EmployeesData",
  employeesDataSchema,
 
);
-****** CREATE A NEW COLLECTION

if you dont have the 3 line and you just have these 2: "EmployeesData",employeesDataSchema : 
it will create a new collection automatically based in the fusion of the 2.

*************************/

/**********   2  ************** 
module.exports = mongoose.model(
  "EmployeesData",
  employeesDataSchema,
 
);
-****** WILL WORK ON A EXISTING COLLLECTION

if you  have the 3 lines like so: "EmployeesData",employeesDataSchema,"EmployeesData"
it will work on the existing collection you specified in the 3 line "EmployeesData", this is the
one you created in the compass and that is still empty

******/

module.exports = mongoose.model(
  "EmployeesData",
  employeesDataSchema,
  "EmployeesData"
);
