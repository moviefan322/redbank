const { createServer } = require('http');
const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Redirect HTTP to HTTPS
  server.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && !dev) {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  createServer(server).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
