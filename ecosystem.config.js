module.exports = {
    apps: [{
        name: "mi-app",
        script: "dist/server.js",
        instances: 1,
        exec_mode: "fork",
        env: {
            NODE_ENV: "production",
            PORT: process.env.PORT || 3002
        },
        watch: false,
        restart_delay: 5000,
        max_restarts: 5,
        error_file: "./logs/err.log",
        out_file: "./logs/out.log",
    }]
};
