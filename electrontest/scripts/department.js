
GetData()
getDeparts().then(function (){
        var select1=document.getElementsByClassName('select')[0];
        var combo = select1.getElementsByClassName('option');

        for (var i = 0; i < combo.length; i++) {
            combo[i].addEventListener('click', function () {
                selecteddepartmentforpost = this.id.toString().substring(9, this.id.length)
            })
        }

    var select2=document.getElementsByClassName('select')[1];
    var combo2 = select2.getElementsByClassName('option');
    console.log(select2)
    console.log(select1)
    for (var i = 0; i < combo2.length; i++) {
        combo2[i].addEventListener('click', function () {
            selecteddepartmentforgoals = this.id.toString().substring(9, this.id.length)
        })
    }
})

function GetData() {
    ID = window.Bridge.getData();

    console.log(ID)
}

function LoadFiles(){
    return new Promise(resolve => {
        loadScript("../styles/bootstrap/datatables/jquery.dataTables.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
        resolve()
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
    }).then(function () {
        loadScript("../scripts/ClickHandlersForTable.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    })
}

function addRows(data, IDS, tablename) {
    try {
        let table = document.getElementById(tablename);
        let header = Object.keys(data[0]);
        console.log(fkeyarray.length)
        generateTableHead(table, header);
        generateTable(table, data, IDS, fkeyarray);
        addRowHandlers(table);
    } catch (e){ console.log(e+"В таблице нет данных")}
}