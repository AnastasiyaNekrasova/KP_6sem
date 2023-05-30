import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/authRoute.js';
import postRoute from './routes/postsRoute.js';
import commentRoute from './routes/commentsRoute.js';
import plantsRoute from './routes/plantsRoute.js';
import userPlantsRoute from './routes/userPlantsRoute.js';
import messageRoute from "./routes/messagesRoute.js";

// Создайте приложение Express
const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 8000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors({ origin: "*" }));
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/userplants', userPlantsRoute);
app.use('/api/plants', plantsRoute);
app.use("/api/messages", messageRoute);

// Сервер HTTP
const server = http.createServer(app);

// Сервер сокетов
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Логика сервера сокетов
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

// Подключение к базе данных и запуск сервера
async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.4rja7bq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();