const Store=require("electron-store")
const {contextBridge} = require("electron");

const storage=new Store();

function getIDOrg() {
    // storage.set("id-org", 2);
    const ID= storage.get("id-org")

    if (ID) {}
    else {
        storage.set("id-org", 0);
    }

    return ID
}

// module.exports.getIds=getIDOrg()
contextBridge.exposeInMainWorld('Export', {
    getID:()=>getIDOrg()
})
