import { useState } from "react";
import axios from "axios";
import { SendHorizonal, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "You can ask me any thing" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(`${VITE_BACKEND_URL}/gemini/ans`, {
        query: input,
      });

      const botMessage = {
        from: "bot",
        text:
          response.data.response == input
            ? "Sorry, I couldn't understand that."
            : response.data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Something went wrong. Please try again later.",
        },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <>
      {/* Floating Circular Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          size="icon"
          className="rounded-full shadow-lg w-14 h-14"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-200 z-50">
          <div className="bg-primary text-white px-4 py-2 font-semibold">
            AI Assistant
          </div>

          <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-64">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded-md ${
                  msg.from === "user"
                    ? "bg-blue-100 text-right ml-auto w-fit"
                    : "bg-gray-100 text-left mr-auto w-fit"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm bg-gray-100 p-2 rounded-md w-fit mr-auto text-left">
                Typing...
              </div>
            )}
          </div>

          <div className="flex items-center border-t px-2 py-2 gap-2">
            <input
              className="flex-1 text-sm px-3 py-1.5 border rounded-md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button size="icon" onClick={handleSend} disabled={loading}>
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
