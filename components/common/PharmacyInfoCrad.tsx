"use client";
import React, { useState } from "react";
import FileDownloadField from "./form/FileDownloadField";
import axiosAdmin from "@/lib/axiosAdmin";
import toast from "react-hot-toast";

interface PharmacyInfoCardProps {
  title: string;
  description: string;
  link?: string | null;
  file_url?: string | null;
  filename?: string ;
}

const PharmacyInfoCard: React.FC<PharmacyInfoCardProps> = ({
  title,
  description,
  link,
  file_url,
  filename
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCardClick = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handleDownloadClick  = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (link) {
      window.open(link, "_blank");
    } else if (file_url) {
      try {
        const response = await axiosAdmin.get(file_url, {responseType: "blob",});
        const contentType = response.headers["content-type"] || "application/octet-stream";

        const blob = new Blob([response.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = filename || "default_filename";
        link.click();

        window.URL.revokeObjectURL(url);
        toast.success("File download Successfully.");
    } catch (error: any) {
        toast.error(error?.message || "Failed to download file.");
    }
    } else {
      console.warn("No link or file_url provided.");
    }
  };

  return (
    <div
      className="bg-white p-7 shadow-md rounded-lg min-h-[125px] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between">
        <div className="space-y-3">
          <h3 className="text-gray-800 font-medium text-lg md:text-xl">{title}</h3>
          <p className="text-grey text-sm mt-1">{description}</p>
        </div>
        <label className="custom-checkbox" htmlFor={`checkbox-${title}`}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
          />
          <span></span>
        </label>
      </div>
      <div className="flex justify-end mt-4" onClick={handleDownloadClick}>
        <FileDownloadField
          title="Download File"
          iconcolor="text-white"
          className="text-white bg-primary hover:bg-primary"
        />
      </div>
    </div>
  );
};

export default PharmacyInfoCard;
 