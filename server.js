const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/v1', createProxyMiddleware({
  target: 'https://api.openai.com/v1',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
  }
}));

app.get('/', (req, res) => res.send('ChatGPT Proxy is running!'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
