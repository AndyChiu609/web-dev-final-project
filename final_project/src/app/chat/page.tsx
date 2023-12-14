"use client";

import { Message } from "@/lib/types/db";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "assistant",
      content: "Hello, how can I help you today?",
    },
  ]);

  const [inputText, setInputText] = useState<string>("");
  const sendMessage = async () => {
    // Construct new message
    const newMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: inputText,
      },
    ];
    setMessages(newMessages);
    setInputText("");

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: newMessages,
      }),
    });

    const data = await response.json();

    setMessages((messages) => [...messages, data]);
  };

  return (
    <main className="flex h-screen overflow-hidden flex-col items-center justify-between">
      <div className="h-full border w-1/3 flex flex-col overflow-hidden">
        <nav className="w-full border-b px-4 py-2 shadow-md">
          <h1 className="font-semibold text-lg">ChatGPT</h1>
        </nav>
        <div className="grow flex flex-col gap-2 p-2 overflow-scroll">
          {messages.map((message, index) => (
            <div key={index}>
            {message.role}:{message.content}
            </div>
          ))}
        </div>
        <div className="border-t p-2 flex gap-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="grow text-lg bg-gray-100 rounded-lg px-2"
          />
          <button
            onClick={sendMessage}
            className="text-lg bg-teal-600 hover:bg-teal-500 text-white px-2 py-1 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
