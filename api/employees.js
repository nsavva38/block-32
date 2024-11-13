const express = require("express");
const router = express.Router();


const employees = require("../data/employees");

router.post("/", (req, res, next) => {

  if(!req.body.name) {
    next({
      status: 400,
      message: "Invalid Name"
    })
  } 
  const newID = (employees.length) + 1;
  const newEmployee = {
    "id": newID,
    "name": req.body.name
  };
  
  employees.push(newEmployee);
  
  res.status(201).json(newEmployee);
});




router.get("/", (req, res) => {
  res.json(employees);
});





router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});




router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});


module.exports = router;