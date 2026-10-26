

import React, { useEffect, useState } from "react";

export default function Contact({ listing }) {
  const [owner, setOwner] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const getOwner = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${listing.userRef}`,  {
  credentials: "include",
});
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOwner();
  }, [listing.userRef]);

  const sendMessage = async () => {
    if (!msg.trim()) return alert("Please enter a message");

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerEmail: owner.email,
          listingName: listing.name,
          message: msg,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        setMsg("");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p>
        Contact - <span className="font-semibold">{owner?.email}</span> for{" "}
        <span className="font-semibold">{listing.name}</span>
      </p>

      <textarea
        id="msg"
        value={msg}
        rows={2}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Enter your message"
        className="w-full border border-gray-300 rounded-md p-2 mt-2"
      ></textarea>

      {sent && (
        <p className="text-green-600 text-sm">Message sent successfully!</p>
      )}

      {owner && !sent && (
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-slate-700 text-center text-white p-3 uppercase rounded-lg mt-2 w-full disabled:opacity-70"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      )}
    </div>
  );
}
