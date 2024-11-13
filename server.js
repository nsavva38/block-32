const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/employees", require("./api/employees"));


app.use((req, res, next) => {
  next({ 
    status: 404,
    message: "Enpoint not found."
  })
});

// app.use((req, res, next) => {
//   if(!req.body.name) {
//     next({
//       status: 400,
//       message: "Invalid Name"
//     })

//   }
// })


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong!");
})



app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});


app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});
