import React, { useEffect, useRef, useState } from "react";
import { getUserChatsApi } from "../apis/Api";
import Users from "../components/Users";
import AdminChatBox from "../components/AdminChatBox";
import { io } from "socket.io-client";
import getUser from "../../utils/getUser";

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const user=getUser();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("receive-message", (data) => {
      setReceivedMessage(data);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await getUserChatsApi(user._id);
        setChats(data);
      } catch (e) {
        console.error(e);
      }
    };
    getChats();
  }, [user]);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 border-r border-gray-300">
        <div className="p-4">
          <h1 className="text-lg font-semibold mb-4">Users</h1>
          <ul>
            {chats.map((chat) => (
              <li
                key={chat._id}
                className={`py-2 px-4 cursor-pointer hover:bg-gray-200`}
                onClick={() => setCurrentChat(chat)}
              >
                <Users data={chat} currentUser={user._id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <AdminChatBox
          chat={currentChat}
          currentUser={user?._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default AdminChat;
