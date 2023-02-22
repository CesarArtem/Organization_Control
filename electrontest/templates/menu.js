var headerText = `<div class="menu" name="nav" id="nav" onmouseout="HideNavigation(nav)" onmouseover="ShowNavigation(nav)">
        <img class="imgformenu" src="styles/main-menu.png" align="right">
        <nav class="menu-list">
            <div class="menu-div">
                <a href="index.html" style="--clr:#39FF14" class="menu-a"><span>Главная</span><i></i></a>
                    <img class="menu-img" src="styles/home.png" align="right">
            </div>
            <div class="menu-div">
                <a href="finances.html" style="--clr:#39FF14" class="menu-a"><span>Финансы</span><i></i></a>
                <img class="menu-img" src="styles/stats.png" align="right">
            </div>
            <div class="menu-div">
                <a href="department.html" style="--clr:#39FF14" class="menu-a"><span>Отделы</span><i></i></a>
                <img class="menu-img" src="styles/it-department.png" align="right">
            </div>
            <div class="menu-div">
                <a href="employee.html" style="--clr:#39FF14" class="menu-a"><span>Сотрудники</span><i></i></a>
                <img class="menu-img" src="styles/employees.png" align="right">
            </a>
            </div>
            <div class="menu-div">
                <a href="organization.html" style="--clr:#39FF14" class="menu-a"><span>Организация</span><i></i></a>
                <img class="menu-img" src="styles/strategy.png" align="right"/>
            </div>
        </nav>
    </div>`;

function setHeader() {
    document.getElementById('headdiv').innerHTML = headerText;
}
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

var fragment = create(headerText);
// You can use native DOM methods to insert the fragment:
document.body.insertBefore(fragment, document.body.childNodes[0]);

// setHeader();