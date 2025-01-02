import React, { useState, useEffect, useRef } from "react";
import Dashboard from "../components/Dashboard";
import "../styles/chat.css";
const WEBSOCKET_URL = "ws://localhost:8080";

const Chat = () => {
  const [admins, setAdmins] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatMessagesRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
/*     const fetchAdmins = async () => {
      try {
        const response = await fetch("/data/admins.json");
        const text = await response.text();  
        console.log(text);  
        const data = JSON.parse(text);  
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
     */
    const fetchAdmins = async () => {
      try {
        const response = await fetch("/data/admins.json");
        const text = await response.text();
        console.log(text);
        const data = JSON.parse(text);
    
        const admins = data.filter(user => user.role === "admin");
        setAdmins(admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    

    fetchAdmins();

    socketRef.current = new WebSocket(WEBSOCKET_URL);

    socketRef.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const startChat = (admin) => {
    setCurrentAdmin(admin);
    setMessages([]);
  };

  const sendMessage = () => {
    if (message && currentAdmin) {
      const msg = {
        sender: "User",
        receiver: currentAdmin.id,
        message,
      };
      socketRef.current.send(JSON.stringify(msg));
      setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage(""); 
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Dashboard>
      <div className="chatWithAdmin">
        <div className="chat-container">
          <h2>Chat with Admins</h2>
          <input
            type="text"
            className="search-box"
            placeholder="Search for an admin..."
          />
          <div className="admin-container">
            <h3>Available Admins</h3>
            <div className="admin-list">
              {admins.map((admin) => (
                <div
                  className="admin"
                  key={admin.id}
                  onClick={() => startChat(admin)}
                >
                  <div className="admin-avatar">
                    <img src={admin.avatar}  />
                  </div>
                  <span>{admin.name}</span>
                </div>
              ))}
            </div>
          </div>

          {currentAdmin && (
            <div className="chat-box-container">
              <div className="chat-box">
                <div className="chat-header">
                  <h3>Chat with {currentAdmin.name}</h3>
                </div>
                <div className="chat-messages" ref={chatMessagesRef}>
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={msg.sender === "User" ? "message user" : "message admin"}
                    >
                      <span>{msg.message}</span>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Chat;
