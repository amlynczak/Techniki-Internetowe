const addStudentForm = document.querySelector("#addStudentForm");
const updateStudentForm = document.querySelector("#updateStudentForm");
const deleteStudentForm = document.querySelector("#deleteStudentForm");

async function display() {
    const result = await fetch("http://pascal.fis.agh.edu.pl:7009/stud", {
        method: "GET"
    });

    const studentTableBody = document.getElementById("studentTableBody");
    studentTableBody.innerHTML = '';

    const students = await result.json();

    students.forEach(student => {
        const row = document.createElement("tr");

        const firstNameCell = document.createElement("td");
        firstNameCell.textContent = student.fname;
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement("td");
        lastNameCell.textContent = student.lname;
        row.appendChild(lastNameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;
        row.appendChild(emailCell);

        studentTableBody.appendChild(row);
    });
}

addStudentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const info = {};
    info.fname = addStudentForm.elements["fname"].value;
    info.lname = addStudentForm.elements["lname"].value;
    info.email = addStudentForm.elements["email"].value;

    const result = await fetch("http://pascal.fis.agh.edu.pl:7009/stud", {
        method: "POST",
        body: JSON.stringify(info),
        headers: { "Content-type": "application/json" }
    });

    if (result.ok) {
        display();
    } else {
        console.error(`Error: ${result.status} - ${result.statusText}`);
    }
});

updateStudentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const info = {};
    const ID = updateStudentForm.elements["id"].value;
    info.fname = updateStudentForm.elements["fname"].value;
    info.lname = updateStudentForm.elements["lname"].value;
    info.email = updateStudentForm.elements["email"].value;
    console.log(info);

    const result = await fetch(`http://pascal.fis.agh.edu.pl:7009/stud/${ID}`, {
        method: "PUT",
        body: JSON.stringify(info),
        headers: { "Content-type": "application/json" }
    });

    if (result.ok) {
        display();
    } else {
        console.error(`Error: ${result.status} - ${result.statusText}`);
    }
});

deleteStudentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ID = deleteStudentForm.elements["id"].value;

    const result = await fetch(`http://pascal.fis.agh.edu.pl:7009/stud/${ID}`, {
        method: "DELETE"
    });

    if (result.ok) {
        display();
    } else {
        console.error(`Error: ${result.status} - ${result.statusText}`);
    }
});
