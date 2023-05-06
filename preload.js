
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('python-result', (event, result) => {
    const eloValue = document.getElementById('elo-value');
    eloValue.textContent = result;

    const eloValueContainer = document.getElementById('elo-value-container');

    // Check if result is empty
    if (result) {
      eloValueContainer.classList.add('show');
      eloValue.style.display = 'flex';
    } else {
      eloValueContainer.classList.remove('show');
      eloValue.style.display = 'none';
    }
  });
});

function executePythonScript() {
  ipcRenderer.send('execute-python-script');
}

setInterval(executePythonScript, 2000); // Repeat every 7 seconds


/*document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('python-result', (event, result) => {
    const eloValue = document.getElementById('elo-value');
    eloValue.textContent = result;

    const eloValueContainer = document.getElementById('elo-value-container');

    // Check if result is empty
    if (result) {
      eloValueContainer.classList.add('show');
      eloValue.classList.add('show');
    } else {
      eloValueContainer.classList.remove('show');
      eloValue.classList.remove('show');
    }
  });
});*/




/*const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('python-result', (event, result) => {
    const eloValue = document.getElementById('elo-value');
    eloValue.textContent = result;

    // Check if result is empty
    if (result) {
      eloValue.style.display = 'flex';
    } else {
      eloValue.style.display = 'none';
    }
  });
});

function executePythonScript() {
  ipcRenderer.send('execute-python-script');
}

setInterval(executePythonScript, 7000); // Repeat every 7 seconds
*/