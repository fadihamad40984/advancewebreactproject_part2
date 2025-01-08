import express from "express";
import { WebSocketServer } from "ws";  
import dotenv from "dotenv";
import cors from "cors";
import db from "./db.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ noServer: true });

const activeConnections = new Map();

wss.on("connection", (ws, req) => {
  let userId;

  console.log("New WebSocket connection established.");

  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data);
      const { sender, receiver, message: content } = message;

      if (!userId) userId = sender;

      activeConnections.set(sender, ws);  
      activeConnections.set(receiver, ws); 

      const query = `
        INSERT INTO chat_messages (sender, receiver, message)
        VALUES (?, ?, ?)
      `;
      await db.execute(query, [sender, receiver, content]);

      const receiverWs = activeConnections.get(receiver);
      if (receiverWs && receiverWs.readyState === WebSocket.OPEN) {
        receiverWs.send(JSON.stringify(message)); 
      }

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message)); 
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    if (userId) {
      activeConnections.delete(userId);
    }
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const [users] = await db.execute(query);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/api/chat/:sender/:receiver", async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const query = `
      SELECT * FROM chat_messages
      WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)
      ORDER BY timestamp ASC
    `;
    const [rows] = await db.execute(query, [sender, receiver, receiver, sender]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});
