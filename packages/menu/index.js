const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');

let main = null;

app.on('ready', () => {
    main = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });

    main.loadURL(`file://${__dirname}/index.html`);
    main.webContents.openDevTools();

    // 1. top menu example
    const template = [
        {
            label: 'first',
            submenu: [
                {
                    label: 'item1',
                    click() {
                        console.log('top menu item 1 clicked');
                    },
                },
            ],
        },
        {
            label: 'second',
            submenu: [
                {
                    label: 'item2',
                    click() {
                        console.log('top menu second 1 clicked');
                    },
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    console.log('menu', Menu.getApplicationMenu());
    // Menu 혹은 null 을 반환합니다. 애플리케이션 메뉴가 설정되어있다면 애플리케이션 메뉴를,
    // 설정되어있지 않으면 null 을 반환합니다.

    // 2. contextmenu example
    const contextMenu = new Menu();

    const firstItem = new MenuItem({
        label: 'item1',
        click() {
            console.log('context menu item 1 clicked');
        },
    });

    const separator = new MenuItem({
        type: 'separator',
    });

    const secondItem = new MenuItem({
        label: 'item2',
        type: 'checkbox',
        checked: true,
        click() {
            console.log('context menu item 2 clicked');
        },
    });

    contextMenu.append(firstItem);
    contextMenu.append(separator);
    contextMenu.append(secondItem);

    ipcMain.on('showContextMenu', () => {
        contextMenu.popup(BrowserWindow.getFocusedWindow());
    });
});
