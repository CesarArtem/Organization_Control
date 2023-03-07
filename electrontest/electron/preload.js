const {contextBridge, ipcMain, ipcRenderer}=require('electron')
const Store=require("electron-store")
//
const storage=new Store();
//
// const orgBridge=require('../renderfiles/organization_preload.js')
// const employeeBridge=require('../renderfiles/employee_preload.js')
// const indexBridge=require('../renderfiles/index_preload.js')
//
// if (location.href.endsWith('organization.html')){
//     Bridge=orgBridge
// } else if (location.href.endsWith('employee.html')){
//     Bridge=orgBridge;
// }else if (location.href.endsWith('index.html')){
//     Bridge=orgBridge;
// }
//
// getIDOrg=function () {
//     storage.set("id-org", 2);
//     let ID= storage.get("id-org")
//
//     if (ID) {}
//     else {
//         storage.set("id-org", 2);
//     }
//
//    return ID
// }
//
// module.exports.IDOrg=getIDOrg()
//
// contextBridge.exposeInMainWorld('Bridge', Bridge)
// contextBridge.exposeInMainWorld('Export', {
//     getID:()=>getIDOrg()
// })

let getData=()=>{
    let ID= storage.get("id-org")

    if (ID===null) {
        storage.set("id-org", 0);
    }

    ipcRenderer.send("getData", ID);
    return ID
};

let saveData=(ID)=>{
    let check=storage.get("id-org")

    if (check!==null) {
        storage.set("id-org", ID)
    }
    else {
        storage.set("id-org", 0);
    }

    ipcRenderer.send("saveData", ID);
};

let bridge= {
    getData,
    saveData
};

contextBridge.exposeInMainWorld("Bridge", bridge);