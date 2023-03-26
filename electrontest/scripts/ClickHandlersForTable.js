setTimeout(function () {
    var link1 = document.getElementsByClassName('col-sm-12 col-md-7')[0];
    var link2 = document.getElementsByClassName('col-sm-12 col-md-6')[1];
    var link3 = document.getElementsByClassName('col-sm-12 col-md-7')[1];
    var link4 = document.getElementsByClassName('col-sm-12 col-md-6')[3];
    var link5 = document.getElementsByClassName('col-sm-12 col-md-7')[2];
    var link6 = document.getElementsByClassName('col-sm-12 col-md-6')[5];

    link1.addEventListener('click', clickhandlerEmployees);
    link2.addEventListener('click', clickhandlerEmployees);
    try {
        link3.addEventListener('click', clickhandlerTable1);
        link4.addEventListener('click', clickhandlerTable1);
        link5.addEventListener('click', clickhandlerTable2);
        link6.addEventListener('click', clickhandlerTable2);
    } catch (e) {
    }
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
        if (window.location.href.endsWith('/employee.html'))
            clickhandlerTable1()
    } catch (e) {
        console.log(e)
    }
}

function clickhandlerTable1() {
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

function clickhandlerTable2() {
    try {
        console.log('click')
        var table = document.getElementById("post1");
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