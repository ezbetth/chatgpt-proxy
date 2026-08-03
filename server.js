const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/v1', createProxyMiddleware({
  target: 'https://chatgpt.com/backend-api',
  changeOrigin: true,
  pathRewrite: {
    '^/v1/chat/completions': '/conversation',
  },
  onProxyReq: (proxyReq, req, res) => {
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
  }
}));

app.get('/', (req, res) => res.send('ChatGPT Proxy is running!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
