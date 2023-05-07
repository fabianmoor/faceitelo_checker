const { ipcRenderer } = require('electron');

let usernameInput;
let username = ''; // Variable to store the user input

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', submitUsername);

  // Assign usernameInput once the DOM is loaded
  usernameInput = document.getElementById('username');
});

function submitUsername() {
  username = usernameInput.value; // Update the username variable
  ipcRenderer.send('execute-python-script', username);
  usernameInput.value = '';

  const inputContainer = document.getElementById('input-container');
  inputContainer.style.display = 'none';

  const eloHeader = document.getElementById('elo-header');
  eloHeader.style.display = 'none';

  const imgLoader = document.getElementById('loading');
  imgLoader.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.on('python-result', (event, result) => {
    const eloValue = document.getElementById('elo-value');
    eloValue.textContent = result;

    const eloValueContainer = document.getElementById('elo-value-container');
    const eloValueElement = document.getElementById('elo-value');
    eloValueElement.classList.add('show');

    const imgLoader = document.getElementById('loading');

    if (result) {
      eloValueContainer.classList.add('show');
      eloValue.style.display = 'flex';
      imgLoader.style.display = 'none';

      const headingHeader2 = document.getElementById('elo-header2');
      headingHeader2.textContent = username; // Use the username variable
      headingHeader2.style.display = 'flex';
    } else {
      eloValueContainer.classList.remove('show');
      eloValue.style.display = 'none';
    }
  });
});

function executePythonScript() {
  ipcRenderer.send('execute-python-script', '');
}

setInterval(executePythonScript, 2000); // Repeat every 2 seconds
