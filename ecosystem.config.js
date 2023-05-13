module.exports = {
    apps: [
        {
            name: 'Call Demo',
            script: 'server.js',
            instances: 1,
            autorestart: true,
            watch: false,
        },
    ],
};