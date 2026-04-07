// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// export default function UpdateListing() {
//    const navigate = useNavigate()
//    const params =  useParams()
//   const [error, setError] = useState("");
//   const [imgArray, setImgArray] = useState([]);
//   const [deletedExisting, setDeletedExisting] = useState([]);
//   const { currentUser } = useSelector((state) => state.user);
//   const [formData, setFormData] = React.useState({
//     userRef: currentUser?._id || "", // fill when user is logged in
//     name: "",
//     discription: "",
//     address: "",
//     regularPrice: "",
//     discountPrice: "",
//     type: "sale", // default to 'sale'
//     offer: false,
//     bedrooms: 1,
//     bathrooms: 1,
//     parking: false,
//     furnished: false,
//     images: [],
//   });

//   useEffect(()=>{
//     const fetchListing = async()=>{
//       const listingId = params.listingId
//       console.log(listingId)
//       const res = await fetch(`/api/listing/get/${listingId}`)
//        const data = await res.json()
//        if(data.success===false){
//         console.log(data.message)
//         return;
//        }
//        setFormData(data)
//           console.log(data)
//           console.log(data.imgUrls);
       
//     if (data.imgUrls && data.imgUrls.length > 0) {
//       const existingImgs = data.imgUrls.map((url) => ({
//         file: null, // Not a File object
//         preview:url, // Just preview from backend
//         isExisting: true,
//       }));
//         console.log(existingImgs)
       
//       setImgArray(existingImgs);
    
//     }
  

//       }
//         fetchListing()
//     },[])
  
  
//   const handleChange = (e) => {
//     const { id, name, value, type, checked, files } = e.target;

