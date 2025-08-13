const readline = require('readline');
const { io } = require('socket.io-client');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    try {

        const email = await new Promise((resolve) => rl.question(`enter your email:`, answer => resolve(answer.trim())));
        const password = await new Promise((resolve) => rl.question(`enter your password:`, answer => resolve(answer.trim())));

        const { token, user } =
            await fetch("http://localhost:3000/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            }).then(res => res.json());

        const socket = io('http://localhost:4000', {
            auth: {
                token: token
            }
        });

        socket.on('connect', () => {
            console.log(`Connected as ${user.name}`);
            promptInput();
        });

        // Handle errors (important!)
        socket.on('connect_error', (err) => {
            console.error("❌ Connection failed:", err.message);
        });

        socket.on('chat', (msg) => {
            console.log(msg);
        });

        function promptInput() {
            rl.question(`${user.name}`, (msg) => {
                if (msg === 'exit') {
                    rl.close();
                    socket.disconnect();
                    return;
                }
                socket.emit('chat', `${user.name}: ${msg}`);
                promptInput();
            });
        }

    } catch (error) {
        console.log('error', error);
    }


};

main();


