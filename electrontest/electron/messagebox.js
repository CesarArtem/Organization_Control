const {app, BrowserWindow, ipcMain, contextBridge, ipcRenderer, session, dialog} = require('electron')
const Store = require("electron-store")

const storage = new Store();

function DeleteData(url, text, win, loadfile) {
    dialog.showMessageBox(win, {
        'title': 'Подтверждение',
        'message': text,
        'buttons': [
            'Нет',
            'Да'
        ]
    })
        .then((result) => {
            if (result.response !== 0) {
                fetch(url, {
                    method: "DELETE",
                    mode: 'cors',
                })
                    .then(res => {
                        return res.json()
                    }).then(function () {
                    win.loadFile(loadfile)
                })
            }

            if (result.response === 0) {
                return 0;
            }
        })
}

function Exit(url, text, win, loadfile) {
    dialog.showMessageBox(win, {
        'title': 'Выход',
        'message': text,
        'buttons': [
            'Нет',
            'Да'
        ]
    })
        .then((result) => {
            if (result.response !== 0) {
                storage.set("id-org", 0);
                win.loadFile(loadfile);
            }

            if (result.response === 0) {
                return 0;
            }
        })
}

module.exports = {
    DeleteData,
    Exit
}