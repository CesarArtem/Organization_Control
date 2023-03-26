const {contextBridge, ipcMain, ipcRenderer, dialog} = require('electron')
const Store = require("electron-store")

const storage = new Store();

getIDOrg=function () {
    storage.set("id-org", 2);
    let ID= storage.get("id-org")

    if (ID) {}
    else {
        storage.set("id-org", 2);
    }

   return ID
}

let getData = () => {
    let ID = storage.get("id-org")

    if (ID === null) {
        storage.set("id-org", 0);
    }

    ipcRenderer.send("getData", ID);
    return ID
};

let saveData = (ID) => {
    let check = storage.get("id-org")

    if (check !== null) {
        storage.set("id-org", ID)
    } else {
        storage.set("id-org", 0);
    }

    ipcRenderer.send("saveData", ID);
};

let openDialog = (url,event, loadfile) => {
    return ipcRenderer.send("openDialog", event, url, loadfile);
};

let bridge = {
    getData,
    saveData,
    openDialog,
};

contextBridge.exposeInMainWorld("Bridge", bridge);