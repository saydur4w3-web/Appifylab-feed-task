import React, { forwardRef } from "react";
import { MoreVerticalIcon } from "../../../shared/icons";

export interface T_DropdownItem {
  icon: any;
  label: string;
  onClick?: () => void;
}

interface PostDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: T_DropdownItem[];
}

export const PostOptions = forwardRef<HTMLDivElement, PostDropdownProps>(
  ({ isOpen, setIsOpen, items }, ref) => {
    const handleButtonClick = () => {
      setIsOpen(!isOpen);
    };

    const handleItemClick = (onClickFunction: () => void) => {
      onClickFunction();
      setIsOpen(false);
    };

    return (
      <div className="_feed_inner_timeline_post_box_dropdown" ref={ref}>
        <div className="_feed_timeline_post_dropdown">
          <button
            onClick={handleButtonClick}
            className="_feed_timeline_post_dropdown_link"
            id="_timeline_show_drop_btn"
            aria-expanded={isOpen}
            aria-controls="_timeline_drop"
          >
            <MoreVerticalIcon />
          </button>
        </div>

        <div
          className="_feed_timeline_dropdown _timeline_dropdown"
          id="_timeline_drop"
          style={{
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            transform: isOpen ? "translateY(40px)" : "translateY(50px)",
            transition: "all 0.2s ease",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <ul className="_feed_timeline_dropdown_list" role="menu">
            {items.map((item) => {
              const IconComponent = item.icon;
              return (
                <li
                  key={item.label}
                  className="_feed_timeline_dropdown_item"
                  role="none"
                >
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.onClick) {
                        handleItemClick(item.onClick);
                      }
                    }}
                    className="_feed_timeline_dropdown_link cursor"
                    role="menuitem"
                  >
                    <span>
                      <IconComponent size={16} />
                    </span>{" "}
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
);
