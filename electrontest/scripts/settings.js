let ID

function GetData() {
    ID = window.Bridge.getData();

    console.log(ID)
}

GetData()
getOrganization(ID)
HideFromStart()

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
            document.getElementById("OrgKey").value = orgsaved.auth_key;
            document.getElementById("DateOrg").value = orgsaved.date_foundation.toString().substring(0, orgsaved.date_foundation.toString().length - 10);

            orgsaved.date_foundation = document.getElementById("DateOrg").value
        })
        .catch(error => console.log(error))
}

async function execCopy(elem) {
    let text =document.getElementById("OrgKey").value;
    await navigator.clipboard.writeText(text);
    elem.innerHTML="Ключ скопирован";
    elem.style.transition="1s";
    elem.style.backgroundColor="#399E5A";
    elem.addEventListener('mouseover', function (){
        elem.style.backgroundColor="rgb(0,105,217)";
    })
    elem.addEventListener('mouseout', function (){
        elem.style.backgroundColor="#399E5A";
    })
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
                window.location=window.location
                alert(data.message)
            })
            .catch(error => console.log(error))
    }
}

function Exit(){
    window.Bridge.openDialog('', "Exit", './pages/auth.html')
}