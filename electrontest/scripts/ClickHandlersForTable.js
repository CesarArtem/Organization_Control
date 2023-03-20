setTimeout(function () {
    var link1 = document.getElementsByClassName('col-sm-12 col-md-7')[0];
    var link2 = document.getElementsByClassName('col-sm-12 col-md-6')[1];
    var link3 = document.getElementsByClassName('col-sm-12 col-md-7')[1];
    var link4 = document.getElementsByClassName('col-sm-12 col-md-6')[3];

    link1.addEventListener('click', clickhandlerEmployees)
    link2.addEventListener('click', clickhandlerEmployees)
    link3.addEventListener('click', clickhandlerTasks)
    link4.addEventListener('click', clickhandlerTasks)
}, 500)

function clickhandlerEmployees() {
    try {
        console.log('click')
        var table = document.getElementById("example1");
        var rows = table.getElementsByTagName("tr");
        selectedindex = 0
        for (i = 0; i < rows.length; i++) {
            var currentRow = table.rows[i];
            currentRow.style.backgroundColor = ""
        }
        clickhandlerTasks()
    } catch (e) {
        console.log(e)
    }
}
function clickhandlerTasks() {
    try {
        console.log('click')
        var table = document.getElementById("table1");
        var rows = table.getElementsByTagName("tr");
        selectedindex = 0
        for (i = 0; i < rows.length; i++) {
            var currentRow = table.rows[i];
            currentRow.style.backgroundColor = ""
        }
    } catch (e) {
        console.log(e)
    }
}