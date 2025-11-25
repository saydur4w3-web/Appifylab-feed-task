import { Dispatch, FC, SetStateAction } from "react";
import {
  PhotoIcon,
  VideoIcon,
  EventIcon,
  ArticleIcon,
  SendIcon,
  LoaderIcon,
} from "../../shared/icons";
import { ButtonItem } from "./comp/button";

interface IComp {
  setFile: Dispatch<SetStateAction<File | null>>;
  handleSubmit: () => void;
  isPending: boolean;
}

export const ActionButtons: FC<IComp> = ({
  setFile,
  handleSubmit,
  isPending,
}) => {
  return (
    <>
      {/* Desktop Version – hidden on mobile by your CSS */}
      <div className="_feed_inner_text_area_bottom">
        <div className="_feed_inner_text_area_item">
          <div className="_feed_common _feed_inner_text_area_bottom_photo">
            <ButtonItem
              icon={<PhotoIcon />}
              label="Photo"
              onFileSelect={(file) => setFile(file)}
            />
          </div>

          <div className="_feed_common _feed_inner_text_area_bottom_video">
            <ButtonItem icon={<VideoIcon />} label="Video" />
          </div>
          <div className="_feed_common _feed_inner_text_area_bottom_event">
            <ButtonItem icon={<EventIcon />} label="Event" />
          </div>
          <div className="_feed_common _feed_inner_text_area_bottom_article">
            <ButtonItem icon={<ArticleIcon />} label="Article" />
          </div>
        </div>

        <div className="_feed_inner_text_area_btn">
          <button
            type="button"
            className="_feed_inner_text_area_btn_link"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <LoaderIcon />
            ) : (
              <>
                <SendIcon />
                <span>Post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Version – hidden on desktop by your CSS */}
      <div className="_feed_inner_text_area_bottom_mobile">
        <div className="_feed_inner_text_mobile">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_common _feed_inner_text_area_bottom_photo">
            <ButtonItem
              icon={<PhotoIcon />}
              label=""
              onFileSelect={(file) => setFile(file)}
            />
            </div>
            <div className="_feed_common _feed_inner_text_area_bottom_video">
              <ButtonItem icon={<VideoIcon />} label="" />
            </div>
            <div className="_feed_common _feed_inner_text_area_bottom_event">
              <ButtonItem icon={<EventIcon />} label="" />
            </div>
            <div className="_feed_common _feed_inner_text_area_bottom_article">
              <ButtonItem icon={<ArticleIcon />} label="" />
            </div>
          </div>

          <div className="_feed_inner_text_area_btn">
            <button
              type="button"
              className="_feed_inner_text_area_btn_link"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                <LoaderIcon />
              ) : (
                <>
                  <SendIcon />
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
