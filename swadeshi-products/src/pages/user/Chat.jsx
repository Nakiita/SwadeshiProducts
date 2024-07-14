import React, { useEffect, useRef, useState } from "react";
import getUser from "../../utils/getUser";
import { createChatApi } from "../../apis/Api";
import ChatComponent from "../../components/ChatComponent";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatData, setChatData] = useState("");
  const [chatInitialized, setChatInitialized] = useState(false);
  const dropdownRef = useRef(null);
  const user = getUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const senderId = user._id;
        const receiverId = "669405b47f6e47504022ba99";
        const data = { senderId, receiverId };
        const response = await createChatApi(data);
        setChatData(response);
        setChatInitialized(true);
        
      } catch (error) {
        console.error("Error creating chat session:", error);
      }
    };

    if (isOpen && !chatInitialized) {
      fetchChatData();
    }
  }, [isOpen, user, chatInitialized]);
  

  const toggleChat = async () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
        onClick={toggleChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>
      <ChatComponent
        isOpen={isOpen}
        dropdownRef={dropdownRef}
        user={user}
        chatData={chatData}
      />
    </div>
  );
};

export default Chat;
