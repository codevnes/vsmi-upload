module.exports = {
  apps: [
    {
      name: "vsmi-upload",
      script: "dist/index.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 2025
      },
      env_production: {
        NODE_ENV: "production"
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
}; 