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
        student.enrolledCourses.splice(i, 1);
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

export const GetCursesOfStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const curseslist = await readCourses();
    const studentlist = await readStudents();
    const student = studentlist.find((s) => s.id == studentId);
    if (!student) {
      return res.status(404).send({ msg: "student is not defind." });
    }
    const arr = [];
    for (let i = 0; i < student.enrolledCourses.length; i++) {
      for (let j = 0; j < curseslist.length; j++) {
        if (student.enrolledCourses[i] === curseslist[j].id) {
          arr.push(curseslist[j]);
        }
      }
    }
    if (arr.length === 0) {
      return res
        .status(404)
        .send({ msg: "He is not registered for  courses." });
    }
    res.status(200).send({ msg: arr});
  } catch (err) {
    res.status(500).send({ err });
  }
};

export const GetStudentOfCurses = async (req, res) => {
  try {
    const curseid = req.params.courseId;
    const curseslist = await readCourses();
    const studentlist = await readStudents();
    const curse = curseslist.find((c) => c.id == curseid);
    if (!curse) {
      return res.status(404).send({ msg: "curse is not defind." });
    }
   
    const arr = [];
    for (let i = 0; i < studentlist.length; i++) {
      for (let j = 0; j < studentlist[i].enrolledCourses.length; j++) {

        if ( studentlist[i].enrolledCourses[j] === curse.id) {
            console.log(arr);
            
          arr.push(studentlist[i]);
        }
      }
    }
    if (arr.length === 0) {
      return res
        .status(404)
        .send({ msg: "No one is registered for this course." });
    }
    res.status(200).send({ msg: arr});
  } catch (err) {
    res.status(500).send({ err });
  }
};