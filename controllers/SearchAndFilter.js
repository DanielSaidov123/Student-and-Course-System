import {
  readStudents,
  writeStudents,
  readCourses,
  writeCourses,
  getNextId,
} from "../utils/index.js";

export const SearchStudentsByName = async (req, res) => {
  try {
    const name = req.query.name;
    const studentlist = await readStudents();
    const student = studentlist.filter((s) => s.name.includes(name));
    if (student.length===0) {
      return res.status(404).send({ msg: "student is not defind." });
    }
    res.status(200).send({student});
  } catch (err) {
    res.status(500).send(err);
  }
};

export const SearchCursesByName = async (req, res) => {
  try {
    const name = req.query.name;
    const curseslist = await readCourses();
    const curses = curseslist.filter((c) => c.instructor.includes(name));
    if (curses.length===0) {
      return res.status(404).send({ msg: "curses is not defind." });
    }
    res.status(200).send({curses});
  } catch (err) {
    res.status(500).send(err);
  }
};