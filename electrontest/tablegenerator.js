function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        key=FillHeaders(key)
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
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
        let IDstrategy = IDS[index]
        let row = thead.insertRow();
        row.id = IDstrategy
        for (key in element) {
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
        let cell = row.insertCell();
        let text = '<button type="submit" class="deletebtns" onclick="DeleteRow(' + IDstrategy + ')" style="background-color: #e5383b">Удалить</button>'
        var temp = document.createElement('div');
        temp.innerHTML = text;
        cell.appendChild(temp);
        index++
    }
    table.insertRow(thead);
}

let selectedindex = 0;

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
                            if (selectedindex !== 0) {
                                prevrow = document.getElementById(selectedindex)
                                selectedindex = row.id
                                prevrow.style.backgroundColor = ""
                            }
                            row.style.backgroundColor = "#399E5A";
                            selectedindex = row.id;
                            SelectedRow(row)
                        }
                    } else {
                        selectedindex = 0
                        for (i = 0; i < rows.length; i++) {
                            var currentRow = table.rows[i];
                            currentRow.style.backgroundColor = ""
                        }
                    }
                } catch (e) {
                    console.log(window.name)
                    console.log(e)
                    for (i = 0; i < rows.length; i++) {
                        var currentRow = table.rows[i];
                        currentRow.style.backgroundColor = ""
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
        var name = row.getElementsByTagName("td")[0];
        var desc = row.getElementsByTagName("td")[1];
        var datestart = row.getElementsByTagName("td")[2];
        var dateend = row.getElementsByTagName("td")[3];
        var div = row.getElementsByTagName("td")[4];
        var check = div.getElementsByTagName("input")[0];

        document.getElementById("NameStrategy").value = name.innerHTML;
        document.getElementById("DescriptionStrategy").value = desc.innerHTML;
        document.getElementById("DateStartStrategy").value = datestart.innerHTML;
        document.getElementById("DateEndStrategy").value = dateend.innerHTML;
        document.getElementById("DoneStrategy").checked = check.checked;
    }
    else if (location.href.endsWith('employee.html')) {
        var surname = row.getElementsByTagName("td")[0];
        var name = row.getElementsByTagName("td")[1];
        var secondname = row.getElementsByTagName("td")[2];
        var date_birth = row.getElementsByTagName("td")[3];
        var email = row.getElementsByTagName("td")[4];
        var department = row.getElementsByTagName("td")[5];
        var serapasp = row.getElementsByTagName("td")[6];
        var numberpasp = row.getElementsByTagName("td")[7];

        document.getElementById("NameEmployee").value = name.innerHTML;
        document.getElementById("SurnameEmployee").value = surname.innerHTML;
        document.getElementById("SecondNameEmployee").value = secondname.innerHTML;
        document.getElementById("DateEmployee").value = date_birth.innerHTML;
        document.getElementById("MailEmployee").value = email.innerHTML;
        document.getElementById("SeriaEmployee").value = serapasp.innerHTML;
        document.getElementById("NumberEmployee").value = numberpasp.innerHTML;

        //сделать поиск по комбобоксу нужного элемента
        document.getElementById("sumCB").checked = department;
    }
}

function FillHeaders(key){
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
    }
    else if (location.href.endsWith('employee.html')) {
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