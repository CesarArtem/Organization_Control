let ID
let employeesIDS = []
let employees = []
let departs = []
let selectedindexcombobox=1;

function GetData() {
    ID = window.Bridge.getData();

    console.log(ID)
}

GetData()
getDeparts()

async function getDeparts() {
    return new Promise((resolve) => {
        fetch(url + 'organization/' + ID + '/department/', {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                var department
                for (var i in data.data) {
                    delete data.data[i].organization_id
                    department = Object.assign(data.data[i])

                    let htmlinput = `<input class="input-combobox" name="combo" type="radio" id="dep`+department.id_department+`" checked="false">
                            <label for="dep`+department.id_department+`" id="deplabel`+department.id_department+`" class="option">`+department.name+`</label>`
                    let sum = document.getElementsByClassName('select')[0]
                    sum.insertAdjacentHTML('afterbegin', htmlinput);
                    selectedindexcombobox=department.id_department;
                    departs.push(department);
                }
                getEmployees(departs)
                resolve()
            })
            .catch(error => console.log(error))
    })
}

async function getEmployees(departments) {
    return new Promise((resolve, reject) => {
        let index=0
        for (var i = 0; i < departments.length; i++) {
            let namedep=departments[i].name;
            fetch(url + 'organization/' + ID + '/department/' + departments[i].id_department + '/employee/', {
                method: 'GET',
                mode: 'cors'
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    var employee
                    for (var j in data.data) {
                        employeesIDS.push(data.data[j].id_employee)
                        // delete data.data[j].id_employee
                        delete data.data[j].department_id
                        employee = Object.assign(data.data[j])
                        employee.department_id=namedep;
                        employee.date_birth = employee.date_birth.toString().substring(0, employee.date_birth.toString().length - 10);
                        employees.push(employee);
                    }
                    if (index === departments.length-1) {
                        addRows(employees, employeesIDS)
                    }
                    index++
                })
                .catch(error => function () {
                    console.log(error)
                    reject()
                })
        }
        resolve()
    })
}

function addRows(employeesdata, emplIDS) {
    return new Promise((resolve, reject) => {
        let table = document.querySelector("table");
        let header = Object.keys(employeesdata[0]);
        generateTableHead(table, header);
        generateTable(table, employeesdata, emplIDS);
        addRowHandlers()
        resolve()
    }).then(function () {
        loadScript("styles/bootstrap/datatables/jquery.dataTables.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-bs4/js/dataTables.bootstrap4.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-responsive/js/dataTables.responsive.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-responsive/js/responsive.bootstrap4.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/dataTables.buttons.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/buttons.bootstrap4.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/buttons.html5.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/buttons.print.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/buttons.colVis.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function (){
        loadScript("styles/bootstrap/select2/js/select2.full.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/datatablescript.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
}).then(function (){
        var combo = document.getElementsByClassName('option');

        for (var i=0;i<combo.length;i++)
        {
            combo[i].addEventListener('click', function (){
                selectedindexcombobox=this.id.toString().substring(8, this.id.length)
            })
        }
    })
}

function AddEmployee() {
    nameempl = document.getElementById("NameEmployee").value
    surnempl = document.getElementById("SurnameEmployee").value
    secondempl = document.getElementById("SecondNameEmployee").value
    dateempl = document.getElementById("DateEmployee").value
    mailempl = document.getElementById("MailEmployee").value
    seriaempl = document.getElementById("SeriaEmployee").value
    numberempl = document.getElementById("NumberEmployee").value

    employeepost = new Employee(null, surnempl, nameempl, secondempl, dateempl,seriaempl, numberempl,mailempl, null)
    body = JSON.stringify(employeepost)

    if (surnempl !== "" && nameempl !== "" && secondempl !== "" && dateempl !== ""&&seriaempl !== ""&&numberempl !== ""&&mailempl !== "") {
        fetch(url + 'organization/' + ID + '/department/' + selectedindexcombobox.toString() + '/employee/', {
            method: "POST",
            mode: 'cors',
            body: body
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.message)
                if (data.message === undefined)
                    window.location = window.location
            })
            .catch(error => alert(error))
    } else
        alert("Заполните поля для добавления")
}

function EditEmployee() {
    if (selectedindex !== null && selectedindex !== 0&&lastfidselected!==0) {
        nameempl = document.getElementById("NameEmployee").value
        surnempl = document.getElementById("SurnameEmployee").value
        secondempl = document.getElementById("SecondNameEmployee").value
        dateempl = document.getElementById("DateEmployee").value
        mailempl = document.getElementById("MailEmployee").value
        seriaempl = document.getElementById("SeriaEmployee").value
        numberempl = document.getElementById("NumberEmployee").value

        employeepost = new Employee(null, surnempl, nameempl, secondempl, dateempl,seriaempl, numberempl,mailempl, parseInt(selectedindexcombobox))
        body = JSON.stringify(employeepost)

        if (surnempl !== "" && nameempl !== "" && secondempl !== "" && dateempl !== ""&&seriaempl !== ""&&numberempl !== ""&&mailempl !== "") {
            fetch(url + 'organization/' + ID + '/department/' + lastfidselected.toString() + '/employee/'+selectedindex.toString(), {
                method: "PUT",
                mode: 'cors',
                body: body
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data.message)
                    if (data.message === 'Успешное изменение данных')
                        window.location = window.location
                })
                .catch(error => alert(error))
        } else
            alert("Заполните поля для добавления")
    } else
        alert("Выберите строку для изменения")
}

function getPosts(departments){
    let index=0
    for (var i = 0; i < departments.length; i++) {
        let namedep=departments[i].name;
        fetch(url + 'organization/' + ID + '/department/' + departments[i].id_department + '/employee/', {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                var employee
                for (var j in data.data) {
                    employeesIDS.push(data.data[j].id_employee)
                    // delete data.data[j].id_employee
                    delete data.data[j].department_id
                    employee = Object.assign(data.data[j])
                    employee.department_id=namedep;
                    employee.date_birth = employee.date_birth.toString().substring(0, employee.date_birth.toString().length - 10);
                    employees.push(employee);
                }
                if (index === departments.length-1) {
                    addRows(employees, employeesIDS)
                }
                index++
            })
            .catch(error => function () {
                console.log(error)
                reject()
            })
    }
}

function DeleteRow(no) {
    window.Bridge.openDialog(url + 'organization/' + ID + '/department/' + lastfidselected + '/employee/'+no, "DeleteEmployee")
}