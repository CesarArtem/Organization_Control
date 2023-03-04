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

let saveData=()=>{
    storage.set("id-org", 2);
    let ID= storage.get("id-org")

    if (ID) {}
    else {
        storage.set("id-org", 2);
    }

   return ID
    ipcRenderer.send("saveData", ID);
};

let bridge= {
    saveData,
};

contextBridge.exposeInMainWorld("Bridge", bridge);