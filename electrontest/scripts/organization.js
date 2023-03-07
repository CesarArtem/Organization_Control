
// let IDorg;
//
// // window.orgBridge.value((event, value)=>{
// //     ID=value
// // })
// API.on((event, idinfo)=>{
//     IDorg=idinfo;
// })
//
// console.log(IDorg);

let ID

function GetData() {
    ID=window.Bridge.getData();

    console.log(ID)
}

GetData()

let orgsaved

function getOrganization(ID){
    fetch(url+'organization/'+ID, {
        method: "GET",
        mode: 'cors'
    })
        .then(res=>
        {
            return res.json()
        })
        .then(data=>{
            orgsaved=Object.assign(new Organization(), data);

            document.getElementById("OrgName").value=orgsaved.name;
            document.getElementById("AddressOrg").value=orgsaved.addres;
            document.getElementById("BudgetOrg").value=orgsaved.budget;
            document.getElementById("INNOrg").value=orgsaved.inn;
            document.getElementById("DateOrg").value=orgsaved.date_foundation.toString().substring(0, orgsaved.date_foundation.toString().length-10);

            orgsaved.date_foundation=document.getElementById("DateOrg").value
            console.log(data)
        })
        .catch(error=>console.log(error))
}

function SaveOrg(){
    nameorg=document.getElementById("OrgName").value
    addresorg=document.getElementById("AddressOrg").value
    dateorg=document.getElementById("DateOrg").value
    budgetorg=document.getElementById("BudgetOrg").value
    innorg=document.getElementById("INNOrg").value
    org = new Organization(nameorg, null, budgetorg, dateorg, addresorg, innorg)
    
    if (orgsaved.name===org.name&&orgsaved.inn===org.inn&&orgsaved.budget===org.budget&&orgsaved.addres===org.addres&&orgsaved.date_foundation===org.date_foundation) {
        alert("Изменений не было сделано")
    } else {
        body = JSON.stringify(org)
        fetch(url + 'organization/' + ID, {
            method: "PUT",
            mode: 'cors',
            body: body
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                orgsaved=Object.assign(new Organization(), data.data);
                orgsaved.date_foundation=document.getElementById("DateOrg").value
                alert(data.message)
            })
            .catch(error => console.log(error))
    }
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

getOrganization(ID)
// getStrategys()
