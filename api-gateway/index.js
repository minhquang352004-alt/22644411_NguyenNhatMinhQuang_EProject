const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

// Log requests để dễ debug
app.use((req, res, next) => {
    console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
    next();
});

// Forward lỗi proxy để tránh crash
proxy.on("error", (err, req, res) => {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Service unavailable" });
});

// --- ROUTING --- //

// Auth service
app.use("/auth", (req, res) => {
    proxy.web(req, res, { target: "http://auth:3000" });
});

// Product service
// Nếu trong product service bạn dùng app.use("/api/products", ...)
// thì để đúng phải target: "http://product:3001/api/products"
app.use("/products", (req, res) => {
    proxy.web(req, res, { target: "http://product:3001/api/products" });
});

// Order service
// Nếu trong order service bạn dùng app.use("/api/orders", ...)
// thì target: "http://order:3002/api/orders"
app.use("/orders", (req, res) => {
    proxy.web(req, res, { target: "http://order:3002/api/orders" });
});

// --- START SERVER --- //
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway listening on port ${PORT}`);
});