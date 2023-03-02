
const path = require('path')
const url=require('url')
const {app, BrowserWindow}=require('electron')

const {getWinSettings,getWinPosition, saveBounds, savePosition}=require("./preferences");

let win

function createWindow() {

    const bounds=getWinSettings();

    const pos=getWinPosition();

    win = new BrowserWindow({
        width: bounds[0],
        height: bounds[1],
        x:pos[0],
        y:pos[1],
        autoHideMenuBar:true,
    })

    win.on("moved", ()=> savePosition(win.getPosition()));
    win.on("resized", ()=> saveBounds(win.getSize()));

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    // win.webContents.openDevTools();

    win.on('closed', ()=> {
        win=null;
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', ()=>{
    app.quit();
})

global.sharedObj =  { entries : entries };

