let selectedindex = 0;
let selectedtask = 0;
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
                    if (key.toString().endsWith('_id')) {
                        if (fkey !== null) {
                            let foreignelement = fkey[i]
                            text = document.createTextNode(foreignelement.toString());
                        }
                    } else
                        text = document.createTextNode(element[key]);
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
                                selectedtask = 0
                                row.style.backgroundColor = ""
                                let table1 = document.getElementById("table1");
                                var rows1 = table1.getElementsByTagName("tr");
                                for (j = 0; j < rows1.length; j++) {
                                    var currentRow2 = table1.rows[j];
                                    currentRow2.style.backgroundColor = ""
                                }
                            } else {
                                for (j = 0; j < rows.length; j++) {
                                    var currentRow2 = table.rows[j];
                                    currentRow2.style.backgroundColor = ""
                                }
                                row.style.backgroundColor = "#399E5A";
                                selectedindex = row.id;
                                selectedtask = 0
                                let table1 = document.getElementById("table1");
                                var rows1 = table1.getElementsByTagName("tr");
                                for (j = 0; j < rows1.length; j++) {
                                    var currentRow2 = table1.rows[j];
                                    currentRow2.style.backgroundColor = ""
                                }
                                SelectedRow(row, table)
                            }
                        } else {
                            if (selectedtask === row.id) {
                                selectedtask = 0
                                row.style.backgroundColor = ""
                            } else {
                                for (j = 0; j < rows.length; j++) {
                                    var currentRow2 = table.rows[j];
                                    currentRow2.style.backgroundColor = ""
                                }
                                row.style.backgroundColor = "#399E5A";
                                selectedtask = row.id;
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

            let options = document.getElementsByClassName('input-combobox');
            for (let j = 0; j < options.length; j++) {
                if (options[j].id.toString().substring(3, options[j].id.length) === department.toString()) {
                    options[j].checked = true
                    selectedindexcombobox = options[j].id.toString().substring(3, options[j].id.length);
                    lastfidselected = options[j].id.toString().substring(3, options[j].id.length);
                    LoadPostsForSelectedDep()
                }
            }
        } else {
            var task=tasks.find(t=>t.id_task.toString()===row.id.toString())
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