'use strict!';
let patientsPath = {
    startDate: '',
    endDate: '',
    city: '',
    location: ''
};
let patientDetails = {
    id: '',
    path: []
};
let allPatients = [];
let currentPatient = -1; //index of current patient
const dataTable = document.getElementById('dataTable');
const switchPatient = document.getElementById('switchPatient');
const newPatient = document.getElementById('addUser');
const newPath = document.getElementById('addNewRow');

let addNewPatient = function addNewPatientToList(patientID) {
    let newPatientVar = { ...patientDetails };
    newPatientVar.id = patientID.value;
    newPatientVar.path = [];
    allPatients.push(newPatientVar);
    currentPatient = allPatients.length - 1;
};

let addPatient = function addAPatient(patientID) {
    let i = 0;
    for (; i < allPatients.length; i++) {
        if (allPatients[i].id === patientID.value) {
            for (let j = 0; j < allPatients[i].path.length; j++) {
                addPath(allPatients[i].path[j]);
            }
            break;
        }
    }
    currentPatient = i;
    if (i === allPatients.length) {
        addNewPatient(patientID);
    }
    patientID.style.display = 'none';
    document.getElementById('inputedPatientsID').innerText = patientID.value;
};

let deleteInput = function deleteInputItems() {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('city').value = '';
    document.getElementById('location').value = '';

};

let fillCell0 = function fillFirstCell(newCell, patientPath, numOfRows) {
    const string = document.createTextNode(patientPath.startDate);
    newCell.appendChild(string);
};

let fillCell1 = function fillFirstCell(newCell, patientPath, numOfRows) {
    const string = document.createTextNode(patientPath.endDate);
    newCell.appendChild(string);
};

let fillCell2 = function fillFirstCell(newCell, patientPath, numOfRows) {
    const string = document.createTextNode(patientPath.city);
    newCell.appendChild(string);
};

let fillCell3 = function fillFirstCell(newCell, patientPath, numOfRows) {
    const string = document.createTextNode(patientPath.location);
    newCell.appendChild(string);
};

let fillCell4 = function fillFourthCell(newCell, numOfRows) {
    const deleted = document.createElement('button');
    deleted.innerText = 'X';
    deleted.setAttribute("id", numOfRows);
    deleted.setAttribute("class", "deleted");
    newCell.setAttribute("class", "button");
    oldPath(deleted);
    newCell.appendChild(deleted);
};

let fillCell = function (newCell, cellId, numOfRows, patientPath) {
    //button to delete
    if (cellId === 4) {
        fillCell4(newCell, numOfRows);
    }
    else {
        //add start date
        if (cellId === 0) {
            fillCell0(newCell, patientPath, numOfRows);
        }
        //add end date
        else if (cellId === 1) {
            fillCell1(newCell, patientPath, numOfRows);
        }
        //add city
        else if (cellId === 2) {
            fillCell2(newCell, patientPath, numOfRows);
        }
        //addlocation
        else if (cellId === 3) {
            fillCell3(newCell, patientPath, numOfRows);
        }
    }

};

let addCells = function addCellsToRow(newRow, numOfRows, patientPath) {
    for (let i = 0; i < 5; i++) {
        let newCell = newRow.insertCell(i);
        newCell.setAttribute("class", "cell");
        fillCell(newCell, i, numOfRows, patientPath);
    }
};

let addPath = function addAPathToAPatient(patientPath) {
    let numOfRows = dataTable.rows.length;
    if (numOfRows === 0 || dataTable.style.display === "none") {
        dataTable.style.display = 'block';
    }
    let newRow = dataTable.insertRow(numOfRows);
    newRow.setAttribute("class", "row");
    addCells(newRow, numOfRows, patientPath);
};

let addPathObject = function addANewObjectToPatientPathArray() {
    let newPatientsPath = { ...patientsPath };
    newPatientsPath.startDate = document.getElementById('startDate').value;
    newPatientsPath.endDate = document.getElementById('endDate').value;
    newPatientsPath.city = document.getElementById('city').value;
    newPatientsPath.location = document.getElementById('location').value;
    allPatients[currentPatient].path.push(newPatientsPath);
    return newPatientsPath;
};

let removePath = function removeApathFromAPatient(rowID) {
    let removedRow = dataTable.deleteRow(rowID);
    allPatients[currentPatient].path.splice(rowID, 1);
};

let oldPath = function setsClickForDeleteButton(deleted) {
    deleted.addEventListener('click', function () {
        removePath(deleted.id);
    });
};

let removeDataTable = function removeDataTableFromDisplay() {
    let max = dataTable.rows.length;
    for (let i = 0; i < max; i++) {
        dataTable.deleteRow(0);
    }
};

newPatient.addEventListener('click', function () {
    let patientID = document.getElementById('patientID');
    if (patientID.value.trim() === '') {
        alert('No ID Inputed');
    }
    else {
        addPatient(patientID);
        newPatient.style.display = 'none';
        document.getElementById('table').style.display = 'block';
        document.getElementById('inputedPatientsID').style.display = 'block';
        document.getElementById('switchPatient').style.display = 'block';
    }
});

newPath.addEventListener('click', function () {
    let patientPath = addPathObject();
    deleteInput();
    addPath(patientPath);
});

switchPatient.addEventListener('click', function () {
    switchPatient.style.display = 'none';
    document.getElementById('patientID').value = '';
    document.getElementById('patientID').style.display = 'inline';
    document.getElementById('addUser').style.display = 'inline';
    document.getElementById('table').style.display = 'none';
    document.getElementById('inputedPatientsID').style.display = 'none';
    dataTable.style.display = 'none';
    switchPatient.setAttribute("className", 1);
    removeDataTable();
    deleteInput();
});


