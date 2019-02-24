// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron');
const mongoose = require('mongoose');
require('electron-reload')(__dirname);

mongoose.connect("mongodb://twriter:Ksw23b99GuQDd9w@ds024748.mlab.com:24748/botclients",{
  useNewUrlParser:true
},function (err) {
  if (err){
    console.log(err);
  } else console.log('connected to db')
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let FAQWindow;
let authWindow;

let isAuthed = false;

var usersSchema = new mongoose.Schema({
  login:String,
  password:String
});

var User = mongoose.model("Users",usersSchema);
User.create([{
  login:"vitaliy",
  password:"123"
},
  {
    login:"dimas",
    password:"234"
  }],function (err,data) {
  if (err){
    console.log("problem");
  } else {
    console.log(`data added:${data}`);
  }
});

const users = [{
  login:"user1",
  password:"123"
  },
  {
    login:"user2",
    password:"234"
  }
  ];

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    backgroundColor:"#27272d",
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  if (isAuthed){
    mainWindow.loadFile('index.html');
  } else createAuthWindow();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});
function createFAQWindow() {
  FAQWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor:"#27272d",
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  FAQWindow.loadFile('faq.html');
}

function createAuthWindow(){
  authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title:"Login",
    backgroundColor:"#27272d",
    webPreferences: {
      nodeIntegration: true
    }
  });

  authWindow.loadFile('login.html');
  authWindow.webContents.openDevTools();
}

const mainMenuTemplate = [
  {
    label:"Application",
    submenu:[
      {
        label:"Login/Registration",
        click() {
          createAuthWindow();
        }
      },
      {
        label:"Quit",
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label:"Games"
  },
  {
    label:"Friends"
  },
  {
    label:"FAQ",
    click(){
      createFAQWindow();
    }
  }
];

