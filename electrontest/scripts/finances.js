var chart;
var profits = [];
var losses = [];
const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];



GetData()

function GetData() {
    ID = window.Bridge.getData();

    console.log(ID)
}

getFinances().then(function () {
    LoadFiles();
}).then(function () {
    CountDataForCharts();
}).then(function () {
    var select = document.getElementsByClassName('select')[0];
    var combo = select.getElementsByClassName('option');

    for (var i = 0; i < combo.length; i++) {
        combo[i].addEventListener('click', function () {
            selectedyear = this.id.toString().substring(5, this.id.length)

            if (selectedyear.toString() === 'AllTime') {
                buildAllTime();
            } else {
                buildBar();
                buildDonut();
                buildLine();
            }
        })
    }
    selectedyear = combo[0].id.toString().substring(5, combo[0].id.length)
}).then(function () {
    if (selectedyear.toString() === 'AllTime') {
        buildAllTime();
    } else {
        buildBar();
        buildDonut();
        buildLine();
    }
    getOrganization(ID)
})

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

function buildDonut() {
    var profit, loss;
    profit = profits.reduce(add, 0);
    loss = losses.reduce(add, 0);
    const ctxrem = document.getElementById('donutchart');
    ctxrem.remove();
    var htmlchart = `<canvas id="donutchart"></canvas>`
    document.getElementsByClassName('card-body')[0].insertAdjacentHTML('beforeend', htmlchart);
    const ctx = document.getElementById('donutchart');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Доходы',
                'Расходы',
            ],
            datasets: [{
                data: [profit, loss],
                backgroundColor: [
                    'rgb(120, 255, 124)',
                    'rgb(255, 99, 132)'
                ],
                hoverOffset: 4
            }]
        },
    });
}

function buildBar() {
    const ctxrem = document.getElementById('barchart');
    ctxrem.remove();
    var htmlchart = `<canvas id="barchart"></canvas>`
    document.getElementsByClassName('card-body')[1].insertAdjacentHTML('beforeend', htmlchart);
    const ctx = document.getElementById('barchart');

    profits = bardataprofit.find(b => b.year.toString() === selectedyear.toString());
    losses = bardataloss.find(b => b.year.toString() === selectedyear.toString());

    profits = Object.values(profits);
    losses = Object.values(losses);
    profits.shift()
    losses.shift()

    let delayed;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: MONTHS,
            datasets: [
                {
                    label: 'Прибыль',
                    data: profits,
                    backgroundColor: 'rgb(120, 255, 124)',
                },
                {
                    label: 'Убыток',
                    data: losses,
                    backgroundColor: 'rgb(255, 99, 132)',
                },]
        },
        options: {
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 50 + context.datasetIndex * 25;
                    }
                    return delay;
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}

function buildLine() {
    const ctxrem = document.getElementById('linechart');
    ctxrem.remove();
    var htmlchart = `<canvas id="linechart"></canvas>`
    document.getElementsByClassName('card-body')[2].insertAdjacentHTML('beforeend', htmlchart);
    const ctx1 = document.getElementById('linechart');

    var linebudget=Object.values(budget.find(b=>b[0].toString()===selectedyear.toString()));

    console.log(linebudget)
    linebudget.shift();
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: MONTHS,
            datasets: [{
                label: 'Бюджет компании',
                data: linebudget,
                fill: 'origin',
                borderColor: 'rgb(120, 255, 124)',
                segment: {
                    borderColor: ctx => down(ctx, 'rgb(255, 99, 132)'),
                },
                tension: 0.1
            }],
        },
        options: [{
            fill: false,
            interaction: {
                intersect: false
            },
            radius: 0,
        }],
    });

    const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

}

function buildAllTime() {
    profits.splice(0, profits.length);
    losses.splice(0, losses.length);
    var ctxrem = document.getElementById('donutchart');
    ctxrem.remove();
    var htmlchart = `<canvas id="donutchart"></canvas>`
    document.getElementsByClassName('card-body')[0].insertAdjacentHTML('beforeend', htmlchart);
    var ctx = document.getElementById('donutchart');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Доходы',
                'Расходы',
            ],
            datasets: [{
                data: [profitsumm, losssumm],
                backgroundColor: [
                    'rgb(120, 255, 124)',
                    'rgb(255, 99, 132)'
                ],
                hoverOffset: 4
            }]
        },
    });


    ctxrem = document.getElementById('barchart');
    ctxrem.remove();
    var htmlchart = `<canvas id="barchart"></canvas>`
    document.getElementsByClassName('card-body')[1].insertAdjacentHTML('beforeend', htmlchart);
    ctx = document.getElementById('barchart');
    for (i = 0; i < bardataprofit.length; i++) {
        var temp = Object.values(bardataprofit[i]);
        temp.shift();
        var summ = temp.reduce(add, 0);
        profits.push(summ);
        temp = Object.values(bardataloss[i]);
        temp.shift();
        var summ = temp.reduce(add, 0);
        losses.push(summ);
    }

    console.log(profits)
    console.log(losses)
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Прибыль',
                    data: profits,
                    backgroundColor: 'rgb(120, 255, 124)',
                },
                {
                    label: 'Убыток',
                    data: losses,
                    backgroundColor: 'rgb(255, 99, 132)',
                },]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });


    ctxrem = document.getElementById('linechart');
    ctxrem.remove();
    var htmlchart = `<canvas id="linechart"></canvas>`
    document.getElementsByClassName('card-body')[2].insertAdjacentHTML('beforeend', htmlchart);
    const ctx1 = document.getElementById('linechart');

    var linebudget=[];
    var labels=[];
    for (i=0;i<budget.length;i++)
    {
        linebudget.push(budget[i][1]);
        labels.push(years[i]);
    }
    linebudget.push(budget[budget.length-1][12])

    labels.push('Текущий бюджет');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Бюджет компании на начало года',
                data: linebudget,
                fill: 'origin',
                borderColor: 'rgb(120, 255, 124)',
                segment: {
                    borderColor: ctx => down(ctx, 'rgb(255, 99, 132)'),
                },
                tension: 0.1
            }],
        },
        options: [{
            fill: false,
            interaction: {
                intersect: false
            },
            radius: 0,
        }],
    });

    const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
}

function add(accumulator, a) {
    return accumulator + a;
}