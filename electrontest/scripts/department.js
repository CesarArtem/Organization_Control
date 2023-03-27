GetData()
getDeparts().then(function () {
    var select1 = document.getElementsByClassName('select')[0];
    var combo = select1.getElementsByClassName('option');

    for (var i = 0; i < combo.length; i++) {
        combo[i].addEventListener('click', function () {
            selecteddepartmentforpost = this.id.toString().substring(9, this.id.length)
        })
    }

    var select2 = document.getElementsByClassName('select')[1];
    var combo2 = select2.getElementsByClassName('option');
    for (var i = 0; i < combo2.length; i++) {
        combo2[i].addEventListener('click', function () {
            selecteddepartmentforgoals = this.id.toString().substring(9, this.id.length)
        })
    }
}).then(function () {
    getEmployees();
});

function buildPolar() {
    const ctxrem = document.getElementById('polarchart');
    ctxrem.remove();
    var htmlchart = `<canvas id="polarchart"></canvas>`
    document.getElementsByClassName('card-body')[0].insertAdjacentHTML('beforeend', htmlchart);
    const ctx = document.getElementById('polarchart');

    var departslabels = [];
    var colors = [];
    for (i = 0; i < departs.length; i++) {
        departslabels.push(departs[i].name.toString());
        colors.push(getRandomColor());
        var filteredemployees=employees.filter(em=>em.department_id.toString()===departs[i].id_department.toString()).length;
        employeesdepartmentsumms.push(filteredemployees);
    }

    console.log(employeesdepartmentsumms);

    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: departslabels,
            datasets: [
                {
                    label: 'Сотрудники',
                    data: employeesdepartmentsumms,
                    backgroundColor: colors,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    pointLabels: {
                        display: true,
                        centerPointLabels: true,
                        font: {
                            size: 18
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        },
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function GetData() {
    ID = window.Bridge.getData();

    console.log(ID)
}

function LoadFiles() {
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
        generateTableHead(table, header);
        generateTable(table, data, IDS, fkeyarray);
        addRowHandlers(table);
    } catch (e) {
        console.log(e + "В таблице нет данных")
    }
}