"use client";
import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const Generate = () => {
  const abortControllerRef = useRef(null);

  const fileInputRef = useRef(null);
  const [uploadedPublicId, setUploadedPublicId] = useState(""); // new state
  console.log("Uploaded Public ID:", uploadedPublicId);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [fittreeUrl, setFittreeUrl] = useState("");
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [desc, setDesc] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) =>
        i === index ? { link, linktext } : item
      )
    );
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Only allow images
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Only image files are allowed!");
        e.target.value = ""; // Reset input
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadedUrl("");
    }
  };
  // Cancel upload
  const cancelUpload = async () => {
    // if (abortControllerRef.current) {
    //   abortControllerRef.current.abort();
    // }

    //   if (uploadedPublicId) {
    //     await fetch("/api/delete", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ public_id: uploadedPublicId }),
    //     });
    // }
    setFile(null);
    setPreview("");
    setUploading(false);
    setUploadedUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the input
    }

    toast.info("Upload canceled");
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Select an image!");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("handle", handle); // ✅ Add handle
    formData.append("desc", desc);     // ✅ Add description

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setUploading(false);

      if (data.success) {
        setUploadedUrl(data.url);
        setUploadedPublicId(data.public_id); // store public_id

        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed.");
      }
    } catch (error) {
      setUploading(false);
      toast.error("Upload failed.");
    }
    // inside handleSubmit
    abortControllerRef.current = new AbortController();
    const res = await fetch("/api/upload", { method: "POST", body: formData, signal: abortControllerRef.current.signal });
  };


  const addLink = () => {
    setLinks((prev) => [...prev, { link: "", linktext: "" }]);
  };
  const removeLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const submitLinks = async () => {
    if (!uploadedUrl) {
      toast.error("Please upload your picture first!");
      return;
    }

    else if (!handle) {
      toast.error("Please enter your handle!");
      return;
    }
    else if (!links[0].linktext) {
      toast.error("Please add at least one link with platform!");
      return;
    }
    const payload = {
      links,
      handle,
      pic: uploadedUrl,
      desc,
    };

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message || "fittree created successfully!");
        setLinks([{ link: "", linktext: "" }]);
        setUploadedUrl("");

        setHandle("");
        setDesc("");
        setPreview("");
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the input
        }
        // Set fittree URL
        setFittreeUrl(`http://${process.env.NEXT_PUBLIC_DOMAIN}/${handle}`);
      } else {
        toast.error(result.message || "Failed to create fittree.");
      }
    } catch (error) {
      toast.error("Error creating fittree.");
    }
  };

  return (
    <section className="bg-[#E9C0E9]  ">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-[#E9C0E9]  min-h-screen grid md:grid-cols-2   "
      >
        <div className="col1 min-h-screen  w-full flex justify-start md:pt-40 items-center flex-col text-gray-900">
          <div className="flex  bg-[#E9C0E9] flex-col gap-5 md:border md:px-4 border-gray-800  py-2 md:rounded-lg ">
            <h1 className="font-bold text-center text-2xl md:text-4xl">Create your fittree</h1>

            {/* Step 1: Handle */}
            <div className="item ">
              <h2 className="font-semibold text-lg md:text-2xl">
                Step 1: Claim your Handle
              </h2>
              <div className="">
                <input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="px-4 py-2 my-2 border focus:outline-pink-500 rounded-lg w-full "
                  type="text"
                  placeholder="Choose a Handle"
                />
              </div>
            </div>

            {/* Step 2: Links */}
            <div className="item flex w-full   flex-col gap-2">
              <h2 className="font-semibold text-lg md:text-2xl">Step 2: Add Links</h2>

              <div className=" p-3 flex flex-col gap-2  ">

                {links.map((item, index) => (
                  <div key={index} className="flex flex-col py-2 md:border-none border rounded-md gap-3 w-full items-center justify-center md:flex-row ">
                    {/* Platform Select */}
                    <select
                      value={item.linktext}
                      onChange={(e) =>
                        handleChange(index, item.link, e.target.value)
                      }
                      className="px-4 py-2 rounded-lg focus:outline-pink-500"
                    >
                      <option value="">Select Platform</option>
                      {[
                        "Instagram",
                        "Snapchat",
                        "Whatsapp",
                        "Website",
                        "LinkedIn",
                        "GitHub",
                        "Twitter",
                        "Facebook",
                        "YouTube",
                        "TikTok",
                        "Pinterest",
                        "Medium",
                        "Dev.to",
                        "Personal Blog",
                      ].map((platform) => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      ))}
                    </select>

                    {/* Link Input */}
                    <input
                      value={item.link}
                      onChange={(e) =>
                        handleChange(index, e.target.value, item.linktext)
                      }
                      className="px-4 py-2 border rounded-lg focus:outline-pink-500 flex-1"
                      type="text"
                      placeholder="Enter link URL"
                    />

                    <button
                      type="button"

                      onClick={() => removeLink(index)}
                      className={`px-4 py-2  bg-red-600 text-white rounded-full`}
                    >
                      Remove
                    </button>


                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addLink}
                className="p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-3xl"
              >
                + Add Link
              </button>

            </div>

            {/* Step 3: Picture + Description */}
            <div className="item flex flex-col gap-2">
              <h2 className="font-semibold text-lg md:text-2xl">
                Step 3: Add Picture and Description
              </h2>
              <div className="mx-4 flex  flex-col items-center justify-start md:justify-center">
                <div className="relative md:block gap-3 flex flex-col">

                  <input
                    accept="image/*" // Only images
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="cursor-pointer  relative"
                  />
                  {/* Cancel button */}
                  {
                    preview &&
                    <button
                      type="button"
                      onClick={cancelUpload}
                      className="absolute md:top-10 md:right-20 top-20 right-0 text-black cursor-pointer rounded-full w-16 h-16 flex items-center justify-center font-bold"
                    >

                      X
                    </button>}


                  <button
                    type="submit"
                    disabled={uploading}
                    className="bg-green-500 text-black py-2 px-4 my-3 rounded font-semibold hover:bg-green-400"
                  >
                    {uploading ? "Uploading..." : "Upload"} {uploadedUrl ? "Successful" : ""}
                  </button>

                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-40 w-40 rounded-full object-cover my-4 border-2 border-gray-300"
                  />
                )}
                {uploadedUrl && (
                  <p className="text-center mb-1 text-sm mt-2">
                    ✅ Uploaded Successfully!{" "}
                    <a
                      href={uploadedUrl}
                      hidden
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      View Image
                    </a>
                  </p>
                )}

                <input
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="px-4 py-2 border focus:outline-pink-500 rounded-full w-full"
                  type="text"
                  placeholder="Enter description"
                />

                <button
                  type="button"
                  onClick={submitLinks}
                  disabled={!uploadedUrl || !handle || !links[0].linktext}
                  className="disabled:bg-red-700 cursor-pointer disabled:cursor-no-drop p-5 py-2  w-fit my-5 bg-green-600 text-white font-bold rounded-3xl"
                >
                  Create your fittree
                </button>
                {fittreeUrl && (
                  <p className="mt-2 text-center text-blue-600 underline">
                    <a href={fittreeUrl} target="_blank" rel="noopener noreferrer">
                      Your fittree URL: {fittreeUrl}
                    </a>
                  </p>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="col2  md:h-screen flex justify-center     ">
          <img
            className="h-full  object-contain"
            src="/generate.png"
            alt="Generate your links"
          />
          <ToastContainer />
        </div>
      </form>
    </section>
  );
};

export default Generate;
