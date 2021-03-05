const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path'); 
let db = require('./database')

let win;
function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
     // nodeIntegration: true,
     // contextIsolation:true,
     preload:path.join(app.getAppPath(), './index.js')
      
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})



ipcMain.handle('get', () => {
   getProducts()
})

function getProducts()
{
  db.query('SELECT * FROM product', (error, results, fields) => {
    if (error){
      console.log(error);
    }
    
    win.webContents.send('products', results)
  });  
}



