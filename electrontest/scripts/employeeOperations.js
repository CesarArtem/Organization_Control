let ID
let employeesIDS = [];
let employees = [];
let fkeyarray=[];
let departs = [];
let posts = [];
let selectedindexcombobox = 1;
let emplposts = [];
let tasks=[];
let tasksIDS=[];
let selectedposts = [];

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

                    let htmlinput = `<input class="input-combobox" name="combo" type="radio" id="dep` + department.id_department + `" onchange="LoadPostsForSelectedDep()" checked="false">
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
            loadScript("../styles/bootstrap/select2/js/select2.full.min.js")
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
        fkeyarray.splice(0, fkeyarray.length);
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
                        fkeyarray.push(namedep)
                        employee = Object.assign(data.data[j])
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
        var department=departs.find(dep=>dep.id_department.toString()===employees[i].department_id.toString()).id_department

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

function getTasks(){
    return new Promise(resolve => {
        let index = 0
        fkeyarray.splice(0, fkeyarray.length);
        for (let i = 0; i < employees.length; i++) {
            var department=departs.find(dep=>dep.id_department.toString()===employees[i].department_id.toString());
            fetch(url + 'organization/' + ID + '/department/' + department.id_department.toString() + '/employee/' + employees[i].id_employee.toString() + '/task/', {
                method: "GET",
                mode: 'cors'
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    var task;
                    for (var j in data.data) {
                        task = Object.assign(data.data[j]);
                        tasksIDS.push(task.id_task)
                        task.date_start = task.date_start.toString().substring(0, task.date_start.toString().length - 10);
                        task.date_end = task.date_end.toString().substring(0, task.date_end.toString().length - 10);
                        var curempl=employees.find(empl=>empl.id_employee.toString()===task.employee_id.toString());
                        fkeyarray.push(curempl.surname.toString()+' '+curempl.name.toString().substring(0,1)+'.'+curempl.secondname.toString().substring(0,1)+'.')
                        tasks.push(task);
                    }
                    if (index===employees.length-1)
                    {
                        AddRowsToTask(tasks, tasksIDS)
                        resolve()
                    }
                    index++
                })
        }
    }).then(function (){
        LoadFiles();
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
            }).catch(error=>console.log(error))

        console.log(selectedposts)
        for (i = 0; i < selectedposts.length; i++) {
            console.log(selectedposts[i])
            var post_empl = new Employee_Post(null, parseInt(selectedposts[i].toString()), parseInt(selectedindex), null);
            body = JSON.stringify(post_empl)
            fetch(url + '/emplpost/', {
                method: "POST",
                mode: 'cors',
                body: body
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {

                }).then(function (){
                if (index === selectedposts.length -1)
                    window.location = window.location
                index++
            })
        }
    } catch (error) {
        console.log(error)
    }
}

function AddTask(){
    nametask = document.getElementById("NameTask").value
    descrtask = document.getElementById("DescriptionTask").value
    datestarttask = document.getElementById("DateStartTask").value
    dateendtask = document.getElementById("DateEndTask").value
    donetask = document.getElementById("DoneTask").checked

    taskpost = new Task(null, descrtask, nametask,  dateendtask, dateendtask, donetask, null)
    body = JSON.stringify(taskpost)

    if (nametask !== "" && descrtask !== "" && datestarttask !== "" && dateendtask !== ""&&selectedindex!==0) {
        var employee=employees.find(element=>element.id_employee.toString()===selectedindex.toString());
        fetch(url + 'organization/' + ID + '/department/'+departs.find(depart=>depart.id_department.toString()===employee.department_id.toString()).id_department+'/employee/'+selectedindex+'/task', {
            method: "POST",
            mode: 'cors',
            body: body
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (data.message === undefined)
                    window.location = window.location
            })
            .catch(error => alert(error))
    } else
        alert("Заполните поля для добавления")
}

function EditTask() {
    nametask = document.getElementById("NameTask").value
    descrtask = document.getElementById("DescriptionTask").value
    datestarttask = document.getElementById("DateStartTask").value
    dateendtask = document.getElementById("DateEndTask").value
    donetask = document.getElementById("DoneTask").checked

    if (nametask !== "" && descrtask !== "" && dateendtask !== "" && dateendtask !== ""&&selectedindex2!==0) {
        var emplID,empl, urlcomplete;
        if (selectedindex===0) {
            emplID = tasks.find(t => t.id_task.toString() === selectedindex2.toString()).employee_id
            empl=employees.find(element=>element.id_employee.toString()===emplID.toString());
            urlcomplete=url + 'organization/' + ID + '/department/'+empl.department_id.toString()+'/employee/'+empl.id_employee.toString()+'/task/'+selectedindex2.toString();
        }
        else {
            emplID = selectedindex;
            var seltask=tasks.find(t=>t.id_task.toString()===selectedindex2.toString()).employee_id
            empl=employees.find(element=>element.id_employee.toString()===seltask.toString());
        }
        console.log(empl, emplID)

        taskpost = new Task(null, descrtask, nametask,  dateendtask, dateendtask, donetask, parseInt(emplID))
        body = JSON.stringify(taskpost)
        console.log(url + 'organization/' + ID + '/department/'+empl.department_id.toString()+'/employee/'+empl.id_employee.toString()+'/task/'+selectedindex2.toString())
        fetch(urlcomplete, {
            method: "PUT",
            mode: 'cors',
            body: body
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (data.message === 'Успешное изменение данных')
                    window.location = window.location
            })
            .catch(error => alert(error))
    } else
        alert("Заполните поля для изменения")
}

function DeleteRow(no) {
    var selempl=employees.find(empl=>empl.id_employee.toString()===no.toString());
    var depid=departs.find(dep=>dep.id_department.toString()===selempl.department_id.toString())
    window.Bridge.openDialog(url + 'organization/' + ID + '/department/' + depid.id_department.toString() + '/employee/' + no.toString(), "DeleteEmployee")
}

function DeleteTask(no) {
    let selectedtask=tasks.find(t=>t.id_task.toString()===no.toString());
    console.log(selectedtask)
    let selectedempl=employees.find(empl=>empl.id_employee.toString()===selectedtask.employee_id.toString());
    console.log(selectedempl)
    let selecteddep=departs.find(dep=>dep.id_department.toString()===selectedempl.department_id.toString());
    console.log(selecteddep)

    console.log(url + 'organization/' + ID + '/department/' + selecteddep.id_department.toString() + '/employee/' + selectedempl.id_employee.toString()+'/task/'+no.toString())
    window.Bridge.openDialog(url + 'organization/' + ID + '/department/' + selecteddep.id_department.toString() + '/employee/' + selectedempl.id_employee.toString()+'/task/'+no.toString(), "DeleteTask")
}