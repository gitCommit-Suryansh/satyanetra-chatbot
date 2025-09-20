// src/components/ProductChatbot.jsx
import React, { useState } from "react";

export default function ProductChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Tell me about your product and upload an image." },
  ]);
  const userId = localStorage.getItem("user_id");
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    artisan_id: userId, // Replace with logged-in user's uuid from localStorage
    product_name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const sendMessage = (text) => {
    setMessages([...messages, { sender: "user", text }]);
    setInput("");
  };

  const handleFileUpload = async () => {
    if (!file) return alert("Please select an image!");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.REACT_APP_API_URL}/products/upload_image`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setFormData((prev) => ({ ...prev, image_url: data.image_url }));
    setMessages((prev) => [...prev, { sender: "bot", text: "Image uploaded ✅" }]);
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => fd.append(key, value));

    const res = await fetch(`${process.env.REACT_APP_API_URL}/products/products`, {
      method: "POST",
      body: fd,
    });
    console.log(fd)

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "bot", text: "Product added successfully 🎉" }]);
    console.log("Product saved:", data);
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto mt-10 p-4 bg-white shadow-xl rounded-2xl">
      <div className="h-80 overflow-y-auto border-b mb-4 p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 p-2 rounded-lg max-w-xs ${
              msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type message..."
        className="border rounded-lg p-2 mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);

            if (!formData.product_name) {
              setFormData({ ...formData, product_name: input });
            } else if (!formData.description) {
              setFormData({ ...formData, description: input });
            } else if (!formData.price) {
              setFormData({ ...formData, price: input });
            }
          }
        }}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleFileUpload}
        className="bg-purple-500 text-white py-2 rounded-lg mb-2"
      >
        Upload Image
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white py-2 rounded-lg"
      >
        Submit Product
      </button>
    </div>
  );
}