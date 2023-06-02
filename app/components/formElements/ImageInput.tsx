"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { AiOutlineFileAdd } from "@react-icons/all-files/ai/AiOutlineFileAdd";
import { FaExchangeAlt } from "@react-icons/all-files/fa/FaExchangeAlt";

import "./ImageInput.scss";

declare global {
  var cloudinary: any;
}

interface ImageInputProps {
  value: string;
  setImage: (value: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ setImage, value }) => {
  const handleUpload = (result: any) => {
    setImage(result.info.secure_url);
  };


  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="g567e5ca"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <button onClick={() => open?.()} className="image-input">
            {!value && (
              <div className="image-input__upload">
                <span className="image-input__info">Click to Upload</span>
                <AiOutlineFileAdd size={28} />
              </div>
            )}
            {value && (
              <div className="image-input__image">
                <Image alt="Upload Image" fill src={value} />
                <div
                  onClick={() => open?.()}
                  className="image-input__change-btn"
                  aria-label="Change image"
                >
                  <FaExchangeAlt size={18} />
                </div>
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageInput;
