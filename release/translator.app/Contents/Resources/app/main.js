const electron = require('electron');

const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;

const path = require('path');
const url = require('url');
const createMenubar = require('menubar');

const menubar = createMenubar(
{
  index: path.join('file://', __dirname, 'translation-app/translation-window/index.html'),
  preloadWindow: true,
  backgroundColor: '#fff',
  icon: "easy-tongue-icon@2x.png"
});

menubar.on('ready', () =>
{
  //menubar.window.toggleDevTools();

  let settingsWindow = new BrowserWindow(
  {
    width: 500,
    height: 450,
    backgroundColor: '#fff',
    show: false
  });

  settingsWindow.loadURL(path.join('file://', __dirname, 'translation-app/settings-window/index.html'));

  menubar.window.setResizable(false)

  ipcMain.on('openWindowKeyCombinationChange', (e, arg) =>
  {
    let keyCombination = arg.keyCombination;

    globalShortcut.unregisterAll();

    globalShortcut.register(keyCombination, () =>
    {
      menubar.window.show();
    });
  });

  ipcMain.on('swapLanguagesKeyCombinationChange', (e, arg) =>
  {
    let keyCombination = arg.keyCombination;
    menubar.window.webContents.send('swapLanguagesKeyCombinationChange', {keyCombination: keyCombination});
  });

  menubar.app.on('window-all-closed', () =>
  {
    menubar.app.quit();
  });

  menubar.app.on('before-quit', () =>
  {
    settingsWindow.removeAllListeners('close');
    settingsWindow.close();
  });

  settingsWindow.on('close', function(e)
  {
    e.preventDefault();
    settingsWindow.hide();
  });

  ipcMain.on('settings-icon-click', (event, arg) =>
  {
    settingsWindow.show();
    //settingsWindow.toggleDevTools();
  });
});

menubar.app.on('will-quit', () =>
{
  globalShortcut.unregisterAll()
});
