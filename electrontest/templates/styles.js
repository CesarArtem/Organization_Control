function ShowNavigation() {
    element = document.getElementById("nav")
    element.style.transform = "translateX(0px)"
}

function HideNavigation() {
    element = document.getElementById("nav")
    element.style.transform = "translateX(-80%)"
}

function PaintItemCombobox(element) {
    element.style.backgroundColor = "#cccccc";
}

function UnPaintItemCombobox(element) {
    element.style.backgroundColor = "#ddd";
}

function HideScrollForNumber() {

    document.addEventListener("wheel", (event) => {
        if (document.activeElement.type === "number") {
            document.activeElement.blur();
        }
    });
}

function CheckBoxClick(check, form) {
    if (check.checked) {
        element = form.getElementsByClassName("form-control")
        for (var i = 0; i < element.length; i++) {
            if (element[i].id!=='BudgetOrg')
            element[i].disabled = false;
        }
    } else {
        element = form.getElementsByClassName("form-control")
        for (var i = 0; i < element.length; i++) {
            element[i].disabled = true;
        }
    }
};

function HideFromStart() {
    form=document.getElementById("form1")
    element = form.getElementsByClassName("form-control")
    for (var i = 0; i < element.length; i++) {
        element[i].disabled = true;
    }
}

HideScrollForNumber();