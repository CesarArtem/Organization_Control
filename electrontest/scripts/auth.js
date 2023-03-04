function Create(){
    //API создания организации
    let ID=1;

    window.Bridge.saveData(ID);
    window.location="./index.html"
}

function GetOrg(){
    //API нахождения ID по ключу
    let ID=2;
    window.Bridge.saveData(ID)
    window.location="./index.html"
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