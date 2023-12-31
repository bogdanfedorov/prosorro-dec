// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app, BrowserWindow } = require('electron')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function createWindow () {
  const mainWindow = new BrowserWindow({
    show: false,
    window: {
      width: 1800,
      height: 800
    }
  })
  mainWindow.maximize()
  mainWindow.show()
  // mainWindow.webContents.openDevTools()

  mainWindow.loadFile('dist/index.html').then(() => {
    console.log('File loaded')
  }).catch(e => {
    console.error(e)
  })
}

app.on('ready', () => {
  console.log('App is ready')

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
