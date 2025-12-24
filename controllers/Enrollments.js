import {
  readStudents,
  writeStudents,
  readCourses,
  writeCourses,
  getNextId,
} from "../utils/index.js";

export const AddingCourseToStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const curseslist = await readCourses();
    const studentlist = await readStudents();
    const curses = curseslist.find((c) => c.id == courseId);
    if (!curses) {
      return res.status(404).send({ msg: "curses is not defind." });
    }
    const student = studentlist.find((s) => s.id == studentId);
    if (!student) {
      return res.status(404).send({ msg: "student is not defind." });
    }
    for (let i = 0; i < student.enrolledCourses.length; i++) {
      if (student.enrolledCourses[i] === curses.id) {
        return res
          .status(404)
          .send({ msg: "Already registered for this course" });
      }
    }
    student.enrolledCourses.push(curses.id);
    writeStudents(studentlist);
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const RemoveStudentFromCourse = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const curseslist = await readCourses();
    const studentlist = await readStudents();
    const curses = curseslist.find((c) => c.id == courseId);
    if (!curses) {
      return res.status(404).send({ msg: "curses is not defind." });
    }
    const student = studentlist.find((s) => s.id == studentId);
    if (!student) {
      return res.status(404).send({ msg: "student is not defind." });
    }
    for (let i = 0; i < student.enrolledCourses.length; i++) {
      if (student.enrolledCourses[i] === curses.id) {
        student.enrolledCourses.splice(i,1)
        writeStudents(studentlist);
        res.status(200).send(student);
      }
    }
     return res
        .status(404)
        .send({ msg: "He is not registered for this course." });
  } catch (err) {
    res.status(500).send({ err });
  }
};

