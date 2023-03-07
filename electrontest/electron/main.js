const path = require('path')
const url=require('url')
const {app, BrowserWindow, ipcMain, contextBridge, ipcRenderer, session}=require('electron')
const Store=require("electron-store")

const storage=new Store();

let win

function createWindow() {
    const bounds=getWinBounds();
    const pos=getWinPosition();

    win = new BrowserWindow({
        width: bounds[0],
        height: bounds[1],
        x:pos[0],
        y:pos[1],
        autoHideMenuBar:true,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: true,
            allowRunningInsecureContent: false,
            sandbox:false,
            preload: path.join(__dirname, '/preload.js')
        }
    })

    win.loadFile('./auth.html')
    win.webContents.openDevTools();

    win.on('closed', ()=> {
        win=null;
    });

    win.on("moved", ()=> savePosition(win.getPosition()));
    win.on("resized", ()=> saveBounds(win.getSize()));

    let res=storage.get("id-org")
    console.log(res)
    if (!res) {
        storage.set("id-org", 0)
    }
}

function getIDOrg() {

    let ID= storage.get("id-org")

    if (ID) {}
    else {
        storage.set("id-org", 0);
    }
}

ipcMain.on("saveData", (sender, ID)=>{
})

ipcMain.on("getData", (sender)=>{
    let ID=getIDOrg()
})

app.on('ready', ()=>{
    createWindow();
    // getIDOrg()
})

app.on('window-all-closed', ()=>{
    app.quit();
})

function  getWinBounds(){
    const default_bounds=[1080, 1280];

    const size=storage.get("win-size");
    if (size) return size;
    else {
        storage.set("win-size", default_bounds);
        return default_bounds;
    }
}

function  getWinPosition(){
    const default_position=[0,0]

    const pos=storage.get("win-pos");
    if (pos) return pos;
    else {
        storage.set("win-pos", default_position);
        return default_position;
    }
}

function saveBounds(bounds){
    storage.set("win-size", bounds);
}

function savePosition(position){
    storage.set("win-pos", position);
}