import React, { FC, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../../app/contexts/auth/context";
import { DEFAULT_IMG_USER } from "../../../constants/app.constant";

interface IComp {
  content: string;
  setContent: (v: string) => void;
  file?: File | null;
  isPublic: boolean;
  setIsPublic: (v: boolean) => void;
  setFile: (f: File | null) => void;
}

export const TextAreaSection: FC<IComp> = ({
  content,
  setContent,
  file,
  isPublic,
  setIsPublic,
  setFile,
}) => {
  const [openAudience, setOpenAudience] = useState(false);
  const { user } = useAuthContext();

  // local preview to prevent disappearing
  const [preview, setPreview] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  // Keep preview alive even if parent resets "file"
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenAudience(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleRemoveImage = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  return (
    <div className="_feed_inner_text_area_box">
      {/* Left profile image */}
      <div className="_feed_inner_text_area_box_image">
        <img src={user?.profile_img || DEFAULT_IMG_USER} alt="Profile" className="_txt_img" />
      </div>

      <div className="flex-grow-1">
        {/* Audience Dropdown */}
        <div className="mb-2" ref={dropdownRef}>
          <button
            type="button"
            className="btn btn-light btn-sm rounded-pill px-3 d-flex align-items-center gap-2"
            onClick={() => setOpenAudience(!openAudience)}
          >
            {isPublic ? <span> 🌍 </span> : <span> 🔒 </span>}
          </button>

          {openAudience && (
            <div
              className="dropdown-menu show mt-1 p-0 shadow-sm"
              style={{ minWidth: "160px" }}
            >
              <button
                className="dropdown-item py-2"
                onClick={() => {
                  setIsPublic(true);
                  setOpenAudience(false);
                }}
              >
                🌍 Public
              </button>
              <button
                className="dropdown-item py-2"
                onClick={() => {
                  setIsPublic(false);
                  setOpenAudience(false);
                }}
              >
                🔒 Private
              </button>
            </div>
          )}
        </div>

        {/* TextArea */}
        <div className="form-floating _feed_inner_text_area_box_form">
          <textarea
            className="form-control _textarea"
            id="floatingTextarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {
            !content && (
            <label className="_feed_textarea_label" htmlFor="floatingTextarea">
              Write something ...
            </label>
            )
          }
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <div className="mt-3 position-relative">
            <img
              src={previewUrl}
              alt="preview"
              className="img-fluid rounded"
              style={{ maxHeight: "100px", width: "auto", objectFit: "cover" }}
            />

            {/* Remove button (top-right) */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="_image_remove_btn btn btn-sm"
              aria-label="Remove image"
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                border: "none",
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
