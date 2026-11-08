class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  calculateAverage() {
    let total = this.grades.reduce(function (sum, grade) {
      return sum + grade;
    }, 0);

    let average = total / this.grades.length;

    return average;
  }

  getGrade(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  getFinalResult(average) {
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "محتاج مراجعه";
    }
  }
}

let studentsList = [];

let studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let id = Number(document.getElementById("studentId").value);
  let name = document.getElementById("studentName").value;
  let attendance = Number(document.getElementById("attendance").value);

  let grade1 = Number(document.getElementById("grade1").value);
  let grade2 = Number(document.getElementById("grade2").value);
  let grade3 = Number(document.getElementById("grade3").value);

  let found = false;

  for (let i = 0; i < studentsList.length; i++) {
    if (studentsList[i].id == id) {
      found = true;
    }
  }

  if (found == true) {
    document.getElementById("message").innerText = "رقم الجلوس موجود قبل كده";
    return;
  }

  if (
    attendance < 0 ||
    attendance > 100 ||
    grade1 < 0 ||
    grade1 > 100 ||
    grade2 < 0 ||
    grade2 > 100 ||
    grade3 < 0 ||
    grade3 > 100
  ) {
    document.getElementById("message").innerText =
      "الدرجات والحضور  من 0 الى 100";
    return;
  }

  let grades = [grade1, grade2, grade3];

  let student = new Student(id, name, grades, attendance);

  studentsList.push(student);

  document.getElementById("message").innerText = "تمت اضافة الطالب";

  studentForm.reset();

  showStudents();
  showMercyStudents();
});

function showStudents() {
  let studentsTable = document.getElementById("studentsTable");

  studentsTable.innerHTML = "";

  for (let i = 0; i < studentsList.length; i++) {
    let student = studentsList[i];

    let average = student.calculateAverage();

    let grade = student.getGrade(average);

    let result = student.getFinalResult(average);

    let row = document.createElement("tr");

    row.innerHTML =
      "<td>" +
      student.id +
      "</td>" +
      "<td>" +
      student.name +
      "</td>" +
      "<td>" +
      average.toFixed(2) +
      "</td>" +
      "<td>" +
      grade +
      "</td>" +
      "<td>" +
      student.attendance +
      "</td>" +
      "<td>" +
      result +
      "</td>";

    studentsTable.appendChild(row);
  }

  document.getElementById("studentsCount").innerText =
    "عدد الطلاب " + studentsList.length;
}

function showMercyStudents() {
  let strugglingStudents = studentsList.filter(function (student) {
    let average = student.calculateAverage();

    return average >= 40 && average <= 49;
  });

  let mercyStudents = strugglingStudents.map(function (student) {
    let oldAverage = student.calculateAverage();

    let newAverage = oldAverage + 5;

    return {
      id: student.id,
      name: student.name,
      oldAverage: oldAverage,
      newAverage: newAverage,
    };
  });

  let totalNewAverages = mercyStudents.reduce(function (sum, student) {
    return sum + student.newAverage;
  }, 0);

  let mercyAverage = 0;

  if (mercyStudents.length > 0) {
    mercyAverage = totalNewAverages / mercyStudents.length;
  }

  let mercyTable = document.getElementById("mercyTable");

  mercyTable.innerHTML = "";

  if (mercyStudents.length == 0) {
    mercyTable.innerHTML = "<tr><td colspan='4'>لا يوجد طلاب متعثرين</td></tr>";
  }

  for (let i = 0; i < mercyStudents.length; i++) {
    let student = mercyStudents[i];

    let row = document.createElement("tr");

    row.innerHTML =
      "<td>" +
      student.id +
      "</td>" +
      "<td>" +
      student.name +
      "</td>" +
      "<td>" +
      student.oldAverage.toFixed(2) +
      "</td>" +
      "<td>" +
      student.newAverage.toFixed(2) +
      "</td>";

    mercyTable.appendChild(row);
  }

  document.getElementById("mercyAverage").innerText =
    "متوسط الرافة " + mercyAverage.toFixed(2);

  console.log("الطلاب المتعثرين");
  console.log(mercyStudents);

  console.log("متوسط الرافة");
  console.log(mercyAverage);
}
