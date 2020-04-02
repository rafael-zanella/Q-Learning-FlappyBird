
const { app, BrowserWindow } = require('electron');

function createWindow() {
	win = new BrowserWindow(
		{
			width: 890,
			height: 450,
			show: false,
			autoHideMenuBar: true
		})

	win.webContents.openDevTools()
	win.loadFile('index.html')
	win.once("ready-to-show", () => {
		win.show();
	})
}
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
app.on('ready', createWindow);
