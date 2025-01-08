/* import React, { useState, useEffect, useRef } from "react";
import Dashboard from "../components/Dashboard";
import "../styles/chat.css";

const WEBSOCKET_URL = "ws://localhost:8080"; // WebSocket URL
const API_BASE_URL = "http://localhost:8080/api"; // API Base URL

const Chat = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentChatPartner, setCurrentChatPartner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatMessagesRef = useRef(null);
  const socketRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setAdmins(data.filter((user) => user.role === "admin"));
        setUsers(data.filter((user) => user.role === "user"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    socketRef.current = new WebSocket(WEBSOCKET_URL);

    socketRef.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const startChat = async (chatPartner) => {
    setCurrentChatPartner(chatPartner);
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${user.id}/${chatPartner.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }
      const chatHistory = await response.json();
      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = () => {
    if (message && currentChatPartner) {
      const msg = {
        sender: user.id,
        receiver: currentChatPartner.id,
        message,
      };

      socketRef.current.send(JSON.stringify(msg));

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, sender: "User" }, 
      ]);

      setMessage("");
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const renderChatList = (list, role) => (
    <div className={`${role}-container`}>
      <h3>{`Available ${role === "admin" ? "Admins" : "Users"}`}</h3>
      <div className={`${role}-list`}>
        {list.map((item) => (
          <div
            className={role}
            key={item.id}
            onClick={() => startChat(item)}
          >
            <div className={`${role}-avatar`}>
              <img
                src={item.avatar}
                alt={`${role} Avatar`}
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChatBox = () => (
    <div className="chat-box-container">
      <div className="chat-box">
        <div className="chat-header">
          <h3>{`Chat with ${currentChatPartner.name}`}</h3>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === user.id ? "user" : "admin"}`}
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
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  const chatList = user.role === "user" ? admins : users;

  return (
    <Dashboard>
      <div className="chatWithAdmin">
        <div className="chat-container">
          <h2>{`Chat with ${user.role === "user" ? "Admins" : "Users"}`}</h2>
          <input
            type="text"
            className="search-box"
            placeholder={`Search for a ${user.role === "user" ? "admin" : "user"}...`}
          />
          {renderChatList(chatList, user.role === "user" ? "admin" : "user")}
          {currentChatPartner && renderChatBox()}
        </div>
      </div>
    </Dashboard>
  );
};

export default Chat;
 */

import React, { useState, useEffect, useRef } from "react";
import Dashboard from "../components/Dashboard";
import "../styles/chat.css";

const WEBSOCKET_URL = "ws://localhost:8080"; // WebSocket URL
const API_BASE_URL = "http://localhost:8080/api"; // API Base URL

const Chat = () => {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentChatPartner, setCurrentChatPartner] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const chatMessagesRef = useRef(null);
  const socketRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setAdmins(data.filter((user) => user.role === "admin"));
        setUsers(data.filter((user) => user.role === "user"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    socketRef.current = new WebSocket(WEBSOCKET_URL);

    socketRef.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const startChat = async (chatPartner) => {
    setCurrentChatPartner(chatPartner);
    try {
      const response = await fetch(`${API_BASE_URL}/chat/${user.id}/${chatPartner.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }
      const chatHistory = await response.json();
      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const sendMessage = () => {
    if (message && currentChatPartner) {
      const msg = {
        sender: user.id,
        receiver: currentChatPartner.id,
        message,
      };

      socketRef.current.send(JSON.stringify(msg));

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, sender: "User" },
      ]);

      setMessage("");
    }
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderChatList = (list, role) => {
    const filteredList = list.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query
    );

    return (
      <div className={`${role}-container`}>
        <h3>{`Available ${role === "admin" ? "Admins" : "Users"}`}</h3>
        <div className={`${role}-list`}>
          {filteredList.length > 0 ? (
            filteredList.map((item) => (
              <div
                className={role}
                key={item.id}
                onClick={() => startChat(item)}
              >
                <div className={`${role}-avatar`}>
                  <img
                    src={item.avatar}
                    alt={`${role} Avatar`}
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <span>{item.name}</span>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    );
  };

  const renderChatBox = () => (
    <div className="chat-box-container">
      <div className="chat-box">
        <div className="chat-header">
          <h3>{`Chat with ${currentChatPartner.name}`}</h3>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === user.id ? "user" : "admin"}`}
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
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  const chatList = user.role === "user" ? admins : users;

  return (
    <Dashboard>
      <div className="chatWithAdmin">
        <div className="chat-container">
          <h2>{`Chat with ${user.role === "user" ? "Admins" : "Users"}`}</h2>
          <input
            type="text"
            className="search-box"
            placeholder={`Search for a ${user.role === "user" ? "admin" : "user"}...`}
            value={searchQuery}
            onChange={handleSearch}
          />
          {renderChatList(chatList, user.role === "user" ? "admin" : "user")}
          {currentChatPartner && renderChatBox()}
        </div>
      </div>
    </Dashboard>
  );
};

export default Chat;
