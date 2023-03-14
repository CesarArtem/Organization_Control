let ID
let employeesIDS = []
let employees = []
let departs = []

function GetData() {
    ID = window.Bridge.getData();

    console.log(ID)
}
console.log(document.location)
GetData()
getDeparts().then(function () {
    loadScript("templates/combobox.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        })
})

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

                    let htmlinput = `<input class="input-combobox" name="combo" type="radio" id="`+department.id_department+`" checked>
                            <label for="`+department.id_department+`" class="option">`+department.name+`</label>`
                    // let htmllist = `<li class="li-combobox" onmouseover="PaintItemCombobox(this)" onmouseout="UnPaintItemCombobox(this)">
                    //                     <label class="label-combobox" for="` + department.id_department + `">` + department.name + `</label>
                    //                 </li>`
                    //
                    let sum = document.getElementsByClassName('select')[0]
                    sum.insertAdjacentHTML('afterbegin', htmlinput);
                    // let list = document.getElementById('listCB')
                    // list.insertAdjacentHTML('afterbegin', htmllist);
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
        console.log(departments.length)
        let index=0
        for (var i = 0; i < departments.length; i++) {
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
                        delete data.data[j].id_employee
                        delete data.data[j].department_id
                        employee = Object.assign(data.data[j])
                        employee.date_birth = employee.date_birth.toString().substring(0, employee.date_birth.toString().length - 10);
                        employees.push(employee);
                    }
                    // console.log(index)
                    if (index === departments.length-1) {
                        console.log('true')
                        addRows(employees)
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

function addRows(employeesdata) {
    return new Promise((resolve, reject) => {
        let table = document.querySelector("table");
        let header = Object.keys(employeesdata[0]);
        generateTableHead(table, header);
        generateTable(table, employeesdata, employeesIDS);
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
    }).then(function () {
        loadScript("styles/datatablescript.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
})
}