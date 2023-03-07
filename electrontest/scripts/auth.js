const url='http://127.0.0.1:8000/api/'

function Create(){
    //API создания организации
}

function SaveData(ID){
    window.Bridge.saveData(ID)
    window.location="./index.html"
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
                SaveData(data)
                console.log(data)
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