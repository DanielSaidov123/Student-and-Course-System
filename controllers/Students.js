import {
  readStudents,
  writeStudents,
  readCourses,
  writeCourses,
  getNextId,
} from "../utils/index.js";

export const GetStudens = async (req, res) => {
  try {
    res.status(200).send(await readStudents());
  } catch (err) {
    res.status(500).send(err);
  }
};

export const GetStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const studentlist = await readStudents();
    const student = studentlist.find((s) => s.id == id);
    if (!student) {
      return res.status(404).send({ msg: "student is not defind." });
    }
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const CreateStudent = async (req, res) => {
  try {
    const studentlist = await readStudents();
    const newStudent = {
      id: getNextId(studentlist),
      name: req.body.name,
      email: req.body.email,
      enrolledCourses: req.body.enrolledCourses || [],
    };
    studentlist.push(newStudent);
    await writeStudents(studentlist);
    res.status(200).send(newStudent);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const updatingSstudent = async (req, res) => {
  try {
    const id = req.params.id;
    const studentlist = await readStudents();
    
    const student = studentlist.find((s) => s.id == id);
    if (!student) {
      return res.status(404).send({ msg: "student is not defind." });
    }
    if (req.body.name) {
      student.name = req.body.name;
    }
    if (req.body.email) {
      student.email = req.body.email;
    }
    if (req.body.enrolledCourses) {
      student.enrolledCourses = req.body.enrolledCourses;
    }
    await writeStudents(studentlist);
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const DelStudent=async (req, res) => {
  try {
    const id = req.params.id;
    const studentlist = await readStudents();
    const student = studentlist.find((s) => s.id == id);
    if (!student) {
      return res.status(404).send({ msg: "student is not defind." });
    }
    const index=studentlist.findIndex((s) => s.id == id)
    studentlist.splice(index,1)
    await writeStudents(studentlist);
    res.status(200).send( {});
  } catch (err) {
    res.status(500).send(err);
  }
};
