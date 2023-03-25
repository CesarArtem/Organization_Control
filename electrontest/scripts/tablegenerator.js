let selectedindex = 0;
let selectedindex2 = 0;
let selectedindex3 = 0;
let lastfidselected = 0;

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        if (!key.startsWith('id_')) {
            let th = document.createElement("th");
            key = FillHeaders(key, table)
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }
    let th = document.createElement("th");
    let text = document.createTextNode("Действия");
    th.appendChild(text);
    row.appendChild(th);
}

function generateTable(table, data, IDS, fkey) {
    let thead = table.createTBody();
    index = 0;
    for (i = 0; i < data.length; i++) {
        let element = data[i]
        let IDs = IDS[index]
        let row = thead.insertRow();
        row.id = IDs
        for (key in element) {
            if (!key.toString().startsWith('id_')) {
                let cell = row.insertCell();
                let text;
                if (key === 'done') {
                    if (element[key] === true)
                        text = '<input type="checkbox" class="form-control" checked name="done" onclick="return false;">' +
                            '<div>Выполнено</div>'
                    else
                        text = '<input type="checkbox" class="form-control" onclick="return false;"/>' +
                            '<div>Не выполнено</div>'
                    var temp = document.createElement('div');
                    temp.innerHTML = text;
                    cell.appendChild(temp);
                } else {
                    if (window.location.href.endsWith('department.html')) {
                        if (key.toString().endsWith('_id')) {
                            if (fkey !== null) {
                                let foreignelement = departs.find(dep => dep.id_department.toString() === fkey[i].toString()).name.toString();
                                text = document.createTextNode(foreignelement.toString());
                            }
                        } else
                            text = document.createTextNode(element[key]);
                    } else {
                        if (key.toString().endsWith('_id')) {
                            if (fkey !== null) {
                                let foreignelement = fkey[i].toString();
                                text = document.createTextNode(foreignelement.toString());
                            }
                        } else
                            text = document.createTextNode(element[key]);
                    }
                    cell.appendChild(text);
                }
            }
        }
        let cell = row.insertCell();
        let text;
        if (table.id !== 'table1')
            text = '<button type="submit" class="deletebtns" onclick="DeleteRow(' + IDs + ')" style="background-color: #e5383b; padding: 2rm">Удалить</button>'
        else
            text = '<button type="submit" class="deletebtns" onclick="DeleteTask(' + IDs + ')" style="background-color: #e5383b; padding: 2rm">Удалить</button>'
        var temp = document.createElement('div');
        temp.innerHTML = text;
        cell.appendChild(temp);
        index++
    }
    table.insertRow(thead);
}

function addRowHandlers(table) {
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function (row) {
            return function () {
                try {
                    const parentWithClass = row.closest('tbody');
                    if (parentWithClass !== null) {
                        if (table.id !== 'table1') {
                            if (selectedindex === row.id) {
                                selectedindex = 0
                                row.style.backgroundColor = ""
                            } else {
                                for (j = 0; j < rows.length; j++) {
                                    var currentRow2 = table.rows[j];
                                    currentRow2.style.backgroundColor = ""
                                }
                                row.style.backgroundColor = "#399E5A";
                                selectedindex = row.id;
                                SelectedRow(row, table)
                            }
                        } else if (table.id !== 'example1'){
                            if (selectedindex2 === row.id) {
                                selectedindex2 = 0
                                row.style.backgroundColor = ""
                            } else {
                                for (j = 0; j < rows.length; j++) {
                                    var currentRow2 = table.rows[j];
                                    currentRow2.style.backgroundColor = ""
                                }
                                row.style.backgroundColor = "#399E5A";
                                selectedindex2 = row.id;
                                SelectedRow(row, table)
                            }
                        }else
                        {
                            if (selectedindex3 === row.id) {
                                selectedindex3 = 0
                                row.style.backgroundColor = ""
                            } else {
                                for (j = 0; j < rows.length; j++) {
                                    var currentRow3 = table.rows[j];
                                    currentRow3.style.backgroundColor = ""
                                }
                                row.style.backgroundColor = "#399E5A";
                                selectedindex3 = row.id;
                                SelectedRow(row, table)
                            }
                        }
                    } else {
                        for (i = 0; i < rows.length; i++) {
                            var currentRow2 = table.rows[i];
                            currentRow2.style.backgroundColor = ""
                        }
                    }
                } catch (e) {
                    console.log(e)
                    for (i = 0; i < rows.length; i++) {
                        var currentRow2 = table.rows[i];
                        currentRow2.style.backgroundColor = ""
                    }
                    row.style.backgroundColor = "#399E5A";
                    selectedindex = row.id;
                    SelectedRow(row, table)
                }

            };
        };

        currentRow.onclick = createClickHandler(currentRow);
    }
}

