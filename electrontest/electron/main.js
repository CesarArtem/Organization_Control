const path = require('path')
const url = require('url')
const {app, BrowserWindow, ipcMain, contextBridge, ipcRenderer, session, dialog} = require('electron')
const Store = require("electron-store")
var tools = require('./messagebox');

const storage = new Store();

let win

function createWindow() {
    const bounds = getWinBounds();
    const pos = getWinPosition();

    win = new BrowserWindow({
        width: bounds[0],
        height: bounds[1],
        x: pos[0],
        y: pos[1],
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            allowRunningInsecureContent: false,
            sandbox: false,
            preload: path.join(__dirname, '/preload.js')
        }
    })

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

    win.on("moved", () => savePosition(win.getPosition()));
    win.on("resized", () => saveBounds(win.getSize()));

    let res = storage.get("id-org")
    console.log(res)
    if (!res) {
        storage.set("id-org", 0)
        win.loadFile('./auth.html')
    } else
        win.loadFile('./index.html')
    return win
}

function getIDOrg() {

    let ID = storage.get("id-org")

    if (ID) {
    } else {
        storage.set("id-org", 0);
    }
}

ipcMain.on("saveData", (sender, ID) => {
})

ipcMain.on("getData", (sender) => {
    let ID = getIDOrg()
})

ipcMain.on('openDialog', (sender, event, url) => {
    switch (event) {
        case "DeleteStrat":
            tools.DeleteStr(url, "Вы действительно хотите удалить эту стратегию?", win)
            break;
        case "DeleteEmployee":
            tools.DeleteEmployee(url, "Вы действительно хотите удалить этого сотрудника?", win)
            break;
        case "DeleteTask":
            tools.DeleteTask(url, "Вы действительно хотите удалить эту задачу?", win)
            break;
    }
})

app.on('ready', () => {
    createWindow();
})

app.on('window-all-closed', () => {
    app.quit();
})

function getWinBounds() {
    const default_bounds = [1080, 1280];

    const size = storage.get("win-size");
    if (size) return size;
    else {
        storage.set("win-size", default_bounds);
        return default_bounds;
    }
}

function getWinPosition() {
    const default_position = [0, 0]

    const pos = storage.get("win-pos");
    if (pos) return pos;
    else {
        storage.set("win-pos", default_position);
        return default_position;
    }
}

function saveBounds(bounds) {
    storage.set("win-size", bounds);
}

function savePosition(position) {
    storage.set("win-pos", position);
}