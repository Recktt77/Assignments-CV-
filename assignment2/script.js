const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = function(event) {
    document.getElementById('response').textContent = event.data;
};

document.getElementById('sendBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    if (email) {
        ws.send(email);
    } else {
        alert('Enter an email address.');
    }
});