function SelectedRow(row, table) {
    if (location.href.endsWith('organization.html')) {
        var desc, name, datestart, dateend, check;
        for (let i = 0; i < strategy.length; i++) {
            if (row.id.toString() === strategy[i].id_strategy.toString()) {
                name = strategy[i].name;
                desc = strategy[i].description;
                datestart = strategy[i].date_start;
                dateend = strategy[i].date_end;
                check = strategy[i].done;
            }
        }

        document.getElementById("NameStrategy").value = name;
        document.getElementById("DescriptionStrategy").value = desc;
        document.getElementById("DateStartStrategy").value = datestart;
        document.getElementById("DateEndStrategy").value = dateend;
        document.getElementById("DoneStrategy").checked = check;
    } else if (location.href.endsWith('employee.html')) {
        if (table.id === 'example1') {
            var selemployee = employees.find(empl => empl.id_employee.toString() === row.id.toString())
            var surname = selemployee.surname;
            var name = selemployee.name;
            var secondname = selemployee.secondname;
            var date_birth = selemployee.date_birth;
            var serapasp = selemployee.seriapasp;
            var numberpasp = selemployee.numberpasp;
            var email = selemployee.email;
            var department = selemployee.department_id;

            document.getElementById("NameEmployee").value = name;
            document.getElementById("SurnameEmployee").value = surname
            document.getElementById("SecondNameEmployee").value = secondname;
            document.getElementById("DateEmployee").value = date_birth;
            document.getElementById("MailEmployee").value = email;
            document.getElementById("SeriaEmployee").value = serapasp;
            document.getElementById("NumberEmployee").value = numberpasp;

            setcomboboxForDepartment(department.toString())
            LoadPostsForSelectedDep()
        } else {
            var task = tasks.find(t => t.id_task.toString() === row.id.toString())
            var name = task.name;
            var desc = task.description;
            var datestart = task.date_start;
            var dateend = task.date_end;
            var check = task.done;

            document.getElementById("NameTask").value = name;
            document.getElementById("DescriptionTask").value = desc;
            document.getElementById("DateStartTask").value = datestart;
            document.getElementById("DateEndTask").value = dateend;
            document.getElementById("DoneTask").checked = check;
        }
    } else if (location.href.endsWith('department.html')) {
        if (table.id === 'example1') {
            var seldep = departs.find(dep => dep.id_department.toString() === row.id.toString())
            var name = seldep.name;
            var desc = seldep.description

            document.getElementById("NameDepartment").value = name;
            document.getElementById("DescriptionDepartment").value = desc;
        } else if (table.id === 'table1'){
            var goal = goals.find(g => g.id_goal.toString() === row.id.toString())
            var name = goal.name;
            var desc = goal.description;
            var datestart = goal.date_start;
            var dateend = goal.date_end;
            var check = goal.done;

            document.getElementById("NameGoal").value = name;
            document.getElementById("DescriptionGoal").value = desc;
            document.getElementById("DateStartGoal").value = datestart;
            document.getElementById("DateEndGoal").value = dateend;
            document.getElementById("DoneGoal").checked = check;

            setcomboboxForDepartment(goal.department_id.toString())
        }else{
            var post = posts.find(g => g.id_post.toString() === row.id.toString())
            var name = post.name;
            var salary = post.salary;

            document.getElementById("NamePost").value = name;
            document.getElementById("SalaryPost").value = salary;

            setcomboboxForDepartment(post.department_id.toString())
        }
    }
}

function setcomboboxForDepartment(depid){
    let options = document.getElementsByClassName('input-combobox');
    for (let j = 0; j < options.length; j++) {
        if (options[j].id.toString().substring(3, options[j].id.length) === depid.toString()) {
            options[j].checked = true
            selecteddepartmentforgoals = options[j].id.toString().substring(3, options[j].id.length);
            lastfidselected = options[j].id.toString().substring(3, options[j].id.length);
        }
    }
}

function FillHeaders(key, table) {
    if (location.href.endsWith('organization.html')) {
        switch (key) {
            case 'name':
                key = 'Наименование'
                break;
            case 'description':
                key = 'Описание'
                break;
            case 'date_start':
                key = 'Дата начала'
                break;
            case 'date_end':
                key = 'Дата окончания'
                break;
            case 'done':
                key = 'Статус выполнения'
                break;
        }
    } else if (location.href.endsWith('employee.html')) {
        switch (key) {
            case 'name':
                if (table.id === 'example1')
                    key = 'Имя'
                else
                    key = 'Наименование'
                break;
            case 'surname':
                key = 'Фамилия'
                break;
            case 'secondname':
                key = 'Отчество'
                break;
            case 'date_birth':
                key = 'Дата рождения'
                break;
            case 'seriapasp':
                key = 'Серия паспорта'
                break;
            case 'numberpasp':
                key = 'Номер паспорта'
                break;
            case 'email':
                key = 'Почта'
                break;
            case 'department_id':
                key = 'Отдел'
                break;
            case 'description':
                key = 'Описание'
                break;
            case 'date_start':
                key = 'Дата начала'
                break;
            case 'date_end':
                key = 'Дата окончания'
                break;
            case 'done':
                key = 'Статус выполнения'
                break;
            case 'employee_id':
                key = 'Сотрудник'
                break;
        }
    } else if (location.href.endsWith('department.html')) {
        switch (key) {
            case 'name':
                key = 'Наименование'
                break;
            case 'description':
                key = 'Описание'
                break;
            case 'date_start':
                key = 'Дата начала'
                break;
            case 'date_end':
                key = 'Дата окончания'
                break;
            case 'done':
                key = 'Статус выполнения'
                break;
            case 'department_id':
                key = 'Отдел'
                break;
            case 'salary':
                key = 'Зарплата'
                break;
        }
    }
    return key
}

// function FilterTaskTable(task_id) {
//     let table = document.getElementById("table1");
//     var rows = Array.from(table.getElementsByTagName("tr"));
//     var currrow = rows.find((tr, i) => {
//         if (tr.id.toString() !== task_id.toString()) {
//             table.deleteRow(i)
//         }
//     })
// }