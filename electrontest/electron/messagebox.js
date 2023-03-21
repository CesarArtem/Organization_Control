const {app, BrowserWindow, ipcMain, contextBridge, ipcRenderer, session, dialog} = require('electron')

function DeleteStr(url, text, win) {
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
                    win.loadFile('./organization.html')
                })
            }

            if (result.response === 0) {
                return 0;
            }
        })
}

function DeleteEmployee(url, text, win) {
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
                    win.loadFile('./employee.html')
                })
            }

            if (result.response === 0) {
                return 0;
            }
        })
}

function DeleteTask(url, text, win) {
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
                    win.loadFile('./employee.html')
                })
            }

            if (result.response === 0) {
                return 0;
            }
        }).catch(error=>console.log(error))
}

module.exports = {
    DeleteStr,
    DeleteEmployee,
    DeleteTask
}