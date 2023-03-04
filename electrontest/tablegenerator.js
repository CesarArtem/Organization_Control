let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
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
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
    let th = document.createElement("th");
    let text = document.createTextNode("");
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
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
        let cell = row.insertCell();
        let text = '<button type="submit" class="deletebtns" onclick="DeleteRow(index)" style="background-color: #e5383b">Удалить</button>'
        var temp = document.createElement('div');
        temp.innerHTML = text;
        cell.appendChild(temp);
    }
    table.insertRow(thead);
}

function DeleteRow(no){
    // alert(no);
    // document.getElementById(no).outerHTML="";
    // mountains.remove(no);
}

var prevcolor;
var selectedindex=0;

function addRowHandlers() {
    var table = document.getElementById("example1");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function(row) {
            return function() {
                row.style.backgroundColor="#399E5A";
                var name = row.getElementsByTagName("td")[0];
                var desc = row.getElementsByTagName("td")[1];
                var datestart = row.getElementsByTagName("td")[2];
                var dateend = row.getElementsByTagName("td")[3];
                document.getElementById("NameStrategy").value=name.innerHTML;
                document.getElementById("DescriptionStrategy").value=desc.innerHTML;
                document.getElementById("DateStartStrategy").value=datestart.innerHTML;
                document.getElementById("DateEndStrategy").value=dateend.innerHTML;
            };
        };
        var createonMouseInHandler = function(row) {
            return function() {
                prevcolor=row.style.backgroundColor;
                row.style.transition='0.5s';
                row.style.backgroundColor="#cccccc";
            };
        };
        var createonMouseOutHandler = function(row) {
            return function() {
                if (row.style.backgroundColor!==prevcolor) {
                    row.style.backgroundColor = prevcolor;
                }
            };
        };
        currentRow.onmouseleave=createonMouseOutHandler(currentRow);
        currentRow.onmouseenter=createonMouseInHandler(currentRow);
        currentRow.onclick = createClickHandler(currentRow);
    }
}

let table = document.querySelector("table");
let data = Object.keys(mountains[0]);
generateTableHead(table, data);
generateTable(table, mountains);
addRowHandlers();