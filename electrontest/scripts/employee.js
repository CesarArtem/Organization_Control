let ID
let employeesIDS = []
let employees = []
let departs = []
let posts = []
let selectedindexcombobox = 1;
let emplposts = []

let selectedposts = [];

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

                    let htmlinput = `<input class="input-combobox" name="combo" type="radio" id="dep` + department.id_department + `" checked="false">
                            <label for="dep` + department.id_department + `" id="deplabel` + department.id_department + `" class="option">` + department.name + `</label>`
                    let sum = document.getElementsByClassName('select')[0]
                    sum.insertAdjacentHTML('afterbegin', htmlinput);
                    selectedindexcombobox = department.id_department;
                    departs.push(department);
                }
                getEmployees(departs)
                getPosts(departs)
                resolve()
            }).then(function () {
            loadScript("styles/bootstrap/select2/js/select2.full.min.js")
                .then(data => {
                    console.log("Script loaded successfully", data);
                })
                .catch(err => {
                    console.error(err);
                });
        })
            .catch(error => console.log(error))
    })
}

async function getEmployees(departments) {
    return new Promise((resolve, reject) => {
        let index = 0
        for (var i = 0; i < departments.length; i++) {
            let namedep = departments[i].name;
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
                        employee.department_id = namedep;
                        employee.date_birth = employee.date_birth.toString().substring(0, employee.date_birth.toString().length - 10);
                        employees.push(employee);
                    }
                    if (index === departments.length - 1) {
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
    }).then(function () {
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
    }).then(function () {
        var combo = document.getElementsByClassName('option');

        for (var i = 0; i < combo.length; i++) {
            combo[i].addEventListener('click', function () {
                selectedindexcombobox = this.id.toString().substring(8, this.id.length)
            })
        }

        LoadPostsForSelectedDep()
    }).then(function () {
        getEmployeePosts();
    })
}

function AddEmployee() {
    try {
        nameempl = document.getElementById("NameEmployee").value
        surnempl = document.getElementById("SurnameEmployee").value
        secondempl = document.getElementById("SecondNameEmployee").value
        dateempl = document.getElementById("DateEmployee").value
        mailempl = document.getElementById("MailEmployee").value
        seriaempl = document.getElementById("SeriaEmployee").value
        numberempl = document.getElementById("NumberEmployee").value

        var postscombo = document.getElementsByClassName('select2')[0];
        var postoptions = postscombo.getElementsByTagName('option')
        selectedposts.splice(0, selectedposts.length);
        for (let i = 0; i < postoptions.length; i++) {
            if (postoptions[i].selected) {
                selectedposts.push(postoptions[i].id.toString().substring(8, postoptions[i].id.toString().length));
            }
        }

        employeepost = new Employee(null, surnempl, nameempl, secondempl, dateempl, seriaempl, numberempl, mailempl, null)
        body = JSON.stringify(employeepost)

        if (surnempl !== "" && nameempl !== "" && dateempl !== "" && seriaempl !== "" && numberempl !== "" && mailempl !== "") {
            var urlforinsert = url + 'organization/' + ID + '/department/' + selectedindexcombobox.toString() + '/employee/';
            fetch(urlforinsert, {
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
                        AddPostsToEmployee(data, urlforinsert)
                })
                .catch(error => alert(error))
        } else
            alert("Заполните поля для добавления")
    } catch (error) {
        console.log(error)
    }
}

function EditEmployee() {
    if (selectedindex !== null && selectedindex !== 0 && lastfidselected !== 0) {
        nameempl = document.getElementById("NameEmployee").value
        surnempl = document.getElementById("SurnameEmployee").value
        secondempl = document.getElementById("SecondNameEmployee").value
        dateempl = document.getElementById("DateEmployee").value
        mailempl = document.getElementById("MailEmployee").value
        seriaempl = document.getElementById("SeriaEmployee").value
        numberempl = document.getElementById("NumberEmployee").value

        var postscombo = document.getElementsByClassName('select2')[0];
        var postoptions = postscombo.getElementsByTagName('option')
        selectedposts.splice(0, selectedposts.length);
        for (let i = 0; i < postoptions.length; i++) {
            if (postoptions[i].selected) {
                selectedposts.push(postoptions[i].id.toString().substring(8, postoptions[i].id.toString().length));
            }
        }

        employeepost = new Employee(null, surnempl, nameempl, secondempl, dateempl, seriaempl, numberempl, mailempl, parseInt(selectedindexcombobox))
        body = JSON.stringify(employeepost)

        if (surnempl !== "" && nameempl !== "" && secondempl !== "" && dateempl !== "" && seriaempl !== "" && numberempl !== "" && mailempl !== "") {
            fetch(url + 'organization/' + ID + '/department/' + lastfidselected.toString() + '/employee/' + selectedindex.toString(), {
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
                        EditPostsToEmployee(url + 'organization/' + ID + '/department/' + selectedindexcombobox.toString() + '/employee/' + selectedindex.toString())
                })
                .catch(error => alert(error))
        } else
            alert("Заполните поля для добавления")
    } else
        alert("Выберите строку для изменения")
}

function getPosts(departments) {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < departments.length; i++) {
            fetch(url + 'organization/' + ID + '/department/' + departments[i].id_department + '/post/', {
                method: 'GET',
                mode: 'cors'
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    var post;
                    for (var j in data.data) {
                        post = Object.assign(data.data[j])
                        posts.push(post);
                    }
                })
                .catch(error => function () {
                    console.log(error)
                })
        }
        resolve()
    })
}

