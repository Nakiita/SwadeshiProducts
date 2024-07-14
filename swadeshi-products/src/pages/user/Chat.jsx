import React from "react";

const messages = [
  { id: 1, text: "Do you have any other color option?", sender: "user" },
  { id: 2, text: "Yes!!", sender: "other" },
  {
    id: 3,
    text: "We have color options. Which color do you want?",
    sender: "other",
  },
  { id: 4, text: "Baby Pink", sender: "user" },
  {
    id: 5,
    text: "Can you show me the real picture of product?",
    sender: "user",
  },
  { id: 6, text: "Alright", sender: "other" },
];

const ChatBox = () => {
  return (
    <div className="flex flex-col h-screen mt-24">
      <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
        <h1 className="text-lg font-semibold">Handicrafts Nepal</h1>
        <span className="text-sm text-gray-500">Active 20m ago</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 my-1 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center">
        <input
          type="text"
          placeholder="Enter your message"
          className="w-full p-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
