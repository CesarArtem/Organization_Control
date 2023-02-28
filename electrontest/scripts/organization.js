
const orgurl='http://localhost:8000/api/organization';
const strategyurl='http://localhost:8000/api/organization/2/strategy/1';

function getOrganization(){
    fetch(orgurl, {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
    })
        .then(res=>
        {
            return res.json()
        })
        .then(data=>{
            // let org=Object.assign(new Organization(), data);
            //
            // document.getElementById("OrgName").value=org.name;
            // document.getElementById("AddressOrg").value=org.addres;
            // document.getElementById("BudgetOrg").value=org.budget;
            // document.getElementById("INNOrg").value=org.inn;
            // document.getElementById("DateOrg").value=org.date_foundation.toString().substring(0, org.date_foundation.toString().length-10);

            console.log(data)
            // console.log(org)
        })
        .catch(error=>console.log(error))
}

function getStrategys(){
    fetch(strategyurl, {
        method: 'GET',
        // mode: 'no-cors'
    })
        .then(res=>
        {
            return res.json()
        })
        .then(data=>{
            // var strategy=[];
            // for(var i in data)
            //     strategy.push([i, data [i]]);
            //
            // let table = document.querySelector("table");
            // generateTableHead(table, strategy);
            // generateTable(table, strategy);
            // addRowHandlers();
            console.log(data)
            // console.log(strategy)
        })
        .catch(error=>console.log(error))
}


// function generateTableHead(table, data) {
//     let thead = table.createTHead();
//     let row = thead.insertRow();
//     for (let key of data) {
//         let th = document.createElement("th");
//         let text = document.createTextNode(key);
//         th.appendChild(text);
//         row.appendChild(th);
//     }
//     let th = document.createElement("th");
//     let text = document.createTextNode("");
//     th.appendChild(text);
//     row.appendChild(th);
// }
//
// function generateTable(table, data) {
//     let thead = table.createTBody();
//     index=0;
//     for (let element of data) {
//         index++;
//         let row = thead.insertRow();
//         row.id=index;
//         for (key in element) {
//             let cell = row.insertCell();
//             let text = document.createTextNode(element[key]);
//             cell.appendChild(text);
//         }
//         let cell = row.insertCell();
//         let text = '<button type="submit" class="deletebtns" onclick="DeleteRow(index)" style="background-color: #e5383b">Удалить</button>'
//         var temp = document.createElement('div');
//         temp.innerHTML = text;
//         cell.appendChild(temp);
//     }
//     table.insertRow(thead);
// }
//
// function DeleteRow(no){
//     // alert(no);
//     // document.getElementById(no).outerHTML="";
//     // mountains.remove(no);
// }
//
// var prevcolor;
// var selectedindex=0;
//
// function addRowHandlers() {
//     var table = document.getElementById("example1");
//     var rows = table.getElementsByTagName("tr");
//     for (i = 0; i < rows.length; i++) {
//         var currentRow = table.rows[i];
//         var createClickHandler = function(row) {
//             return function() {
//                 row.style.backgroundColor="#399E5A";
//                 var name = row.getElementsByTagName("td")[0];
//                 var desc = row.getElementsByTagName("td")[1];
//                 var datestart = row.getElementsByTagName("td")[2];
//                 var dateend = row.getElementsByTagName("td")[3];
//                 document.getElementById("NameStrategy").value=name.innerHTML;
//                 document.getElementById("DescriptionStrategy").value=desc.innerHTML;
//                 document.getElementById("DateStartStrategy").value=datestart.innerHTML;
//                 document.getElementById("DateEndStrategy").value=dateend.innerHTML;
//             };
//         };
//         var createonMouseInHandler = function(row) {
//             return function() {
//                 prevcolor=row.style.backgroundColor;
//                 row.style.transition='0.5s';
//                 row.style.backgroundColor="#cccccc";
//             };
//         };
//         var createonMouseOutHandler = function(row) {
//             return function() {
//                 if (row.style.backgroundColor!==prevcolor) {
//                     row.style.backgroundColor = prevcolor;
//                 }
//             };
//         };
//         currentRow.onmouseleave=createonMouseOutHandler(currentRow);
//         currentRow.onmouseenter=createonMouseInHandler(currentRow);
//         currentRow.onclick = createClickHandler(currentRow);
//     }
// }

getOrganization()
getStrategys()














function Organization(name, id_organization, budget, date_foundation, addres, inn){
    this.name = name;
    this.id_organization = id_organization;
    this.budget = budget;
    this.date_foundation = date_foundation;
    this.addres = addres;
    this.inn = inn;
}

function Strategy(name, id_strategy, description, date_start, date_end, done){
    this.name = name;
    this.id_strategy = id_strategy;
    this.description = description;
    this.date_start = date_start;
    this.date_end = date_end;
    this.done = done;
}