let mountains = [
    { name: 'Monte Falco', height: 1658, place: 'Parco Foreste Casentinesi' },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
    { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Monte Amiata", height: 1738, place: "Siena" }
];

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        switch (key)
        {
            case 'name':
                key='Наименование'
                break;
            case 'description':
                key='Описание'
                break;
            case 'date_start':
                key='Дата начала'
                break;
            case 'date_end':
                key='Дата окончания'
                break;
            case 'done':
                key='Статус выполнения'
                break;
        }
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
    let th = document.createElement("th");
    let text = document.createTextNode("Действия");
    th.appendChild(text);
    row.appendChild(th);
}

function generateTable(table, data) {
    let thead = table.createTBody();
    index=0;
    for (let element of data) {
        index++;
        let row = thead.insertRow();
        row.id=index;
        for (key in element) {
            let cell = row.insertCell();
            let text;
            if (key==='done')
            {
                if (element[key]===true)
                    text = '<input type="checkbox" class="form-control" checked name="done" onclick="return false;">'+
                        '<div>Выполнено</div>'
                else
                    text = '<input type="checkbox" class="form-control" onclick="return false;"/>' +
                        '<div>Не выполнено</div>'
                var temp = document.createElement('div');
                temp.innerHTML = text;
                cell.appendChild(temp);
            }
            else {
                text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
        let cell = row.insertCell();
        let text = '<button type="submit" class="deletebtns" onclick="DeleteRow(index)" style="background-color: #e5383b">Удалить</button>'
        var temp = document.createElement('div');
        temp.innerHTML = text;
        cell.appendChild(temp);
    }
    table.insertRow(thead);
}

let selectedindex=0;

function addRowHandlers() {
    var table = document.getElementById("example1");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function(row) {
            return function() {
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
                    }
                    else{
                        selectedindex=0
                        for (i = 0; i < rows.length; i++) {
                            var currentRow = table.rows[i];
                            currentRow.style.backgroundColor = ""
                        }
                    }
                } catch (e)
                {
                    console.log(e)
                    for (i = 0; i < rows.length; i++) {
                        var currentRow = table.rows[i];
                        currentRow.style.backgroundColor = ""
                    }
                    row.style.backgroundColor = "#399E5A";
                    selectedindex = row.id;
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

            };
        };

        currentRow.onclick = createClickHandler(currentRow);
    }
}