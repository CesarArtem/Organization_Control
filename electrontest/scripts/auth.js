function CheckID() {
    let statusID
    let ID=window.Bridge.getData()
    console.log(ID)
    fetch(url + 'organization/' + ID, {
        method: "GET",
        mode: 'cors'
    })
        .then(res => {
            statusID = res.status
            console.log(statusID)
            console.log(res)
        })
        .then(data => {
            console.log(data)
            if (statusID===200)
            {
                SaveData(ID)
            }
        })
        .catch(error => alert(error))
}

function Create(){
    nameorg=document.getElementById("OrgName").value
    addresorg=document.getElementById("AddressOrg").value
    dateorg=document.getElementById("DateOrg").value
    innorg=document.getElementById("INNOrg").value

    org=new Organization(nameorg, null, 0, dateorg, addresorg, innorg)
    body=JSON.stringify(org)
    fetch(url+'organization', {
        method: "POST",
        mode: 'cors',
        body:body
    })
        .then(res=>
        {
            statusfetch=res.status
            if (res.status===200)
                return res.json()
            else
                alert("Ошибка!")
        })
        .then(data=>{
            if (statusfetch===200) {
                SaveData(data.id_organization)
                console.log(data.id_organization)
            }
        })
        .catch(error=>alert(error))
}

function SaveData(ID){
    window.Bridge.saveData(ID)
    console.log(window.Bridge.getData())
    window.location="../pages/index.html"
}

function GetOrg(){
    keyorg=document.getElementById("OrgKey").value
    let status
    fetch(url+'organization/'+keyorg, {
        method: "PATCH",
        mode: 'cors'
    })
        .then(res=>
        {
            status=res.status
            if (res.status===200)
                return res.json()
            else if (res.status===500)
                alert("Неверный код!")
            else
                alert("Ошибка!")
        })
        .then(data=>{
            if (status===200) {
                SaveData(data.id_organization)
                console.log(data.id_organization)
            }
        })
        .catch(error=>alert(error))
}

function ChangeForm(){
    form1=document.getElementById("form1")
    form2=document.getElementById("form2")

    if (form1.style.display==='none')
    {
        form1.style.display='flex'
        form2.style.display='none'
    }
    else
    {
        form1.style.display='none'
        form2.style.display='flex'
    }
}