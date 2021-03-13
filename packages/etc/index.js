const { app, BrowserWindow, Tray, Menu, ipcMain, dialog } = require('electron');

let tray = null;
let win = null;

app.whenReady().then(() => {
    tray = new Tray(`${__dirname}/tray.png`);

    tray.setContextMenu(
        Menu.buildFromTemplate([
            { label: 'Item1', type: 'radio' },
            { label: 'Item2', type: 'radio', checked: true },
        ]),
    );

    tray.setToolTip('This is my application.');

    tray.on('click', () => {
        console.log('tray click');
    });

    tray.on('right-click', () => {
        console.log('tray right-click');
    });
});

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();

    ipcMain.on('showOpenDialog', () => {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory', 'multiSelections'],
            filters: [
                { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
                { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
            ], // filters 값으로 표시하거나 선택할 수 있는 파일의 종류를 설정할 수 있습니다.
        });
    });

    ipcMain.on('showSaveDialog', () => {
        dialog.showSaveDialog({
            title: 'title',
            buttonLabel: 'save',
            message: 'message',
        });
    });

    ipcMain.on('showMessageBox', () => {
        dialog.showMessageBox(
            {
                type: 'info', // none, info, error, question, warning
                message: 'message',
                detail: 'detail',
                buttons: ['confirm', 'cancel'],
                checkboxLabel: 'check',
                checkboxChecked: false,
            },
            (res, checked) => {
                console.log(res === 0 ? 'confirm' : 'cancel', checked);
            },
        );
    });

    ipcMain.on('showErrorBox', () => {
        dialog.showErrorBox('title', 'content');
    });
});
