const {app, BrowserWindow, ipcMain, contextBridge, ipcRenderer, session, dialog}=require('electron')

function DeleteStr(url,text, win){
    dialog.showMessageBox(win,{
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
                })
                win.loadFile('./organization.html')
            }

            if (result.response === 0) {
                return 0;
            }
        })
}

module.exports={
    DeleteStr
}