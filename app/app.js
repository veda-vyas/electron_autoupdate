const electron = require('electron');

const app = electron.app;

var BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

let mainWindow;

var knex = require('knex')({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite3"
  }
});

app.on('window-all-closed', function() {
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //display useractivity
  ipcMain.on("mainWindowLoaded", function() {
    let result = knex.select("info").from("UserActivity")
    result.then(function(rows){
      mainWindow.webContents.send("result",rows);
    })
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
