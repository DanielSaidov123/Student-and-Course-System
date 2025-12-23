import express from "express";
import students from "./routes/Students.js"
import courses from "./routes/Courses.js"



const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================== ROUTES ===================
app.get("/", async (req, res) => {
  res.json({
    message: "Welcome to Student and Course System API",
    version: "1.0.0",
  });
});

app.use("/students", students);
app.use("/courses", courses);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});


