const { app, BrowserWindow, ipcMain } = require('electron');

let win = null;

app.on('ready', () => {
  win = new BrowserWindow();
  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();  // devtools 를 표시

  ipcMain.on('async-message', (event, arg) => {
    console.log(arg);  // 'async ping'
    event.sender.send('async-reply', 'async pong')
  });

  ipcMain.on('sync-message', (event, arg) => {
    console.log(arg);  // 'sync ping'
    event.returnValue = 'sync pong';
  });
});