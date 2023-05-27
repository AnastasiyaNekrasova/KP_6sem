import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import https from 'https'
import fs from 'fs'
import { Server } from 'socket.io'

import authRoute from './routes/authRoute.js'
import postRoute from './routes/postsRoute.js'
import commentRoute from './routes/commentsRoute.js'
import plantsRoute from './routes/plantsRoute.js'
import userPlantsRoute from './routes/userPlantsRoute.js'
import userInfoRoute from './routes/userInfoRoute.js'
// import route from './routes/route.js'

import { addUser, findUser, getRoomUsers, removeUser } from "./controllers/chatController.js";
import { userInfo } from 'os'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 8000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors({ origin: "*" }))
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)
app.use('/api/userplants', userPlantsRoute)
app.use('/api/plants', plantsRoute)
app.use('/api/userinfo', userInfoRoute)

// let options = {
//   key: fs.readFileSync("./security/SUCCULENT-key.pem").toString(),
//   cert: fs.readFileSync("./security/SUCCULENT.pem").toString(),
// };

// const server = https.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// })

// io.on("connection", (socket) => {
//   socket.on("join", ({ name, room }) => {
//     socket.join(room);

//     const { user, isExist } = addUser({ name, room });

//     const userMessage = isExist
//       ? `${user.name}, here you go again`
//       : `Hey my love ${user.name}`;

//     socket.emit("message", {
//       data: { user: { name: "Admin" }, message: userMessage },
//     });

//     socket.broadcast.to(user.room).emit("message", {
//       data: { user: { name: "Admin" }, message: `${user.name} has joined` },
//     });

//     io.to(user.room).emit("room", {
//       data: { users: getRoomUsers(user.room) },
//     });
//   });

//   socket.on("sendMessage", ({ message, params }) => {
//     const user = findUser(params);

//     if (user) {
//       io.to(user.room).emit("message", { data: { user, message } });
//     }
//   });

//   socket.on("leftRoom", ({ params }) => {
//     const user = removeUser(params);

//     if (user) {
//       const { room, name } = user;

//       io.to(room).emit("message", {
//         data: { user: { name: "Admin" }, message: `${name} has left` },
//       });

//       io.to(room).emit("room", {
//         data: { users: getRoomUsers(room) },
//       });
//     }
//   });

//   io.on("disconnect", () => {
//     ("Disconnect");
//   });
// });

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.4rja7bq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )

        app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))
    } catch (error) {
        console.log(error)
    }
}
start()