function getEmployeePosts() {
    for (let i = 0; i < employees.length; i++) {
        var department
        for (let j = 0; j < departs.length; j++) {
            if (departs[j].name.toString() === employees[i].department_id.toString()) {
                department = departs[j].id_department;
                break;
            }
        }
        fetch(url + 'organization/' + ID + '/department/' + department.toString() + '/employee/' + employees[i].id_employee.toString() + '/emplpost/', {
            method: "GET",
            mode: 'cors'
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                var posts;
                for (var i in data.data) {
                    posts = Object.assign(data.data[i]);
                    emplposts.push(posts);
                }
            })
    }
}

function LoadPostsForSelectedDep() {
    return new Promise(resolve => {
        let sum = document.getElementsByClassName('select2')[0]
        sum.innerHTML = "";
        resolve()
    }).then(function () {
        for (var i = 0; i < posts.length; i++) {
            let htmlinput = `<option id="dep` + posts[i].department_id + `post` + posts[i].id_post + `">` + posts[i].name + `</option>`
            if (posts[i].department_id.toString() === selectedindexcombobox.toString()) {
                let sum = document.getElementsByClassName('select2')[0]
                sum.insertAdjacentHTML('afterbegin', htmlinput);
            }
        }
    }).then(function () {
        if (selectedindex !== 0) {
            for (let i = 0; i < emplposts.length; i++) {
                if (emplposts[i].employee_id.toString() === selectedindex.toString()) {
                    let sum = document.getElementsByClassName('select2')[0]
                    let options = sum.getElementsByTagName('option')
                    for (let j = 0; j < options.length; j++) {
                        if (options[j].id.toString().substring(8, options[j].id.toString().length) === emplposts[i].post_id.toString()) {
                            options[j].selected = true;
                            break;
                        }
                    }
                }
            }
        }
    }).then(function () {
        loadScript("styles/bootstrap/select2/js/select2.full.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        $('.select2').select2()

        $('.select2bs4').select2({
            theme: 'bootstrap4'
        })
    })
        .catch(e => {
           console.log(e)
        })
}

function AddPostsToEmployee(jsondata, url) {
    try {
        var insertedemployee = Object.assign(jsondata);
        var index = 0;
        for (var i = 0; i < selectedposts.length; i++) {
            var post_empl = new Employee_Post(null, parseInt(selectedposts[i].toString()), parseInt(insertedemployee.id_employee), parseInt(insertedemployee.department_id));
            body = JSON.stringify(post_empl)
            fetch(url + insertedemployee.id_employee + '/emplpost/', {
                method: "POST",
                mode: 'cors',
                body: body
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    if (index === selectedposts.length - 1)
                        window.location = window.location
                    index++
                })
        }
    } catch (error) {
        console.log(error)
    }

}

function EditPostsToEmployee(url) {
    try {
        var index = 0;
        var post_emplfordelete = new Employee_Post(null, parseInt(selectedposts[0].toString()), parseInt(selectedindex), null);
        body = JSON.stringify(post_emplfordelete)
        fetch(url + '/emplpost/', {
            method: "DELETE",
            mode: 'cors',
            body: body
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.message)

            })
        for (var i = 0; i < selectedposts.length; i++) {
            var post_empl = new Employee_Post(null, parseInt(selectedposts[i].toString()), parseInt(selectedindex), null);
            body = JSON.stringify(post_empl)
            console.log(url + '/emplpost/')
            fetch(url + '/emplpost/', {
                method: "POST",
                mode: 'cors',
                body: body
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    if (index === selectedposts.length - 1)
                        window.location = window.location
                    index++
                })
        }
    } catch (error) {
        console.log(error)
    }
}

function DeleteRow(no) {
    window.Bridge.openDialog(url + 'organization/' + ID + '/department/' + lastfidselected + '/employee/' + no, "DeleteEmployee")
}

function CheckLengthForPass(element){
    if (element.id==='SeriaEmployee')
    {
        if (element.value.length > 6) {
            element.value = element.value.slice(0,6);
        }
    }
    else
    {
        if (element.value.length > 4) {
            element.value = element.value.slice(0,4);
        }
    }
        var sanitized = $(element).val().replace(/[^0-9]/g, '');
        $(element).val(sanitized);
}