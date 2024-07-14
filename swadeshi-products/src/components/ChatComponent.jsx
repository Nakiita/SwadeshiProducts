import React, { useEffect, useState } from "react";
import { createMessagesApi, getMessagesApi } from "../apis/Api";

const ChatComponent = ({ isOpen, dropdownRef, user, chatData }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { senderId: "AI", text: "Hi, how can I help you today?" },
  ]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessagesApi(chatData.data._id); // Await the API call
        setMessages((prevMessages) => [...prevMessages, ...response.data]);
        setMessagesLoaded(true);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    if (!messagesLoaded) {
      fetchMessages();
    }
  }, [chatData, messagesLoaded]);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      chatId: chatData.data._id,
      senderId: user?._id,
      text: message,
    };

    try {
      await createMessagesApi(newMessage);
      setMessages([
        ...messages,
        {
          senderId: user._id,
          text: message,
          createdAt: new Date().toISOString(),
        },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  return (
    isOpen && (
      <div
        ref={dropdownRef}
        className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-col space-y-1.5 pb-6">
              <h2 className="font-semibold text-lg tracking-tight">
                Swadeshi Products
              </h2>
            </div>

            <div className="pr-4 h-[480px] overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderId === user._id ? "justify-end" : "justify-start"
                  } mb-4 items-center`}
                >
                  {msg.senderId !== user._id && (
                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <div className="rounded-full bg-gray-100 border p-1">
                        <svg
                          stroke="none"
                          fill="black"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                          ></path>
                        </svg>
                      </div>
                    </span>
                  )}
                  <div
                    className={`leading-relaxed ${
                      msg.senderId === user._id ? "bg-gray-200" : "bg-gray-100"
                    } py-2 px-4 rounded-lg max-w-[80%] break-words text-right`}
                  >
                    {msg.senderId === user._id && (
                      <h4 className="text-sm font-bold">You</h4>
                    )}
                    <p>{msg.text}</p>
                    {msg.createdAt && (
                      <span className="text-xs text-gray-500">
                        {formatDate(msg.createdAt)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
      </div>
    )
  );
};

export default ChatComponent;
