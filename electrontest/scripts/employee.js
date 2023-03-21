function GetData() {
    ID = window.Bridge.getData();

    console.log(ID)
}

GetData()
getDeparts()

function LoadFiles(){
    return new Promise(resolve => {
        loadScript("styles/bootstrap/datatables/jquery.dataTables.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
        resolve()
    }).then(function () {
        loadScript("styles/bootstrap/datatables-bs4/js/dataTables.bootstrap4.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-responsive/js/dataTables.responsive.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-responsive/js/responsive.bootstrap4.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/dataTables.buttons.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/buttons.bootstrap4.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/buttons.html5.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/buttons.print.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/datatables-buttons/js/buttons.colVis.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/bootstrap/select2/js/select2.full.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("styles/datatablescript.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        loadScript("scripts/ClickHandlersForTable.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    })
}

function addRows(employeesdata, emplIDS) {
    return new Promise((resolve, reject) => {
        let table = document.getElementById("example1");
        let header = Object.keys(employeesdata[0]);
        generateTableHead(table, header);
        generateTable(table, employeesdata, emplIDS, fkeyarray);
        addRowHandlers(table)
        resolve()
    }).then(function (){
        getTasks().then(function (){
            var combo = document.getElementsByClassName('option');

            for (var i = 0; i < combo.length; i++) {
                combo[i].addEventListener('click', function () {
                    selectedindexcombobox = this.id.toString().substring(8, this.id.length)
                })
            }

            LoadPostsForSelectedDep().then(function () {
            getEmployeePosts();
        })
    })
})
};

function AddRowsToTask(tasksForTable, tasksIDSForTable){
    let table = document.getElementById("table1");
    let header = Object.keys(tasksForTable[0]);
    generateTableHead(table, header);
    generateTable(table, tasksForTable, tasksIDSForTable, fkeyarray);
    addRowHandlers(table)
}


function LoadPostsForSelectedDep() {
    return new Promise(resolve => {
        let sum = document.getElementsByClassName('select2')[0]
        sum.innerHTML = "";
        resolve()
    }).then(function () {
        for (var i = 0; i < posts.length; i++) {
            let htmlinput = `<option id="dep` + posts[i].department_id + `post` + posts[i].id_post + `">` + posts[i].name + `</option>`
            if (posts[i].department_id.toString() === selectedindexcombobox.toString()) {
                let sum = document.getElementsByClassName('select2')[0]
                sum.insertAdjacentHTML('afterbegin', htmlinput);
            }
        }
    }).then(function () {
        if (selectedindex !== 0) {
            for (let i = 0; i < emplposts.length; i++) {
                if (emplposts[i].employee_id.toString() === selectedindex.toString()) {
                    let sum = document.getElementsByClassName('select2')[0]
                    let options = sum.getElementsByTagName('option')
                    for (let j = 0; j < options.length; j++) {
                        if (options[j].id.toString().substring(8, options[j].id.toString().length) === emplposts[i].post_id.toString()) {
                            options[j].selected = true;
                            break;
                        }
                    }
                }
            }
        }
    }).then(function () {
        loadScript("styles/bootstrap/select2/js/select2.full.min.js")
            .then(data => {
                console.log("Script loaded successfully", data);
            })
            .catch(err => {
                console.error(err);
            });
    }).then(function () {
        $('.select2').select2()

        $('.select2bs4').select2({
            theme: 'bootstrap4'
        })
    })
        .catch(e => {
           console.log(e)
        })
}

function CheckLengthForPass(element){
    if (element.id==='SeriaEmployee')
    {
        if (element.value.length > 6) {
            element.value = element.value.slice(0,6);
        }
    }
    else
    {
        if (element.value.length > 4) {
            element.value = element.value.slice(0,4);
        }
    }
        var sanitized = $(element).val().replace(/[^0-9]/g, '');
        $(element).val(sanitized);
}