/**
 * PM2 Ecosystem Config — masonnguyengeo.com
 * Hostinger Node.js production process management
 * Usage: pm2 start ecosystem.config.js --env production
 */

module.exports = {
  apps: [
    {
      name: 'masonnguyengeo',
      script: 'server.js',

      // Hostinger typically assigns PORT via env
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOST: '0.0.0.0',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        HOST: '0.0.0.0',
      },

      // Process settings
      instances: 1,           // Single instance (shared Hostinger hosting)
      exec_mode: 'fork',      // Fork mode for shared hosting
      autorestart: true,
      watch: false,           // Never watch in production
      max_memory_restart: '300M',

      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,

      // Crash recovery
      min_uptime: '5s',
      max_restarts: 10,
      restart_delay: 4000,

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,

      // Node.js args (optional memory optimization)
      node_args: '--max-old-space-size=256',
    },
  ],
};
