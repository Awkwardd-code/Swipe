import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";  // Ensure it's correct path
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { initializeSocket } from "./socket/socket.server.js";
// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);

// Middleware setup
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Connect to the database before starting the server
connectDB();

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

initializeSocket(httpServer);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}



httpServer.listen(PORT, () => {
    console.log(`Server Started at Port: ${PORT}`);
});
