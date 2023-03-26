let ID
let departsIDS = [];
let fkeyarray = [];
let departs = [];
let goals = [];
let goalsIDS = [];
let posts = [];
let postsIDS = [];
let selecteddepartmentforpost = 0;
let selecteddepartmentforgoals = 0;

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
                    let htmlinput = `<input class="input-combobox" name="combo1" type="radio" id="dep1` + department.id_department + `" checked="false">
                            <label for="dep1` + department.id_department + `" id="deplabel1` + department.id_department + `" class="option">` + department.name + `</label>`
                    let sum = document.getElementsByClassName('select')[0]
                    sum.insertAdjacentHTML('afterbegin', htmlinput);
                    let htmlinput2 = `<input class="input-combobox" name="combo2" type="radio" id="dep2` + department.id_department + `" checked="false">
                            <label for="dep2` + department.id_department + `" id="deplabel2` + department.id_department + `" class="option">` + department.name + `</label>`
                    sum = document.getElementsByClassName('select')[1]
                    sum.insertAdjacentHTML('afterbegin', htmlinput2);
                    selecteddepartmentforpost = department.id_department;
                    selecteddepartmentforgoals = department.id_department;
                    departsIDS.push(data.data[i].id_department)
                    departs.push(department);
                }
                fkeyarray.splice(0, fkeyarray.length);
                getPosts().then(function (){
                    fkeyarray.splice(0, fkeyarray.length);
                    getGoals();
                });
                console.log(departs)
                addRows(departs, departsIDS, "example1")
                resolve()
            })
            .catch(error => console.log(error))
    })
}

function AddDepartment() {
    try {
        var namedep = document.getElementById("NameDepartment").value
        var descdep = document.getElementById("DescriptionDepartment").value

        departmentpost = new Department(null, namedep, descdep, null)
        body = JSON.stringify(departmentpost)

        if (namedep !== "" && descdep !== "") {
            var urlforinsert = url + 'organization/' + ID + '/department/';
            fetch(urlforinsert, {
                method: "POST",
                mode: 'cors',
                body: body
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data.message);
                    if (data.message === undefined)
                        window.location = window.location;
                })
                .catch(error => alert(error))
        } else
            alert("Заполните поля для добавления")
    } catch (error) {
        console.log(error)
    }
}

function EditDepartment() {
    if (selectedindex !== null) {
        var namedep = document.getElementById("NameDepartment").value
        var descdep = document.getElementById("DescriptionDepartment").value

        departmentput = new Department(null, namedep, descdep, null)
        body = JSON.stringify(departmentput)

        if (namedep !== "" && descdep !== "") {
            var urlforinsert = url + 'organization/' + ID + '/department/' + selectedindex.toString();
            fetch(urlforinsert, {
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
                        window.location = window.location;
                })
                .catch(error => alert(error))
        } else
            alert("Заполните поля для добавления")
    } else
        alert("Выберите строку для изменения")
}

function getGoals() {
    return new Promise(resolve => {
        let index = 0
        fkeyarray.splice(0, fkeyarray.length);
        for (let i = 0; i < departs.length; i++) {
            fetch(url + 'organization/' + ID + '/department/' + departs[i].id_department.toString() + '/goal/', {
                method: "GET",
                mode: 'cors'
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    var goal;
                    if (data != null) {
                        for (var j in data.data) {
                            goal = Object.assign(data.data[j]);
                            goalsIDS.push(goal.id_goal)
                            goal.date_start = goal.date_start.toString().substring(0, goal.date_start.toString().length - 10);
                            goal.date_end = goal.date_end.toString().substring(0, goal.date_end.toString().length - 10);
                            fkeyarray.push(goal.department_id.toString());
                            goals.push(goal);
                        }
                        if (index === departs.length - 1) {
                            console.log(goals)
                            addRows(goals, goalsIDS, "table1")
                            resolve()
                        }
                    }
                    index++

                })
        }
    }).then(function () {
        LoadFiles();
    })
}

