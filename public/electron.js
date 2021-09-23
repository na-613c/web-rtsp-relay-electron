// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
// let server = require("./server.js");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const server = require('./server')

let mainWindow = null;
let status = 0

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    minWidth: 967,
    height: 768,
    minHeight: 650,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    // frame: false,
    icon: path.join(__dirname, "/logo512.png"),
    show: false,
  });
  mainWindow.setMenu(null);
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(url).then();
  process.env.NODE_ENV === 'development' && mainWindow.webContents.openDevTools();


  mainWindow.on("close", e => {
    if (status === 0) {
      e.preventDefault();
      e.sender.send("close-app", "start closing");
    } else app.quit();
  });
}

app.on('ready', () => {
  createWindow()
});

app.on('browser-window-created', function(e, window) {
  window.maximize();
  window.show();
});

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

app.on('window-all-closed', () => {
  server.exit();
  app.quit()
})
