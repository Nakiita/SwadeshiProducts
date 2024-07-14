import React, { useContext, useEffect, useRef, useState } from "react";
import { createMessagesApi, getMessagesApi } from "../apis/Api";
import getUser from "../../utils/getUser";

const AdminChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
}) => {
  const [message, setMessage] = useState("");
  const user  = getUser();
  const [userData, setUserData] = useState(null);
  const senderId = chat?.members?.find((id) => id !== currentUser);
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const getSenderData = async () => {
      try {
        const response = await getUser(senderId);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (chat !== null) {
      getSenderData();
    }
  }, [chat, currentUser, senderId]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [receivedMessage, chat?._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (chat?._id) {
        try {
          const response = await getMessagesApi(chat._id);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [chat]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      chatId: chat?._id,
      senderId: user._id,
      text: message,
    };

    try {
      const response = await createMessagesApi(newMessage);
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setMessage("");
      setSendMessage(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  return (
    <>
      {chat ? (
        <div>
          <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
            <h1 className="text-lg font-semibold">
              {userData ? userData.username : "User"}
            </h1>
            <span className="text-sm text-gray-500">Active 20m ago</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto h-[40rem]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.senderId === currentUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 my-1 rounded-lg ${
                    message.senderId === currentUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={scroll}></div>
          </div>
          <div className="flex items-center pt-4">
            <form
              className="flex items-center justify-center w-full space-x-2"
              onSubmit={handleSendMessage}
            >
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value={message}
                onChange={handleMessageChange}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>Click on a person to start conversation</div>
      )}
    </>
  );
};

export default AdminChatBox;
