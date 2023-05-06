const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  ipcMain.on('execute-python-script', (event, args) => {
    console.log('Executing Python script...');
    const pythonProcess = spawn('python', ['funcs.py']);

    pythonProcess.stdout.on('data', (data) => {
      const result = data.toString().trim();
      console.log('Python script execution completed.');
      console.log('Result:', result);
      event.reply('python-result', result);

      mainWindow.webContents.send('python-result', result);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python error:', data.toString());
      event.reply('python-result', '');

      mainWindow.webContents.send('python-result', '');
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script exited with code:', code);
        event.reply('python-result', '');

        mainWindow.webContents.send('python-result', '');
      }
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});