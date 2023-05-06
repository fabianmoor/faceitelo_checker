const resultElement = document.getElementById('python-result');

window.api.receive('python-result', (result) => {
  console.log('Received Python result:', result);
  resultElement.textContent = result;
});

function executePythonScript() {
  console.log('Sending execute-python-script message');
  window.api.send('execute-python-script');
}

executePythonScript();