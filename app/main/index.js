const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

// import { autoUpdater } from 'electron-updater';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = global.win = new BrowserWindow({width: 1024, height: 768});

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'renderer/index.html'),
    protocol: 'file',
    slashes: true,
  }));

  win.on('closed', () => {
    win = null;
  });

  win.webContents.on('devtools-opened', () => {
    win.focus();

    setImmediate(() => {
      win.focus();
    });
  });

  return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (win === null) {
    createWindow();
  }
});
