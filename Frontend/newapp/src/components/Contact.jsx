// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Contact({ listing }) {
//   const [owner, setOwner] = useState(null);
//   const [msg,setMsg] = useState('')
//   console.log(listing,"from contact component")
  
  
//     const onChange = (e)=>{
//     setMsg(e.target.value)
//   }
//   useEffect(() => {
//     const getOwner = async () => {
//       try {
//         const res = await fetch(`/api/user/${listing.userRef}`);
//         const data = await res.json();
//         setOwner(data);
//         console.log("data:", data)
//         console.log(owner ,"owner in useeffect")
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getOwner()},
//     [listing.userRef]
//   );
//   useEffect(()=>{
//     console.log(owner)
// },[owner])

// console.log("owner",owner)
//   return(
  
//   <div className="flex flex-col gap-2">
//   <p>
//     Contact - <span className="font-semibold">{owner?.email}</span> for{" "}
//     <span className="font-semibold">{listing.name}</span>
//   </p>

//   <textarea
//     id="msg"
//     value={msg}
//     rows={2}
//     onChange={onChange}
//     placeholder="Enter your message"
//     className="w-full border border-gray-300 rounded-md p-2 mt-2"
//   ></textarea>

//   {owner  && (
//     <a
//       href={`mailto:${owner.email}?subject=${encodeURIComponent(
//         "Regarding " + listing.name
//       )}&body=${encodeURIComponent(msg)}`}
//       className="inline-block bg-slate-700 text-center text-white p-3 uppercase rounded-lg mt-2" onClick={() => console.log("Send Message clicked!")}
//     >
//       Send Message
//     </a>
//   )}
// </div>

//   )
// }

import React, { useEffect, useState } from "react";

export default function Contact({ listing }) {
  const [owner, setOwner] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const getOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
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
      const res = await fetch("/api/contact/send", {
        method: "POST",
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
