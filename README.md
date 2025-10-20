
# 🧩 EProject Microservices - Node.js, Express, MongoDB, RabbitMQ

## 🚀 Giới thiệu

Dự án này là hệ thống **E-commerce microservices** bao gồm các dịch vụ riêng biệt cho:

* **Auth Service** – Xử lý đăng ký, đăng nhập, xác thực JWT.
* **Product Service** – Quản lý sản phẩm (thêm, xem danh sách, mua hàng).
* **Order Service** – Quản lý đơn hàng.
* **API Gateway** – Định tuyến (proxy) toàn bộ request đến các service.

Tất cả các service được triển khai bằng **Docker Compose**, giao tiếp với nhau qua **RabbitMQ** và **MongoDB**.

---

## 🧱 Kiến trúc hệ thống

```
        [ Postman / Client ]
                 │
        ┌────────┴─────────┐
        │   API Gateway    │  (port: 3003)
        └────────┬─────────┘
                 │
 ┌───────────────┼────────────────┐
 │               │                │
▼               ▼                ▼
Auth Service   Product Service   Order Service
(port:3000)    (port:3001)       (port:3002)
 │               │                │
 ▼               ▼                ▼
 MongoDB      RabbitMQ <─────────┘
```

---

## ⚙️ Công nghệ sử dụng

* **Node.js + Express**
* **MongoDB** – Lưu trữ dữ liệu người dùng, sản phẩm, đơn hàng.
* **RabbitMQ** – Trao đổi message giữa các service.
* **Docker Compose** – Triển khai toàn bộ hệ thống.
* **JWT (JSON Web Token)** – Xác thực người dùng.

---

## 🐳 Chạy dự án bằng Docker

### 1️⃣ Clone repository

```bash
git clone https://github.com/minhquang352004-alt/22644411_NguyenNhatMinhQuang_EProject.git
cd 22644411_NguyenNhatMinhQuang_EProject
```

### 2️⃣ Khởi chạy toàn bộ container

```bash
docker compose up --build
```

### 3️⃣ Các service sẽ chạy tại:

| Service         | Port  | URL                                              |
| --------------- | ----- | ------------------------------------------------ |
| MongoDB         | 27017 | mongodb://localhost:27017                        |
| RabbitMQ        | 15672 | [http://localhost:15672](http://localhost:15672) |
| Auth Service    | 3000  | [http://localhost:3000](http://localhost:3000)   |
| Product Service | 3001  | [http://localhost:3001](http://localhost:3001)   |
| Order Service   | 3002  | [http://localhost:3002](http://localhost:3002)   |
| API Gateway     | 3003  | [http://localhost:3003](http://localhost:3003)   |

---

## 🧪 Test API (qua API Gateway - port 3003)

### 🔐 1. Đăng ký tài khoản

**POST** `http://localhost:3003/auth/register`

```json
{
  "username": "quang",
  "password": "123456"
}
```

### 🔑 2. Đăng nhập (lấy token)

**POST** `http://localhost:3003/auth/login`

```json
{
  "username": "quang",
  "password": "123456"
}
```

📤 **Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### 🛒 3. Thêm sản phẩm

**POST** `http://localhost:3003/products`
Header: `Authorization: Bearer <token>`

```json
{
  "name": "TV",
  "price": 10000,
  "description": ""
}
```

### 💰 4. Mua sản phẩm

**POST** `http://localhost:3003/products/buy`
Header: `Authorization: Bearer <token>`

```json
{
  "ids": ["68f65712c4ee082e8ef8405e"]
}
```

📤 **Response:**

```json
{
  "status": "completed",
  "products": ["68f65712c4ee082e8ef8405e"],
  "orderId": "7c5af5dd-0557-4f24-8ac2-bb55fab338c",
  "totalPrice": 10000
}
```

---

## 📁 Cấu trúc thư mục

```
EProject/
│
├── auth/
│   ├── index.js
│   ├── routes/
│   └── models/
│
├── product/
│   ├── index.js
│   ├── controllers/
│   ├── services/
│   └── routes/
│
├── order/
│   ├── index.js
│   └── controllers/
│
├── api-gateway/
│   └── index.js
│
├── docker-compose.yml
└── README.md
```

---

## 👨‍💻 Tác giả

**Nguyễn Nhật Minh Quang – 22644411**
💼 *EProject - Microservices Architecture with Node.js*
