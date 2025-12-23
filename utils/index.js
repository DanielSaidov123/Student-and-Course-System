import fs from 'fs/promises'



export async function readFromFile(fileName) {
  try {
    const data = await fs.readFile(fileName, "utf8");
    const arr = JSON.parse(data);
    return arr
  } catch (err) {
    console.error("Error reading from file:", err);
    return null;
  }
}


export async function writeToFile(fileName, data) {
  try {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2), "utf8");
    console.log("File written successfully");
  } catch (err) {
    console.error("Error writeing from file:", err);
  }
}

export const getNextId = (todos) => {
  if (!todos || todos.length === 0) {
    return 1;
  }
  let maxValue = 0;
  todos.forEach((todo) => {
    if (todo.id > maxValue) {
      maxValue = todo.id;
    }
  });
  return maxValue + 1;
};

export  async function readStudents() { 
    return await readFromFile('data/students.json')
 }


export  async function  writeStudents(data) { 
    return await writeToFile('data/students.json',data)
}


export  async function readCourses() { 
    return await readFromFile('data/courses.json')
 }


export  async function  writeCourses(data) { 
    return await writeToFile('data/courses.json',data)
}


