import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const [imgArray, setImgArray] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = React.useState({
    userRef: currentUser?._id || "", // fill when user is logged in
    name: "",
    discription: "",
    address: "",
    regularPrice: "",
    discountPrice: "",
    type: "rent", // default to 'rent'
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    images: [],
  });

  const handleChange = (e) => {
    const { id, name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, images: files }));
    } else if (type === "radio") {
      // for radios use name as key
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
    submitData.append("discription", formData.discription); // fixed typo
    submitData.append("address", formData.address);
    submitData.append("regularPrice", formData.regularPrice);
    submitData.append("discountPrice", formData.discountPrice);
    submitData.append("type", formData.type); // "rent" or "sale"
    submitData.append("offer", formData.offer);
    submitData.append("bedrooms", formData.bedrooms);
    submitData.append("bathrooms", formData.bathrooms);
    submitData.append("parking", formData.parking);
    submitData.append("furnished", formData.furnished);

    if(imgArray.length===0){
      setError('Images not selected!!')
    }
    // Append images
    for (let i = 0; i < imgArray.length; i++) {
      submitData.append("images", imgArray[i].file);
    }
    console.log("Form Data being sent:", submitData);
    try {
      const res = await fetch(
        "http://localhost:8000/api/listing/createListing",
        {
          method: "POST",
          body: submitData,
          credentials: "include", // if you're using cookies
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Server Error:", data.message);
        return;
      }
      console.log("Listing created successfully", data);
      navigate(`/listing/${data._id}`)
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

 
  const hanldeImgUpload = (e) => {
  const selectedImgs = Array.from(e.target.files);

  if (selectedImgs.length === 0) {
    setError("Upload images for your listing");
    return;
  }

  const newImages = selectedImgs.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  const totalImages = imgArray.length + newImages.length;

  if (totalImages > 6) {
    setError("You can only upload up to 6 images.");
    const allowedNew = 6 - imgArray.length;
    const updatedArray = [...imgArray, ...newImages.slice(0, allowedNew)];
    setImgArray(updatedArray);
    return;
  }

  setError("");
  setImgArray((prev) => [...prev, ...newImages]);
};

  const removeImg = (index) => {
    const newArray = [...imgArray];
    // Revoke the object URL to free memory
    URL.revokeObjectURL(newArray[index].preview);
    newArray.splice(index, 1);
    setImgArray(newArray);
  };



  
   
    
 return (
  <div className="flex flex-col mt-28 px-4 w-full max-w-screen-xl mx-auto">
    <h1 className="text-3xl font-semibold text-center text-red-700 mb-6">
      Create Your Listing
    </h1>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-8 w-full"
    >
      {/* LEFT SECTION */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <input
          type="text"
          placeholder="Listing Title"
          className="border p-3 rounded-lg w-full"
          id="name"
          maxLength="62"
          minLength="10"
          required
          onChange={handleChange}
          value={formData.name}
        />

        <textarea
          placeholder="Listing Description"
          className="border p-3 rounded-lg w-full"
          id="discription"
          required
          onChange={handleChange}
          value={formData.discription}
        />

        <input
          type="text"
          placeholder="Listing Address"
          className="border p-3 rounded-lg w-full"
          id="address"
          required
          onChange={handleChange}
          value={formData.address}
        />

        {/* TYPE */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl text-green-700">Your Listing Type:</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
               name='type'
               value="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span className="text-base text-gray-700 font-medium">Sell</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
               name="type"
               value='rent'
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span className="text-base text-gray-700 font-medium">Rent</span>
            </label>
          </div>
        </div>

        {/* FEATURES */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl text-green-700">Your Listing Features:</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className="text-base text-gray-700 font-medium">
                Parking Spot
              </span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span className="text-base text-gray-700 font-medium">
                Furnished
              </span>
            </label>
          </div>
        </div>

        {/* BED & BATH */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              id="bedrooms"
              min="1"
              max="10"
              required
              className="p-3 border rounded-lg w-24"
              onChange={handleChange}
              value={formData.bedrooms}
            />
            <p className="text-gray-700 font-medium">Bedrooms</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              id="bathrooms"
              min="1"
              max="10"
              required
              className="p-3 border rounded-lg w-24"
              onChange={handleChange}
              value={formData.bathrooms}
            />
            <p className="text-gray-700 font-medium">Bathrooms</p>
          </div>
        </div>

        {/* PRICING */}
        <div className="flex flex-col gap-1 mt-2">
          <h2 className="text-xl text-green-700">Regular Price $:</h2>
          <input
            type="number"
            id="regularPrice"
            min="50"
            max="10000000"
            required
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.regularPrice}
          />
          {formData.type === "rent" && (
            <span className="text-xs text-gray-500">($ / month)</span>
          )}
        </div>

        {/* OFFER */}
        <label className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            id="offer"
            className="w-5"
            onChange={handleChange}
            checked={formData.offer}
          />
          <span className="text-xl text-green-700">Add Offers?</span>
        </label>

        {/* DISCOUNT */}
        {formData.offer && (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="number"
              id="discountPrice"
              min="0"
              max="10000000"
              required
              className="p-3 border rounded-lg"
              onChange={handleChange}
              value={formData.discountPrice}
            />
            <div className="flex flex-col">
              <p className="font-medium text-gray-700">Discounted Price</p>
              {formData.type === "rent" && (
                <span className="text-xs text-gray-500">($ / month)</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SECTION - IMAGES */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <p className="text-lg text-green-700 font-semibold">
          Images:
          <span className="text-sm text-gray-600 ml-1">
            First image will be the cover (max 6)
          </span>
        </p>
        <input
          onChange={(e) => {
            hanldeImgUpload(e);
            e.target.value = "";
          }}
          className="p-3 border rounded w-full"
          type="file"
          id="images"
          accept="image/*"
          multiple
        />

        <button
          type="submit"
          className="p-3 bg-blue-800 text-white rounded-lg uppercase hover:opacity-95"
        >
          Create Listing
        </button>

        {error && <p className="text-red-700 text-sm">{error}</p>}

        {/* IMAGE PREVIEW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {imgArray.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-40 border rounded overflow-hidden"
            >
              <button
                onClick={() => removeImg(index)}
                type="button"
                className="absolute top-1 right-1 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
              >
                X
              </button>
              <img
                src={img.preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  </div>
);


      
  
  
}

