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

let mainWindow;
let FAQWindow;
let authWindow;

let isAuthed = false;

var usersSchema = new mongoose.Schema({
  login:String,
  password:String
});

var User = mongoose.model("Users",usersSchema);
/*User.create([{
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
});*/

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
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    backgroundColor:"#eee",
    webPreferences: {
      nodeIntegration: true
    }
  });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.openDevTools();


  mainWindow.on('closed', function () {

    mainWindow = null
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

app.on('ready', createWindow);

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
