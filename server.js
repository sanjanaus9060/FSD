const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🚀 1. CONNECT TO MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/engineeringApplications")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// 🚀 2. SCHEMA
const applicationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    dob: String,
    address: String,
    highSchool: String,
    gpa: Number,
    testScore: String,
    testDate: String,
    program: String,
    session: String,
    terms: Boolean
});

// 🚀 3. MODEL
const Application = mongoose.model("Application", applicationSchema);

// 🚀 4. API ROUTE – Save Form Data
app.post("/submit", async (req, res) => {
    try {
        const formData = new Application(req.body);
        await formData.save();
        res.json({ message: "Application submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save application." });
    }
});

// (Optional) Route to view all applications
app.get("/applications", async (req, res) => {
    const data = await Application.find();
    res.json(data);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});