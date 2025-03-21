const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Employee Schema
const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

// Routes
app.post("/register", async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const newEmployee = new Employee({ name, email, position });
    await newEmployee.save();
    res.json({ message: "Employee registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
