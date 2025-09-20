import React, { useState } from "react";

export default function AddProduct() {
  const [rawInfo, setRawInfo] = useState("");
  const [image, setImage] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const artisanId = localStorage.getItem("user_id"); // stored on login (UUID)
    if (!artisanId) {
      alert("User not logged in!");
      return;
    }

    const formData = new FormData();
    formData.append("artisan_id", artisanId);
    formData.append("raw_info", rawInfo);
    if (image) formData.append("image", image);

    await fetch(apiUrl + `/products/add_product/`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => alert("✅ Product Added Successfully!"));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Enter general product info..."
          className="w-full border rounded p-2"
          value={rawInfo}
          onChange={(e) => setRawInfo(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}