//     if (type === "checkbox") {
//       setFormData((prev) => ({ ...prev, [id]: checked }));
//     } else if (type === "file") {
//       setFormData((prev) => ({ ...prev, images: files }));
//     } else if (type === "radio") {
//       // for radios use name as key
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     } else if (type === "number") {
//       setFormData((prev) => ({ ...prev, [id]: Number(value) }));
//     } else {
//       setFormData((prev) => ({ ...prev, [id]: value }));
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submitData = new FormData();
//     submitData.append("userRef", formData.userRef);
//     submitData.append("name", formData.name);
//     submitData.append("discription", formData.discription); // fixed typo
//     submitData.append("address", formData.address);
//     submitData.append("regularPrice", formData.regularPrice);
//     submitData.append("discountPrice", formData.discountPrice);
//     submitData.append("type", formData.type); // "rent" or "sale"
//     submitData.append("offer", formData.offer);
//     submitData.append("bedrooms", formData.bedrooms);
//     submitData.append("bathrooms", formData.bathrooms);
//     submitData.append("parking", formData.parking);
//     submitData.append("furnished", formData.furnished);

//     if(imgArray.length===0){
//       setError('Images not selected!!')
//       return;
//     }
//     // Append images
//     for (let i = 0; i < imgArray.length; i++) {
//          if (imgArray[i].file){
//       submitData.append("images", imgArray[i].file);
//     }}
//     // deletedExisting.forEach((img)=>{
//     //   submitData.append("deletedImages",img)
//     // })
//     submitData.append("deletedImages", JSON.stringify(deletedExisting));
//     console.log("Form Data being sent:", submitData);
     
//     try {
//       const res = await fetch(
//           `http://localhost:8000/api/listing/updatelisting/${params.listingId}`,
//         {
//           method: "PUT",
//           body: submitData,
//           credentials: "include", // if you're using cookies
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         console.error("Server Error:", data.message);
//         return;
//       }
//       console.log("Listing updated successfully", data);
//       navigate(`/listing/${data._id}`)
//     } catch (error) {
//       console.error("Error creating listing:", error);
//     }
//   };



//   const hanldeImgUpload = (e) => {
//   const selectedImgs = Array.from(e.target.files);

//   if (selectedImgs.length === 0) {
//     setError("Upload images for your listing");
//     return;
//   }

//   const newImages = selectedImgs.map((file) => ({
//     file,
//     preview: URL.createObjectURL(file),
//   }));

//   const totalImages = imgArray.length + newImages.length;

//   if (totalImages > 6) {
//     setError("You can only upload up to 6 images.");
//     const allowedNew = 6 - imgArray.length;
//     const updatedArray = [...imgArray, ...newImages.slice(0, allowedNew)];
//     setImgArray(updatedArray);
//     return;
//   }

//   setError("");
//   setImgArray((prev) => [...prev, ...newImages]);
// };





// const removeImg = (index) => {
//   const newArray = [...imgArray];

//   const removed = newArray.splice(index, 1)[0];

//   if (removed.isExisting) {
//     // Extract relative path from full URL
//     const url = new URL(removed.preview);
//     // url.pathname returns '/uploads/1748803705282_living3.jpeg'
//     // remove leading slash to get relative path
//     const relativePath = url.pathname.startsWith("/") ? url.pathname.slice(1) : url.pathname;

//     setDeletedExisting((prev) => [...prev, relativePath]); // track relative path for backend deletion
//   } else {
//     URL.revokeObjectURL(removed.preview); // cleanup local preview
//   }

//   setImgArray(newArray);
// };


  


//   return (
//     <>
    
//     <>
//       <div className="flex flex-col mt-[120px] mb-4">
//         <h1 className="text-3xl font-semibold text-center text-red-700  ">
//           Update Your Listing
//         </h1>
//         <div className="flex   ml-[150px] mt-20">
  
        
//             <form  id= 'formid' onSubmit={handleSubmit} className="relative flex flex-row  gap-12 justify-between items-start">
//               <div className="flex flex-col gap-4 ">
//                 <input
//                   type="text"
//                   placeholder="Listing Title"
//                   className="border p-3 rounded-lg"
//                   id="name"
//                   maxLength="62"
//                   minLength="10"
//                   required
//                   onChange={handleChange}
//                   value={formData.name}
//                 />
//                 <textarea
//                   type="text"
//                   placeholder=" Listing Description"
//                   className="border p-3 rounded-lg"
//                   id="discription"
//                   required
//                   onChange={handleChange}
//                   value={formData.discription}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Listing Address"
//                   className="border p-3 rounded-lg"
//                   id="address"
//                   required
//                   onChange={handleChange}
//                   value={formData.address}
//                 />
//                 <div className="flex flex-col gap-8">
//                   <div className="flex flex-col gap-2 ">
//                     <h1 className=" text-[23px] text-green-700">
//                       Your Listing Type:
//                     </h1>
//                     <div className="flex flex-row gap-10">
//                       <div className="flex flex-row gap-3">
//                         <input
//                           type="checkbox"
//                           id="sale"
//                           className="w-5"
//                           onChange={handleChange}
//                           checked={formData.type === "sale"}
//                         />
//                         <span className="text-[19px] text-neutral-600 font-semibold">
//                           Sell
//                         </span>
//                       </div>

//                       <div className="flex gap-2">
//                         <div className="flex flex-row gap-3">
//                           <input
//                             type="checkbox"
//                             id="rent"
//                             className="w-5"
//                             onChange={handleChange}
//                             checked={formData.type === "rent"}
//                           />
//                           <span className="text-[19px] text-neutral-600 font-semibold">
//                             Rent
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-2 ">
//                     <h1 className=" text-[23px] text-green-700">
//                       Your Listing Features:
//                     </h1>
//                     <div className="flex flex-row gap-10">
//                       {/* parking */}
//                       <div className="flex flex-row gap-3">
//                         <input
//                           type="checkbox"
//                           id="parking"
//                           className="w-5"
//                           onChange={handleChange}
//                           checked={formData.parking}
//                         />

//                         <span className="text-[19px] text-neutral-600 font-semibold">
//                           Parking spot
//                         </span>
//                       </div>
//                       {/* furnished */}
//                       <div className="flex gap-3">
//                         <input
//                           type="checkbox"
//                           id="furnished"
//                           className="w-5"
//                           onChange={handleChange}
//                           checked={formData.furnished}
//                         />
//                         <span className="text-[19px] text-neutral-600 font-semibold">
//                           Furnished
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex  gap-6 mt-6">
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       id="bedrooms"
//                       min="1"
//                       max="10"
//                       required
//                       className="p-3 border border-gray-300 rounded-lg"
//                       onChange={handleChange}
//                       value={formData.bedrooms}
//                     />
//                     <p className="text-[19px] text-neutral-600 font-semibold">
//                       Bedrooms
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       id="bathrooms"
//                       min="1"
//                       max="10"
//                       required
//                       className="p-3 border border-gray-300 rounded-lg"
//                       onChange={handleChange}
//                       value={formData.bathrooms}
//                     />
//                     <p className="text-[19px] text-neutral-600 font-semibold">
//                       Bathrooms
//                     </p>
//                   </div>
//                   {/* regular price */}
//                 </div>
//                 <div className="flex  gap-2 flex-col">
//                   <h1 className=" text-[23px] text-green-700">
//                     Regular Price $:
//                   </h1>
//                   <input
//                     type="number"
//                     id="regularPrice"
//                     min="50"
//                     max="10000000"
//                     required
//                     className="p-3 border border-gray-300 rounded-lg"
//                     onChange={handleChange}
//                     value={formData.regularPrice}
//                   />
//                   <div className="flex  items-center">
//                     {/* <p>Regular price</p> */}
//                     {formData.type === "rent" && (
//                       <span className="text-xs">($ / month)</span>
//                     )}
//                   </div>
//                 </div>
//                 {/* offer */}
//                 <div className="flex gap-3">
//                   <input
//                     type="checkbox"
//                     id="offer"
//                     className="w-5"
//                     onChange={handleChange}
//                     checked={formData.offer}
//                   />
//                   <span className="text-[23px] text-green-700 ">
//                   Add Offers ?
//                   </span>
//                 </div>

//                 {/* discount */}
//                 {formData.offer && (
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       id="discountPrice"
//                       min="0"
//                       max="10000000"
//                       required
//                       className="p-3 border border-gray-300 rounded-lg"
//                       onChange={handleChange}
//                       value={formData.discountPrice}
//                     />
//                     <div className="flex flex-col items-center">
//                       <p className="text-[19px] text-neutral-600 font-semibold">Discounted price</p>

//                       {formData.type === "rent" && (
//                         <span className="text-xs">($ / month)</span>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
           
            
          

//           <div className="flex flex-col  gap-4">
//             <p className="font-normal text-green-700 text-[23px]">
//               Images:
//               <span className="font-normal text-neutral-700 ml-2">
//                 The first image will be the cover (max 6)
//               </span>
//             </p>
//             <div className="flex gap-4">
//               {/* <input
//               placeholder="choose images"
//                 onChange={(e)=>{hanldeImgUpload(e); e.target.value=""}}
//                 className="p-3 border border-gray-300 rounded w-full"
//                 type="file"
//                 id="images"
//                 accept="image/*"
//                 multiple
//               /> */}
//               <label
//   htmlFor="images"
//   className="flex items-center gap-2 p-3 border border-gray-300 rounded w-full cursor-pointer hover:bg-gray-50"
// >
//   <span className="bg-blue-800 text-white px-4 py-1 rounded text-sm">
//     Choose Images
//   </span>
//   <span className="text-gray-400 text-sm">
//     {imgArray.length > 0 ? `${imgArray.length} image(s) selected` : "No images selected"}
//   </span>
// </label>
// <input
//   onChange={(e) => { hanldeImgUpload(e); e.target.value = ""; }}
//   className="hidden"
//   type="file"
//   id="images"
//   accept="image/*"
//   multiple
// />
//             </div>

//             <button type= 'submit' id = 'formid' className="p-3 bg-blue-800 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
//               Update Listing
//             </button> 
//             {error && <p className="text-red-700 text-sm">{error}</p>}
//             {imgArray.length===0? (<p className="text-center text-gray-500 mt-4">No images selected.</p>) :
//             ( <div className="grid grid-cols-3 gap-4 mt-4 ">
//               {imgArray.map((img, index) => (
//                 <div
//                   key={img.preview ||index}
//                   className="relative w-full h-40 border rounded overflow-hidden"
//                 >
//                   <button
//                     onClick={() => removeImg(index)}
//                     className="absolute top-1 right-1 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
//                   >
//                     {" "}
//                     X
//                   </button>
//                   {console.log("img is",img)}
//                   {img.preview ?( <img
//                     src={img.preview}
//                     alt="preview"
//                     className="w-full h-full object-cover"
//                   />):(
//                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
//         No preview
//       </div>
//                   )}
                 
//                 </div>
//               ))}
//             </div>)}
           
//             </div>
//             </form>
            
          
//         </div>
//       </div>
//     </>
//     </>
//   )
// }

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const navigate = useNavigate();
  const params = useParams();
  const [error, setError] = useState("");
  const [imgArray, setImgArray] = useState([]);
  const [deletedExisting, setDeletedExisting] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = React.useState({
    userRef: currentUser?._id || "",
    name: "",
    discription: "",
    address: "",
    regularPrice: "",
    discountPrice: "",
    type: "sale",
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    images: [],
  });

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) return;
      setFormData(data);
      if (data.imgUrls && data.imgUrls.length > 0) {
        const existingImgs = data.imgUrls.map((url) => ({
          file: null,
          preview: url,
          isExisting: true,
        }));
        setImgArray(existingImgs);
      }
    };
    fetchListing();
  }, []);

  const handleChange = (e) => {
    const { id, name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, images: files }));
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [id]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("userRef", formData.userRef);
    submitData.append("name", formData.name);
    submitData.append("discription", formData.discription);
    submitData.append("address", formData.address);
    submitData.append("regularPrice", formData.regularPrice);
    submitData.append("discountPrice", formData.discountPrice);
    submitData.append("type", formData.type);
    submitData.append("offer", formData.offer);
    submitData.append("bedrooms", formData.bedrooms);
    submitData.append("bathrooms", formData.bathrooms);
    submitData.append("parking", formData.parking);
    submitData.append("furnished", formData.furnished);

    if (imgArray.length === 0) {
      setError("Please add at least one image.");
      return;
    }

    for (let i = 0; i < imgArray.length; i++) {
      if (imgArray[i].file) submitData.append("images", imgArray[i].file);
    }
    submitData.append("deletedImages", JSON.stringify(deletedExisting));

    try {
      const res = await fetch(
        `http://localhost:8000/api/listing/updatelisting/${params.listingId}`,
        { method: "PUT", body: submitData, credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const hanldeImgUpload = (e) => {
    const selectedImgs = Array.from(e.target.files);
    if (selectedImgs.length === 0) { setError("Upload images for your listing"); return; }
    const newImages = selectedImgs.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    const totalImages = imgArray.length + newImages.length;
    if (totalImages > 6) {
      setError("Maximum 6 images allowed.");
      const allowedNew = 6 - imgArray.length;
      setImgArray((prev) => [...prev, ...newImages.slice(0, allowedNew)]);
      return;
    }
    setError("");
    setImgArray((prev) => [...prev, ...newImages]);
  };

  const removeImg = (index) => {
    const newArray = [...imgArray];
    const removed = newArray.splice(index, 1)[0];
    if (removed.isExisting) {
      setDeletedExisting((prev) => [...prev, removed.preview]);
    } else {
      URL.revokeObjectURL(removed.preview);
    }
    setImgArray(newArray);
  };

  const Toggle = ({ id, checked, label, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={() => onChange({ target: { id, type: "checkbox", checked: !checked } })}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          checked ? "bg-emerald-500" : "bg-slate-200"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
            checked ? "left-7" : "left-1"
          }`}
        />
      </div>
      <span className={`text-sm font-medium transition-colors ${checked ? "text-emerald-700" : "text-slate-500"}`}>
        {label}
      </span>
    </label>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .update-listing-page * { font-family: 'DM Sans', sans-serif; }
        .update-listing-page h1, .update-listing-page .serif { font-family: 'DM Serif Display', serif; }

        .field-group {
          position: relative;
        }
        .field-group label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 6px;
        }
        .field-input {
          width: 100%;
          padding: 12px 16px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.92rem;
          color: #1e293b;
          transition: all 0.2s;
          outline: none;
        }
        .field-input:focus {
          border-color: #10b981;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.08);
        }
        .card-section {
          background: #fff;
          border-radius: 16px;
          border: 1.5px solid #f1f5f9;
          padding: 24px;
          box-shadow: 0 1px 8px rgba(0,0,0,0.04);
        }
        .section-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #10b981;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #f0fdf4;
        }
        .counter-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
        }
        .counter-btn:hover { background: #f0fdf4; border-color: #10b981; color: #10b981; }
        .counter-val {
          min-width: 36px;
          text-align: center;
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
        }
        .type-btn {
          flex: 1;
          padding: 10px 0;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.88rem;
          font-weight: 600;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .type-btn.active-sale {
          background: #fffbeb;
          border-color: #f59e0b;
          color: #b45309;
        }
        .type-btn.active-rent {
          background: #f0fdf4;
          border-color: #10b981;
          color: #065f46;
        }
        .img-upload-zone {
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 28px;
          text-align: center;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.2s;
        }
        .img-upload-zone:hover {
          border-color: #10b981;
          background: #f0fdf4;
        }
        .img-card {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .img-remove-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(0,0,0,0.55);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          backdrop-filter: blur(4px);
          transition: background 0.15s;
        }
        .img-remove-btn:hover { background: rgba(239,68,68,0.85); }
        .cover-badge {
          position: absolute;
          bottom: 6px;
          left: 6px;
          background: rgba(0,0,0,0.5);
          color: #fff;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
        }
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(16,185,129,0.3);
        }
        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(16,185,129,0.4);
        }
        .submit-btn:active { transform: translateY(0); }

        .price-input-wrap {
          position: relative;
        }
        .price-input-wrap .currency {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-weight: 600;
          color: #94a3b8;
          font-size: 0.95rem;
          pointer-events: none;
        }
        .price-input-wrap .field-input {
          padding-left: 30px;
        }
      `}</style>

      <div className="update-listing-page min-h-screen bg-slate-50 pt-24 pb-16 px-4">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-10">
          <p className="text-xs font-semibold tracking-widest text-emerald-500 uppercase mb-2">Property Management</p>
          <h1 className="serif text-4xl text-slate-800" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Update Your Listing
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Keep your property details accurate and up to date.</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-3 flex flex-col gap-6">

              {/* Basic Info */}
              <div className="card-section">
                <div className="section-title">Basic Information</div>
                <div className="flex flex-col gap-4">
                  <div className="field-group">
                    <label>Listing Title</label>
                    <input
                      className="field-input"
                      type="text"
                      placeholder="e.g. Spacious 3-Bedroom Family Home"
                      id="name"
                      maxLength="62"
                      minLength="10"
                      required
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>
                  <div className="field-group">
                    <label>Address</label>
                    <input
                      className="field-input"
                      type="text"
                      placeholder="Full property address"
                      id="address"
                      required
                      onChange={handleChange}
                      value={formData.address}
                    />
                  </div>
                  <div className="field-group">
                    <label>Description</label>
                    <textarea
                      className="field-input"
                      placeholder="Describe the property, its surroundings, and highlights..."
                      id="discription"
                      required
                      rows={4}
                      onChange={handleChange}
                      value={formData.discription}
                      style={{ resize: "vertical" }}
                    />
                  </div>
                </div>
              </div>

              {/* Listing Type */}
              <div className="card-section">
                <div className="section-title">Listing Type</div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`type-btn ${formData.type === "sale" ? "active-sale" : ""}`}
                    onClick={() => setFormData((p) => ({ ...p, type: "sale" }))}
                  >
                    🏷 For Sale
                  </button>
                  <button
                    type="button"
                    className={`type-btn ${formData.type === "rent" ? "active-rent" : ""}`}
                    onClick={() => setFormData((p) => ({ ...p, type: "rent" }))}
                  >
                    🔑 For Rent
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="card-section">
                <div className="section-title">Features & Amenities</div>
                <div className="grid grid-cols-2 gap-4">
                  <Toggle id="parking" checked={formData.parking} label="Parking Spot" onChange={handleChange} />
                  <Toggle id="furnished" checked={formData.furnished} label="Furnished" onChange={handleChange} />
                </div>
              </div>

              {/* Rooms */}
              <div className="card-section">
                <div className="section-title">Room Details</div>
                <div className="flex gap-8">
                  {[
                    { id: "bedrooms", label: "Bedrooms", icon: "🛏" },
                    { id: "bathrooms", label: "Bathrooms", icon: "🚿" },
                  ].map(({ id, label, icon }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <p className="text-xs font-semibold tracking-widest uppercase text-slate-400">{icon} {label}</p>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          className="counter-btn"
                          onClick={() => setFormData((p) => ({ ...p, [id]: Math.max(1, p[id] - 1) }))}
                        >−</button>
                        <span className="counter-val">{formData[id]}</span>
                        <button
                          type="button"
                          className="counter-btn"
                          onClick={() => setFormData((p) => ({ ...p, [id]: Math.min(10, p[id] + 1) }))}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="card-section">
                <div className="section-title">Pricing</div>
                <div className="flex flex-col gap-4">
                  <div className="field-group">
                    <label>Regular Price {formData.type === "rent" && <span className="normal-case text-slate-400 font-normal">(per month)</span>}</label>
                    <div className="price-input-wrap">
                      <span className="currency">$</span>
                      <input
                        className="field-input"
                        type="number"
                        id="regularPrice"
                        min="50"
                        max="10000000"
                        required
                        placeholder="0"
                        onChange={handleChange}
                        value={formData.regularPrice}
                      />
                    </div>
                  </div>

                  <Toggle id="offer" checked={formData.offer} label="Add a discounted offer" onChange={handleChange} />

                  {formData.offer && (
                    <div className="field-group">
                      <label>Discounted Price</label>
                      <div className="price-input-wrap">
                        <span className="currency">$</span>
                        <input
                          className="field-input"
                          type="number"
                          id="discountPrice"
                          min="0"
                          max="10000000"
                          required
                          placeholder="0"
                          onChange={handleChange}
                          value={formData.discountPrice}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="card-section">
                <div className="section-title">Property Images</div>
                <p className="text-xs text-slate-400 mb-4 -mt-2">First image will be the cover · Max 6 photos</p>

                {/* Upload Zone */}
                <label htmlFor="images" className="img-upload-zone block mb-4">
                  <div className="text-3xl mb-2">📷</div>
                  <p className="text-sm font-semibold text-slate-600">Click to upload images</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {imgArray.length > 0
                      ? `${imgArray.length} / 6 image${imgArray.length > 1 ? "s" : ""} added`
                      : "PNG, JPG up to 10MB each"}
                  </p>
                </label>
                <input
                  onChange={(e) => { hanldeImgUpload(e); e.target.value = ""; }}
                  className="hidden"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />

                {/* Image Grid */}
                {imgArray.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {imgArray.map((img, index) => (
                      <div key={img.preview || index} className="img-card">
                        {img.preview ? (
                          <img
                            src={img.preview}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                            No preview
                          </div>
                        )}
                        <button
                          type="button"
                          className="img-remove-btn"
                          onClick={() => removeImg(index)}
                          title="Remove image"
                        >✕</button>
                        {index === 0 && <span className="cover-badge">Cover</span>}
                      </div>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: Math.max(0, 6 - imgArray.length) }).map((_, i) => (
                      <label
                        key={`empty-${i}`}
                        htmlFor="images"
                        className="img-card cursor-pointer"
                        style={{
                          background: "#f8fafc",
                          border: "1.5px dashed #e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          aspectRatio: "1",
                          borderRadius: "10px",
                        }}
                      >
                        <span style={{ color: "#cbd5e1", fontSize: "1.4rem" }}>+</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="submit-btn">
                ✓ &nbsp;Save Changes
              </button>

              <p className="text-center text-xs text-slate-400">
                Changes will be reflected immediately after saving.
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
