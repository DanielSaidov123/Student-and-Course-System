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
    if (student.length === 0) {
      return res.status(404).send({ msg: "student is not defind." });
    }
    res.status(200).send({ student });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const SearchCursesByName = async (req, res) => {
  try {
    const name = req.query.name;
    const curseslist = await readCourses();
    const curses = curseslist.filter((c) => c.instructor.includes(name));
    if (curses.length === 0) {
      return res.status(404).send({ msg: "curses is not defind." });
    }
    res.status(200).send({ curses });
  } catch (err) {
    res.status(500).send(err);
  }
};
const validCursesByName = async (req, res) => {
  try {
    const instructor = req.query.instructor;
    const curseslist = await readCourses();
    const curses = curseslist.filter((c) => c.instructor.includes(instructor));
    if (curses.length === 0) {
      return res.status(404).send({ msg: "curses is not defind." });
    }
    res.status(200).send({ curses });
  } catch (err) {
    res.status(500).send(err);
  }
};

const validByCreditRange = async (req, res) => {
  try {
    const minCredits = parseInt(req.query.minCredits);
    const maxCredits = parseInt(req.query.maxCredits);
    if (!Number.isInteger(maxCredits) || !Number.isInteger(minCredits)) {
      return res
        .status(404)
        .send({ msg: "minCredits or maxCredits is not number" });
    }
    const curseslist = await readCourses();
    const curses = curseslist.filter(
      (c) => c.credits > minCredits && c.credits < maxCredits
    );
    if (curses.length === 0) {
      return res.status(404).send({ msg: "curses is not defind." });
    }
    res.status(200).send({ curses });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const FilterCoursesByType = async (req, res) => {
  const instructor = req.query.instructor;
  const minCredits = parseInt(req.query.minCredits);
  const maxCredits = parseInt(req.query.maxCredits);
  console.log(minCredits);
  if (minCredits && maxCredits) validByCreditRange(req, res);
  else if (instructor) validCursesByName(req, res);
};
