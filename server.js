
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Fallback for ajax endpoints if any old scripts call them
app.all('/ajax/*', (req, res) => {
  res.send('<div class="p-3">Content loaded successfully.</div>');
});

// Route /register directly to authys in register mode
app.all(['/register', '/register.html'], (req, res) => {
  res.redirect('/authys?mode=register');
});

// Fallback POST for authys
app.post(['/authys', '/authys.html'], (req, res) => {
  res.redirect('/authys');
});

// Middleware for clean URLs: check if <route>.html exists
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === '/') {
    return res.sendFile(path.join(__dirname, 'index.html'));
  }

  const directFilePath = path.join(__dirname, pathname);
  if (fs.existsSync(directFilePath) && fs.statSync(directFilePath).isFile()) {
    return next();
  }

  const htmlFilePath = path.join(__dirname, `${pathname}.html`);
  if (fs.existsSync(htmlFilePath) && fs.statSync(htmlFilePath).isFile()) {
    return res.sendFile(htmlFilePath);
  }

  next();
});

// Serve static assets from root
app.use(express.static(__dirname, {
  extensions: ['html', 'htm'],
  index: 'index.html'
}));

// Fallback to index.html for unknown routes
app.use((req, res) => {
  const fallback = path.join(__dirname, 'index.html');
  if (fs.existsSync(fallback)) {
    res.status(200).sendFile(fallback);
  } else {
    res.status(404).send('Page Not Found');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
