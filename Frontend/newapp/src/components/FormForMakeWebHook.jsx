import React, { useState } from "react";

// hey there , guide me regarding your commpany policy for web services
export default function FormForMakeWebHook() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
   budget: "low",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const webhookUrl =
        "https://hook.eu1.make.com/1mmrhsei9kkikb8eoam7ybx7w3ijsdkq";

      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(webhookUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      const data = await res.text();

      console.log("Webhook Response:", data);

      alert("Form submitted successfully!");

      setFormData({
        name: "",
        email: "",
        budget: "low",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Make.com Webhook Form
          </h1>

          <p className="text-gray-500 mt-3">
            Send form data directly to Make.com as JSON
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        

          {/* Budget */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Budget
            </label>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="500">Low Budget ($200-$500)</option>
              <option value="2000">Medium Budget ($500 - $2000)</option>
              <option value="3000">High Budget (Above $2000)</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write your message"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-all text-white py-3 rounded-xl font-semibold text-lg"
          >
            {loading ? "Submitting..." : "Submit Form"}
          </button>
        </form>

        
      </div>
    </div>
  );
}