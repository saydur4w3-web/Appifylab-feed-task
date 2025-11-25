// ButtonItem.tsx
import { FC } from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  onFileSelect?: (file: File) => void;
}

export const ButtonItem: FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  onFileSelect,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onFileSelect) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <button
      type="button"
      className="_feed_inner_text_area_bottom_photo_link"
      onClick={() => {
        if (onFileSelect) {
          document.getElementById("file-input-" + label)?.click();
        } else {
          onClick && onClick();
        }
      }}
    >
      <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
        {icon}
      </span>
      {label}

      {/* Hidden file input */}
      {onFileSelect && (
        <input
          id={"file-input-" + label}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      )}
    </button>
  );
};
