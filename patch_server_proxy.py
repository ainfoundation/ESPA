import re
with open('server.ts', 'r') as f:
    content = f.read()

new_route = """
import https from 'https';
import http from 'http';

app.get('/api/proxy-pdf', (req, res) => {
  const url = req.query.url as string;
  if (!url) return res.status(400).send('URL required');
  
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const httpClient = url.startsWith('https') ? https : http;
  
  const makeRequest = (targetUrl: string) => {
    httpClient.get(targetUrl, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        if (response.headers.location) {
          return makeRequest(response.headers.location);
        }
      }
      
      // If it's a 4xx or 5xx
      if (response.statusCode && response.statusCode >= 400) {
        return res.status(response.statusCode).send('Failed to fetch PDF');
      }
      
      res.setHeader('Content-Type', 'application/pdf');
      response.pipe(res);
    }).on('error', (e) => {
      res.status(500).send('Error proxying request');
    });
  };
  
  makeRequest(url);
});
"""

content = re.sub(r'// Serve static files in production', new_route + '\n// Serve static files in production', content)

with open('server.ts', 'w') as f:
    f.write(content)
