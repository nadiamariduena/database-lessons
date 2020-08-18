const EmployeesData = require("../module/employeesModule");

/*




                                       **    MIDDLEWARE  **



                     The most important function is the middleware,
                     that s because it will help us to get a specific  employee, and 
                     then from there we can proceed farther  . 
                     
                     1_ if we want to DELETE a specific one, this middleware will help me.
                     2_ if we want to UPDATE a specific one, this middleware will help me.
                     3_ if we want to GET a specific one, this middleware will help me.

                    so far this MIDDLEWARE will help me through 3 REQUESTS.

*/

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
      // the "null" means that if the user dont type anything, it will send an error 404
      //because its just one thing happening, you can avoid the curly brackets in the IF
      return res.status(404).json({ message: "employee NOT Found" });
  } catch (err) {
    res.status(500).json({
      // whenever i have an internal error tell the user about it ,with a 500 error.
      message: err.message,
    });
  }
  console.log(employee);
  //res.employee = employee[0];
  //   to solve the array problem:   res.employee = employee[0];
  res.employee = employee;
  next();
}
//
/**
 *
 *
 *
 *
 * export ***
 */
module.exports = { getEmployee };
