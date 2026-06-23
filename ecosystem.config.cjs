// PM2 process config for the portfolio on the VPS.
//   Build once:  npm ci && npm run build
//   Start:       pm2 start ecosystem.config.cjs
//   Reload:      pm2 reload demba7-portfolio
//
// Secrets (RESEND_API_KEY, CONTACT_FROM, CONTACT_TO) live in `.env.local` on the
// server (gitignored) and are loaded automatically by Next.js at runtime — keep
// them out of this file and out of git.
//
// Change PORT if 3007 is already taken by another project on the VPS, and keep
// the Nginx `proxy_pass` in sync.
module.exports = {
  apps: [
    {
      name: "demba7-portfolio",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3007,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
