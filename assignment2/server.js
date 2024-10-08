const mysql = require('mysql');
const WebSocket = require('ws');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newtest'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected');
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected.');

    ws.on('message', (message) => {
        console.log(`received ${message}`);

        const query = 'SELECT * FROM account WHERE email = ?';
        db.query(query, [message], (err, results) => {
            if (err) {
                console.error(err);
                ws.send('Error');
                return;
            }

            if (results.length > 0) {
                ws.send('Yes');
            } else {
                ws.send('No');
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});
