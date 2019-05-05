const { app, BrowserWindow } = require('electron');

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

class Main {
  private _app;
  private _win = null;

  constructor() {
    this._app = app;

    this._app.on('ready', this._createWindow);

    this._app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this._app.quit();
      }
    });

    this._app.on('activate', () => {
      if (this._win === null) {
        this._createWindow();
      }
    });
  }

  private _createWindow = (): void => {
    this._win = new BrowserWindow({
      width: 800,
      height: 600,
      show: false
    });

    this._win.loadURL(`file://${__dirname}/../index.html`);

    if (process.env.NODE_ENV === 'development') {
      this._win.webContents.openDevTools();
    }

    this._win.once('ready-to-show', () => {
      this._win.show();
    });

    this._win.on('closed', () => {
      this._app.quit();
    });
  }
}

new Main();