function AddGoal() {
    var nameGoal = document.getElementById("NameGoal").value
    var descrGoal = document.getElementById("DescriptionGoal").value
    var datestartGoal = document.getElementById("DateStartGoal").value
    var dateendGoal = document.getElementById("DateEndGoal").value
    var doneGoal = document.getElementById("DoneGoal").checked

    Goalpost = new Goal(null, descrGoal, nameGoal, dateendGoal, dateendGoal, doneGoal, parseInt(selecteddepartmentforgoals.toString()))
    body = JSON.stringify(Goalpost)

    if (nameGoal !== "" && descrGoal !== "" && datestartGoal !== "" && dateendGoal !== "") {
        fetch(url + 'organization/' + ID + '/department/' + selecteddepartmentforgoals.toString() + '/goal/', {
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

function EditGoal() {
    var nameGoal = document.getElementById("NameGoal").value
    var descrGoal = document.getElementById("DescriptionGoal").value
    var datestartGoal = document.getElementById("DateStartGoal").value
    var dateendGoal = document.getElementById("DateEndGoal").value
    var doneGoal = document.getElementById("DoneGoal").checked

    if (nameGoal !== "" && descrGoal !== "" && datestartGoal !== "" && dateendGoal !== "" && selectedindex2 !== 0) {
        Goalpost = new Goal(null, descrGoal, nameGoal, dateendGoal, dateendGoal, doneGoal, parseInt(selecteddepartmentforgoals))
        body = JSON.stringify(Goalpost)
        var selgoal=goals.find(g=>g.id_goal.toString()===selectedindex2.toString())
        fetch(url + 'organization/' + ID + '/department/' + selgoal.department_id.toString() + '/goal/' + selectedindex2.toString(), {
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


function getPosts() {
    return new Promise(resolve => {
        let index = 0
        fkeyarray.splice(0, fkeyarray.length);
        for (let i = 0; i < departs.length; i++) {
            fetch(url + 'organization/' + ID + '/department/' + departs[i].id_department.toString() + '/post/', {
                method: "GET",
                mode: 'cors'
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    var post;
                    if (data !== null) {
                        for (var j in data.data) {
                            post = Object.assign(data.data[j]);
                            postsIDS.push(post.id_post)
                            fkeyarray.push(post.department_id.toString());
                            posts.push(post);
                        }
                    }
                    if (index === departs.length - 1) {
                        console.log(posts);
                        addRows(posts, postsIDS, "post1")
                        resolve()
                    }
                    index++
                })
        }
    })
}

function AddPost() {
    var namePost = document.getElementById("NamePost").value
    var salaryPost = document.getElementById("SalaryPost").value

    Postpost = new Post(null, namePost, salaryPost, null)
    body = JSON.stringify(Postpost)

    console.log(selecteddepartmentforpost)
    if (namePost !== "" && salaryPost !== "" && selecteddepartmentforpost !== 0) {
        fetch(url + 'organization/' + ID + '/department/' + selecteddepartmentforpost.toString() + '/post/', {
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

function EditPost() {
    var namePost = document.getElementById("NamePost").value
    var salaryPost = document.getElementById("SalaryPost").value

    Postpost = new Post(null, namePost, salaryPost, parseInt(selecteddepartmentforpost.toString()))
    body = JSON.stringify(Postpost)

    if (namePost !== "" && salaryPost !== "" && selecteddepartmentforpost !== 0) {
        var selpost=posts.find(p=>p.id_post.toString()===selectedindex3.toString())
        console.log(selecteddepartmentforpost.toString())
        fetch(url + 'organization/' + ID + '/department/' + selpost.department_id.toString() + '/post/' + selectedindex3.toString(), {
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
    window.Bridge.openDialog(url + 'organization/' + ID + '/department/' + no.toString(), "DeleteDep", './pages/department.html')
}

function DeleteTask(no) {
    let selectedGoal = goals.find(t => t.id_goal.toString() === no.toString());

    window.Bridge.openDialog(url + 'organization/' + ID + '/department/' + selectedGoal.department_id.toString() + '/goal/' + no.toString(), "DeleteGoal", './pages/department.html')
}

function DeletePost(no) {
    let selectedPost = posts.find(t => t.id_post.toString() === no.toString());

    window.Bridge.openDialog(url + 'organization/' + ID + '/department/' + selectedPost.department_id.toString() + '/post/' + no.toString(), "DeletePost", './pages/department.html')
}