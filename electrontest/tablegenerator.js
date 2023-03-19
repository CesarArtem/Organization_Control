function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        if (!key.startsWith('id_')) {
            let th = document.createElement("th");
            key = FillHeaders(key)
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

function generateTable(table, data, IDS) {
    let thead = table.createTBody();
    index = 0;
    for (let element of data) {
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
                    text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                }
            }
        }
        let cell = row.insertCell();
        let text = '<button type="submit" class="deletebtns" onclick="DeleteRow(' + IDs + ')" style="background-color: #e5383b">Удалить</button>'
        var temp = document.createElement('div');
        temp.innerHTML = text;
        cell.appendChild(temp);
        index++
    }
    table.insertRow(thead);
}

let selectedindex = 0;
let lastfidselected=0;
var prevrow;

function addRowHandlers() {
    var table = document.getElementById("example1");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function (row) {
            return function () {
                try {
                    const parentWithClass = row.closest('tbody');
                    if (parentWithClass !== null) {
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
                            SelectedRow(row)
                        }
                    }
                    else
                    {
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
                    SelectedRow(row)
                }

            };
        };

        currentRow.onclick = createClickHandler(currentRow);
    }
}

function SelectedRow(row) {
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
        var surname, name, secondname, date_birth, serapasp, numberpasp, email, department;
        for (let i = 0; i < employees.length; i++) {
            if (row.id.toString() === employees[i].id_employee.toString()) {
                surname = employees[i].surname;
                name = employees[i].name;
                secondname = employees[i].secondname;
                date_birth = employees[i].date_birth;
                serapasp = employees[i].seriapasp;
                numberpasp = employees[i].numberpasp;
                email = employees[i].email;
                department = employees[i].department_id;

            }
        }

        document.getElementById("NameEmployee").value = name;
        document.getElementById("SurnameEmployee").value = surname
        document.getElementById("SecondNameEmployee").value = secondname;
        document.getElementById("DateEmployee").value = date_birth;
        document.getElementById("MailEmployee").value = email;
        document.getElementById("SeriaEmployee").value = serapasp;
        document.getElementById("NumberEmployee").value = numberpasp;

        for (let i = 0; i < departs.length; i++) {
            if (departs[i].name.toString() === department.toString()) {
                let options = document.getElementsByClassName('input-combobox');
                for (let j = 0; j < options.length; j++) {
                    if (options[j].id.toString().substring(3, options[j].id.length) === departs[i].id_department.toString()) {
                        options[j].checked = true
                        selectedindexcombobox=options[j].id.toString().substring(3, options[j].id.length);
                        lastfidselected=options[j].id.toString().substring(3, options[j].id.length);
                        LoadPostsForSelectedDep()
                    }
                }
            }
        }
    }
}

function FillHeaders(key) {
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
                key = 'Имя'
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
        }
    }
    return key
}