const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');

// Import Next.js standalone server
const nextServer = require('./.next/standalone/server.js');

const port = parseInt(process.env.PORT || '3000', 10);

// Create HTTP server
const server = createServer(async (req, res) => {
  try {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Handle static files manually for standalone mode
    if (pathname.startsWith('/_next/static/')) {
      const filePath = path.join(__dirname, '.next', pathname.replace('/_next/', ''));
      
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        const ext = path.extname(filePath).toLowerCase();
        
        // Set appropriate content type
        let contentType = 'application/octet-stream';
        switch (ext) {
          case '.js':
            contentType = 'application/javascript';
            break;
          case '.css':
            contentType = 'text/css';
            break;
          case '.json':
            contentType = 'application/json';
            break;
          case '.png':
            contentType = 'image/png';
            break;
          case '.jpg':
          case '.jpeg':
            contentType = 'image/jpeg';
            break;
          case '.gif':
            contentType = 'image/gif';
            break;
          case '.svg':
            contentType = 'image/svg+xml';
            break;
        }
        
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': stat.size,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'ETag': `"${stat.mtime.getTime()}-${stat.size}"`,
        });
        
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        return;
      }
    }

    // For all other requests, use Next.js server
    // This is handled by importing the standalone server above
    // The standalone server is already started when required
    
  } catch (err) {
    console.error('Error serving request:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`> Ready on http://localhost:${port}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});