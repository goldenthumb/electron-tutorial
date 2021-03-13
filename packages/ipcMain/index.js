const { app, BrowserWindow, ipcMain } = require('electron');

let win = null;

app.on('ready', () => {
    win = new BrowserWindow({
        // 브라우저에서 module, require을 사용하기 위해서는 아래와 같이 옵션을 사용해줘야 합니다.
        // 5.0 이상 버전부터는 default 값이 false입니다.
        // 아래 옵션을 사용하기에 앞서 결정을 내리기 전에 보안 및 책임 가이드를 읽어보는 것을 권장합니다.
        // https://www.electronjs.org/docs/tutorial/security
        // https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content

        webPreferences: {
            nodeIntegration: true,
        },

        // 하지만 위의 방식은 보안상 문제가 많고 사용하지 않을 것을 권장하고 있기 때문에
        // preload를 활용해서 필요한 것만 노출하는 것도 방법입니다.

        // https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content

        // https://github.com/reZach/secure-electron-template
        // https://stackoverflow.com/questions/44391448/electron-require-is-not-defined
    });

    win.loadFile('index.html');
    win.webContents.openDevTools(); // devtools 를 표시

    ipcMain.on('asyncMessage', (event, arg) => {
        console.log(arg); // 'async ping'
        event.sender.send('asyncReply', 'async pong');
    });

    ipcMain.on('syncMessage', (event, arg) => {
        console.log(arg); // 'sync ping'
        event.returnValue = 'sync pong';
    });
});
