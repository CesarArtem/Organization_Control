var headerText = `<div class="menu" name="nav" id="nav" onmouseout="HideNavigation(nav)" onmouseover="ShowNavigation(nav)">
        <img class="imgformenu" src="styles/main-menu.png" align="right">
        <nav class="menu-list">
            <div class="menu-div">
                <a href="#" style="--clr:#39FF14"><span>Главная</span><i></i></a>
                    <img class="menu-img" src="styles/home.png" align="right">
            </div>
            <div class="menu-div">
                <a href="#" style="--clr:#39FF14"><span>Финансы</span><i></i></a>
                <img class="menu-img" src="styles/stats.png" align="right">
            </div>
            <div class="menu-div">
                <a href="#" style="--clr:#39FF14"><span>Отделы</span><i></i></a>
                <img class="menu-img" src="styles/it-department.png" align="right">
            </div>
            <div class="menu-div">
                <a href="#" style="--clr:#39FF14"><span>Сотрудники</span><i></i></a>
                <img class="menu-img" src="styles/employees.png" align="right">
            </a>
            </div>
            <div class="menu-div">
                <a href="#" style="--clr:#39FF14"><span>Организация</span><i></i></a>
                <img class="menu-img" src="styles/strategy.png" align="right"/>
            </div>
        </nav>
    </div>`;

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

function setHeader() {
    // var head= create(headerText)
    // document.body.insertBefore(head, document.body.childNodes[1]);

    document.getElementById('headdiv').innerHTML = headerText;
}

setHeader();