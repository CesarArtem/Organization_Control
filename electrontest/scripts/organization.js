let ID
let strategy = [];
let strategyIDS=[];
let orgsaved

function GetData() {
    ID = window.Bridge.getData();

    console.log(ID)
}

GetData()
getOrganization(ID)
HideFromStart()
getStratygies(ID).then(function () {
    loadScript("../styles/bootstrap/datatables/jquery.dataTables.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../styles/bootstrap/datatables-bs4/js/dataTables.bootstrap4.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../styles/bootstrap/datatables-responsive/js/dataTables.responsive.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../styles/bootstrap/datatables-responsive/js/responsive.bootstrap4.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../styles/bootstrap/datatables-buttons/js/dataTables.buttons.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../styles/bootstrap/datatables-buttons/js/buttons.bootstrap4.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../styles/bootstrap/datatables-buttons/js/buttons.html5.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../styles/bootstrap/datatables-buttons/js/buttons.print.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../styles/bootstrap/datatables-buttons/js/buttons.colVis.min.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
}).then(function () {
    loadScript("../scripts/datatablescript.js")
        .then(data => {
            console.log("Script loaded successfully", data);
        })
        .catch(err => {
            console.error(err);
        });
})

function getOrganization(ID) {
    fetch(url + 'organization/' + ID, {
        method: "GET",
        mode: 'cors'
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
            orgsaved = Object.assign(new Organization(), data);

            document.getElementById("OrgName").value = orgsaved.name;
            document.getElementById("AddressOrg").value = orgsaved.addres;
            document.getElementById("BudgetOrg").value = orgsaved.budget;
            document.getElementById("INNOrg").value = orgsaved.inn;
            document.getElementById("DateOrg").value = orgsaved.date_foundation.toString().substring(0, orgsaved.date_foundation.toString().length - 10);

            orgsaved.date_foundation = document.getElementById("DateOrg").value
        })
        .catch(error => console.log(error))
}

function SaveOrg() {
    nameorg = document.getElementById("OrgName").value
    addresorg = document.getElementById("AddressOrg").value
    dateorg = document.getElementById("DateOrg").value
    budgetorg = document.getElementById("BudgetOrg").value
    innorg = document.getElementById("INNOrg").value
    org = new Organization(nameorg, null, budgetorg, dateorg, addresorg, innorg)

    if (orgsaved.name === org.name && orgsaved.inn === org.inn && orgsaved.budget === org.budget && orgsaved.addres === org.addres && orgsaved.date_foundation === org.date_foundation) {
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
                orgsaved = Object.assign(new Organization(), data.data);
                orgsaved.date_foundation = document.getElementById("DateOrg").value
                alert(data.message)
            })
            .catch(error => console.log(error))
    }
}

async function getStratygies() {
    return new Promise((resolve) => {
        fetch(url + 'organization/' + ID + '/strategy/', {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                var strat
                for (var i in data.data) {
                    strategyIDS.push(data.data[i].id_strategy)
                    delete data.data[i].organization_id
                    strat = Object.assign(data.data[i]);
                    strat.date_start = strat.date_start.toString().substring(0, strat.date_start.toString().length - 10);
                    strat.date_end = strat.date_end.toString().substring(0, strat.date_end.toString().length - 10);
                    strategy.push(strat);
                }

                let table = document.querySelector("table");
                let header = Object.keys(strategy[0]);
                generateTableHead(table, header);
                generateTable(table, strategy, strategyIDS);
                addRowHandlers(table);
                resolve();
            })
            .catch(error => console.log(error))
    })
}

function AddStrategy() {
    namestrat = document.getElementById("NameStrategy").value
    descrstrat = document.getElementById("DescriptionStrategy").value
    datestartstrat = document.getElementById("DateStartStrategy").value
    dateendstrat = document.getElementById("DateEndStrategy").value
    donestrat = document.getElementById("DoneStrategy").checked

    strategypost = new Strategy(namestrat, null, descrstrat, datestartstrat, dateendstrat, donestrat)
    body = JSON.stringify(strategypost)

    if (namestrat !== "" && descrstrat !== "" && datestartstrat !== "" && dateendstrat !== "") {
        fetch(url + 'organization/' + ID + '/strategy', {
            method: "POST",
            mode: 'cors',
            body: body
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.message)
                if (data.message === null)
                    window.location = window.location
            })
            .catch(error => alert(error))
    } else
        alert("Заполните поля для добавления")
}

function EditStrategy() {
    if (selectedindex !== null && selectedindex !== 0) {
        namestrat = document.getElementById("NameStrategy").value
        descrstrat = document.getElementById("DescriptionStrategy").value
        datestartstrat = document.getElementById("DateStartStrategy").value
        dateendstrat = document.getElementById("DateEndStrategy").value
        donestrat = document.getElementById("DoneStrategy").checked

        strategypost = new Strategy(namestrat, null, descrstrat, datestartstrat, dateendstrat, donestrat)
        body = JSON.stringify(strategypost)

        if (namestrat !== "" && descrstrat !== "" && datestartstrat !== "" && dateendstrat !== "") {
            fetch(url + 'organization/' + ID + '/strategy/' + selectedindex, {
                method: "PUT",
                mode: 'cors',
                body: body
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data.message)
                    window.location = window.location
                })
                .catch(error => alert(error))
        } else
            alert("Заполните поля для изменения")
    } else
        alert("Выберите строку для изменения")
}

function DeleteRow(no) {
    window.Bridge.openDialog(url + 'organization/' + ID + '/strategy/' + no, "DeleteStrat")
}
